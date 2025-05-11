import { Bird } from './components/Bird';
import { Pipe } from './components/Pipe';
import { checkPipeCollision } from './utils/collision';
import { GAME_CONFIG } from './constants/gameConstants';
import backgroundImage from '@assets/images/background.png';
import groundImage from '@assets/images/ground.png';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.bird = new Bird(canvas);
        this.pipes = [];
        this.score = 0;
        this.gameOver = false;
        this.lastPipeSpawn = 0;
        
        // Load images
        this.background = new Image();
        this.background.src = backgroundImage;
        this.ground = new Image();
        this.ground.src = groundImage;

        // Wait for images to load before starting
        Promise.all([
            new Promise(resolve => {
                this.background.onload = resolve;
            }),
            new Promise(resolve => {
                this.ground.onload = resolve;
            })
        ]).then(() => {
            this.start();
        });
    }

    start() {
        this.gameOver = false;
        this.score = 0;
        this.pipes = [];
        this.bird = new Bird(this.canvas);
        this.updateScore();
        this.gameLoop();
    }

    gameLoop(timestamp = 0) {
        if (this.gameOver) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background
        if (this.background.complete) {
            this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
        }

        // Spawn pipes
        if (timestamp - this.lastPipeSpawn > GAME_CONFIG.PIPE_SPAWN_INTERVAL) {
            this.pipes.push(new Pipe(this.canvas, this.canvas.width));
            this.lastPipeSpawn = timestamp;
        }

        // Update and draw pipes
        this.pipes = this.pipes.filter(pipe => {
            pipe.update();
            pipe.draw();

            // Check for score
            if (!pipe.passed && pipe.x + pipe.width < this.bird.x) {
                pipe.passed = true;
                this.score++;
                this.updateScore();
            }

            // Check for collision
            if (checkPipeCollision(this.bird, pipe)) {
                this.endGame();
            }

            return !pipe.isOffScreen();
        });

        // Update and draw bird
        this.bird.update();
        this.bird.draw();

        // Draw ground
        if (this.ground.complete) {
            this.ctx.drawImage(
                this.ground,
                0,
                this.canvas.height - GAME_CONFIG.GROUND_HEIGHT,
                this.canvas.width,
                GAME_CONFIG.GROUND_HEIGHT
            );
        }

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    updateScore() {
        document.getElementById('score').textContent = `Score: ${this.score}`;
    }

    endGame() {
        this.gameOver = true;
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('gameOver').classList.remove('hidden');
    }

    handleClick() {
        if (this.gameOver) {
            document.getElementById('gameOver').classList.add('hidden');
            this.start();
        } else {
            this.bird.flap();
        }
    }
} 