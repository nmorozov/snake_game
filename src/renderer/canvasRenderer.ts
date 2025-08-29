import type { Food } from "../food";
import type { Snake } from "../snake/snake";
import type { Renderer } from "./types";
import { RendererConfig } from "../config/RendererConfig";
import { GameConfig } from "../config/GameConfig";

export class CanvasRenderer implements Renderer {
  private canvasCtx: CanvasRenderingContext2D;
  private foodImage: HTMLImageElement;
  private grassImage: HTMLImageElement;
  private snakeLevel: number[][];

  constructor(canvasCtx: CanvasRenderingContext2D) {
    this.canvasCtx = canvasCtx;

    this.foodImage = new Image(252, 64);
    this.foodImage.src = "/fruits.png";

    this.grassImage = new Image(256, 96);
    this.grassImage.src = "/sprite_dirtandgrass.png";

    // Создаем сетку уровня на основе размера canvas
    this.snakeLevel = GameConfig.createSnakeLevel(
      canvasCtx.canvas.width,
      canvasCtx.canvas.height
    );
  }

  public render(snake: Snake, food: Food, score: number): void {
    this.clear();
    this.drawBackground();
    this.drawUI(score);
    this.drawFood(food);
    this.drawSnake(snake);
  }

  private drawUI(score: number) {
    this.canvasCtx.fillStyle = "#000";
    this.canvasCtx.font = "24px Arial"; // Уменьшим размер шрифта

    // Позиционируем UI в правом верхнем углу canvas
    const canvasWidth = this.canvasCtx.canvas.width;
    const text = `Очки: ${score}`;

    // Измеряем ширину текста
    const textMetrics = this.canvasCtx.measureText(text);
    const textWidth = textMetrics.width;

    // Позиционируем справа с отступом
    const x = canvasWidth - textWidth - 20; // 20px отступ от правого края
    const y = 30; // 30px от верхнего края

    // Добавим фон для лучшей читаемости
    this.canvasCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
    this.canvasCtx.fillRect(x - 10, y - 20, textWidth + 20, 30);

    // Рисуем текст
    this.canvasCtx.fillStyle = "#000";
    this.canvasCtx.fillText(text, x, y);
  }

  private drawSnake(snake: Snake) {
    this.canvasCtx.fillStyle = RendererConfig.SNAKE_COLOR;

    const segments = snake.getSegments();
    const cellSize = RendererConfig.getCellSize();

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const x = segment.getCol() * cellSize;
      const y = segment.getRow() * cellSize;

      this.canvasCtx.fillRect(x, y, cellSize, cellSize);
    }
  }

  private drawBackground() {
    const cellSize = RendererConfig.getCellSize();

    for (let rowIndex = 0; rowIndex < this.snakeLevel.length; rowIndex++) {
      for (
        let colIndex = 0;
        colIndex < this.snakeLevel[rowIndex].length;
        colIndex++
      ) {
        let sourceX = 0;
        let sourceY = 0;

        // Левый верхний угол
        if (rowIndex === 0 && colIndex === 0) {
          sourceX = 32;
        }

        // Левый нижний угол
        if (rowIndex === this.snakeLevel.length - 1 && colIndex === 0) {
          sourceX = 96;
        }

        // Левая граница
        if (
          colIndex === 0 &&
          rowIndex !== 0 &&
          rowIndex !== this.snakeLevel.length - 1
        ) {
          sourceX = 64;
        }

        // Правый верхний угол
        if (rowIndex === 0 && colIndex === this.snakeLevel[0].length - 1) {
          sourceX = 0;
          sourceY = 32;
        }

        // Правый нижний угол
        if (
          rowIndex === this.snakeLevel.length - 1 &&
          colIndex === this.snakeLevel[0].length - 1
        ) {
          sourceX = 64;
          sourceY = 32;
        }

        const sourceWidth = 32;
        const sourceHeight = 32;
        const destX = colIndex * cellSize;
        const destY = rowIndex * cellSize;
        const destWidth = cellSize;
        const destHeight = cellSize;

        this.canvasCtx.drawImage(
          this.grassImage,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          destX,
          destY,
          destWidth,
          destHeight
        );
      }
    }
  }

  private drawFood(food: Food) {
    const col = food.getCol();
    const row = food.getRow();
    const cellSize = RendererConfig.getCellSize();
    const x = col * cellSize;
    const y = row * cellSize;

    this.canvasCtx.drawImage(this.foodImage, 0, 0, 64, 64, x, y, 45, 45);
  }

  private clear(): void {
    this.canvasCtx.clearRect(
      0,
      0,
      this.canvasCtx.canvas.width,
      this.canvasCtx.canvas.height
    );
  }

  // Метод для получения размеров сетки
  public getGridSize(): { cols: number; rows: number } {
    return {
      cols: this.snakeLevel[0].length,
      rows: this.snakeLevel.length,
    };
  }
}
