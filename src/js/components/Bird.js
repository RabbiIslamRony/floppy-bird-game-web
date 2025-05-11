import { GAME_CONFIG } from '../constants/gameConstants';
import birdImage from '@assets/images/bird.png';

export class Bird {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = 50;
        this.y = canvas.height / 2;
        this.velocity = 0;
        this.width = GAME_CONFIG.BIRD_WIDTH;
        this.height = GAME_CONFIG.BIRD_HEIGHT;
        this.image = new Image();
        this.image.src = birdImage;
        
        // Ensure image is loaded before starting
        this.image.onload = () => {
            this.draw();
        };
    }

    draw() {
        if (this.image.complete) {
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    update() {
        this.velocity += GAME_CONFIG.GRAVITY;
        this.y += this.velocity;

        // Prevent bird from going above the canvas
        if (this.y <= 0) {
            this.y = 0;
            this.velocity = 0;
        }

        // Prevent bird from going below the ground
        if (this.y + this.height >= this.canvas.height - GAME_CONFIG.GROUND_HEIGHT) {
            this.y = this.canvas.height - GAME_CONFIG.GROUND_HEIGHT - this.height;
            this.velocity = 0;
        }
    }

    flap() {
        this.velocity = GAME_CONFIG.FLAP_FORCE;
    }

    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
} 