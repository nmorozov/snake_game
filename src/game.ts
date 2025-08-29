import { SnakeSegment } from "./snake/snakeSegment";
import { Snake } from "./snake/snake";
import { CanvasRenderer } from "./renderer/canvasRenderer";
import { Food } from "./food";
import { GameConfig } from "./config/GameConfig";
import { Sound } from "./sound";
import { GameState } from "./GameState";

export class Game {
  private renderer: CanvasRenderer;
  private sound: Sound;

  private gameState: GameState;

  private snake: Snake;
  private food: Food;

  private gameIntervalId: number | null = null;

  constructor(canvasCtx: CanvasRenderingContext2D, sound: Sound) {
    this.renderer = new CanvasRenderer(canvasCtx);
    this.sound = sound;

    const gridSize = this.renderer.getGridSize();
    const centerCol = Math.floor(gridSize.cols / 2);
    const centerRow = Math.floor(gridSize.rows / 2);

    const initialSegments = [
      new SnakeSegment(centerRow, centerCol),
      new SnakeSegment(centerRow, centerCol - 1),
      new SnakeSegment(centerRow, centerCol - 2),
    ];
    this.snake = new Snake(initialSegments);
    this.food = new Food(gridSize.cols, gridSize.rows);

    this.gameState = new GameState(this.snake, gridSize.cols, gridSize.rows);

    window.addEventListener("keyup", this.changeDirection.bind(this));
  }

  private changeDirection(e: KeyboardEvent) {
    const directions = {
      ArrowDown: [0, 1],
      ArrowUp: [0, -1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
    };

    const direction = directions[e.code as keyof typeof directions];

    if (direction) {
      if (!this.snake.isMoving() && e.code === "ArrowLeft") {
        this.snake.setDirection(1, 0);
        this.startGameIfNeeded();
        return;
      }

      this.snake.setDirection(direction[0], direction[1]);
      this.startGameIfNeeded();
    }
  }

  private startGameIfNeeded() {
    if (!this.gameState.getIsGameStarted()) {
      this.gameState.startGame();
      this.sound.playRoundStart();

      setTimeout(() => {
        this.sound.playBackgroundMusic();
        this.food.generateNewPosition(this.snake);
      }, 2000);
    }
  }

  public start() {
    this.update();
    this.render();
    this.startGameLoop();
  }

  private startGameLoop() {
    if (this.gameIntervalId) {
      clearInterval(this.gameIntervalId);
    }

    const currentSpeed = GameConfig.getGameSpeedByScore(
      this.gameState.getScore()
    );

    this.gameIntervalId = setInterval(() => {
      this.update();
      this.render();
    }, currentSpeed);
  }

  private update() {
    if (!this.gameState.getIsGameStarted()) {
      return;
    }

    this.snake.move();

    if (this.snake.eats(this.food)) {
      this.snake.grow();
      this.sound.bite();
      this.food.generateNewPosition(this.snake);
      this.gameState.addToScore(10);

      this.startGameLoop();
    }

    if (this.gameState.checkGameOver()) {
      this.sound.stopAllSounds();
      this.sound.playGameOverMusic();
    }
  }

  private render() {
    this.renderer.render(this.snake, this.food, this.gameState.getScore());
  }
}
