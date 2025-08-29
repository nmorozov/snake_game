import { SnakeSegment } from "./snake/snakeSegment";
import { Snake } from "./snake/snake";
import { CanvasRenderer } from "./renderer/canvasRenderer";
import { Food } from "./food";
import { GameConfig } from "./config/GameConfig";
import { Audio } from "./audio";

export class Game {
  private renderer: CanvasRenderer;
  private audio: Audio;

  private snake: Snake;
  private snakeVelocityX: number = 0;
  private snakeVelocityY: number = 0;

  private food: Food;

  private score: number = 0;

  constructor(canvasCtx: CanvasRenderingContext2D, audio: HTMLAudioElement) {
    this.renderer = new CanvasRenderer(canvasCtx);
    this.audio = new Audio(audio);

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
    this.food.generateNewPosition(this.snake);

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
      this.snakeVelocityX = direction[0];
      this.snakeVelocityY = direction[1];
    }
  }

  public start() {
    this.update();
    this.render();

    setInterval(() => {
      this.update();
      this.render();
    }, GameConfig.getGameSpeed());
  }

  private update() {
    this.snake.move(this.snakeVelocityX, this.snakeVelocityY);

    if (this.snake.eats(this.food)) {
      this.snake.grow();
      this.audio.bite();
      this.food.generateNewPosition(this.snake); // Передаем змейку
      this.score += 10;
    }

    if (this.snake.collidesWithSelf()) {
      console.log("Game Over!");
      // Здесь можно добавить логику окончания игры
    }
  }

  private render() {
    this.renderer.render(this.snake, this.food, this.score);
  }
}
