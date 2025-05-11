import './styles.css';
import { Game } from './js/Game';
import { GAME_CONFIG } from './js/constants/gameConstants';

// Initialize canvas
const canvas = document.getElementById('gameCanvas');
canvas.width = GAME_CONFIG.CANVAS_WIDTH;
canvas.height = GAME_CONFIG.CANVAS_HEIGHT;

// Initialize game
const game = new Game(canvas);

// Event listeners
document.addEventListener('click', () => game.handleClick());
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        game.handleClick();
    }
});

// Start the game
game.start(); 