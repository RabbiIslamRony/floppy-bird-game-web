import { GAME_CONFIG } from '../constants/gameConstants';
import pipeImage from '@assets/images/pipe.png';

export class Pipe {
    constructor(canvas, x) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = x;
        this.width = GAME_CONFIG.PIPE_WIDTH;
        this.height = GAME_CONFIG.PIPE_HEIGHT;
        this.gap = GAME_CONFIG.PIPE_GAP;
        this.gapPosition = Math.random() * (canvas.height - this.gap - GAME_CONFIG.GROUND_HEIGHT - 100) + 50;
        this.passed = false;
        this.image = new Image();
        this.image.src = pipeImage;
        
        // Ensure image is loaded before starting
        this.image.onload = () => {
            this.draw();
        };
    }

    draw() {
        if (this.image.complete) {
            // Draw top pipe
            this.ctx.save();
            this.ctx.translate(this.x, this.gapPosition);
            this.ctx.scale(1, -1);
            this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
            this.ctx.restore();

            // Draw bottom pipe
            this.ctx.drawImage(
                this.image,
                this.x,
                this.gapPosition + this.gap,
                this.width,
                this.height
            );
        }
    }

    update() {
        this.x -= GAME_CONFIG.PIPE_SPEED;
    }

    isOffScreen() {
        return this.x + this.width < 0;
    }

    getBounds() {
        return {
            top: {
                x: this.x,
                y: 0,
                width: this.width,
                height: this.gapPosition
            },
            bottom: {
                x: this.x,
                y: this.gapPosition + this.gap,
                width: this.width,
                height: this.canvas.height - (this.gapPosition + this.gap)
            }
        };
    }
} 