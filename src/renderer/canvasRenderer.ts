import type { Food } from "../food";
import type { Snake } from "../snake/snake";
import type { Renderer } from "./types";
import { RendererConfig } from "../config/RendererConfig";
import { GameConfig } from "../config/GameConfig";
import { grassMap } from "./grassMap";
import { getSegmentType, snakeSprites } from "./snakeSprites";

export class CanvasRenderer implements Renderer {
  private canvasCtx: CanvasRenderingContext2D;
  private foodImage: HTMLImageElement;
  private grassImage: HTMLImageElement;
  private snakeImage: HTMLImageElement;
  private snakeLevel: string[][];

  constructor(canvasCtx: CanvasRenderingContext2D) {
    this.canvasCtx = canvasCtx;

    this.foodImage = new Image(252, 64);
    this.foodImage.src = "/fruits.png";

    this.grassImage = new Image(256, 96);
    this.grassImage.src = "/sprite_dirtandgrass.png";

    this.snakeImage = new Image(320, 256);
    this.snakeImage.src = "/snake.png";

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
    this.canvasCtx.font = "24px Arial";

    const canvasWidth = this.canvasCtx.canvas.width;
    const text = `Очки: ${score}`;

    const textMetrics = this.canvasCtx.measureText(text);
    const textWidth = textMetrics.width;

    const x = canvasWidth - textWidth - 20;
    const y = 30;

    this.canvasCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
    this.canvasCtx.fillRect(x - 10, y - 20, textWidth + 20, 30);

    this.canvasCtx.fillStyle = "#000";
    this.canvasCtx.fillText(text, x, y);
  }

  private drawSnake(snake: Snake) {
    const segments = snake.getSegments();
    const velocity = snake.getVelocity();
    const cellSize = RendererConfig.getCellSize();
    const sourceWidth = 64;
    const sourceHeight = 60;
    const destWidth = cellSize;
    const destHeight = cellSize;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const destX = segment.getCol() * cellSize;
      const destY = segment.getRow() * cellSize;

      const segmentType = getSegmentType(i, segments, velocity);
      const { x, y } = snakeSprites[segmentType];

      this.canvasCtx.drawImage(
        this.snakeImage,
        x,
        y,
        sourceWidth,
        sourceHeight,
        destX,
        destY,
        destWidth,
        destHeight
      );
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
        const { x, y } = grassMap[this.snakeLevel[rowIndex][colIndex]];

        const sourceWidth = 32;
        const sourceHeight = 32;
        const destX = colIndex * cellSize;
        const destY = rowIndex * cellSize;
        const destWidth = cellSize;
        const destHeight = cellSize;

        this.canvasCtx.drawImage(
          this.grassImage,
          x,
          y,
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

    if (!col && !row) {
      return;
    }

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

  public getGridSize(): { cols: number; rows: number } {
    return {
      cols: this.snakeLevel[0].length,
      rows: this.snakeLevel.length,
    };
  }

  public async waitForAssetsToLoad(): Promise<void> {
    const imageLoadPromises = [
      this.waitForImageLoad(this.grassImage),
      this.waitForImageLoad(this.foodImage),
      this.waitForImageLoad(this.snakeImage),
    ];

    await Promise.all(imageLoadPromises);
  }

  private waitForImageLoad(image: HTMLImageElement): Promise<void> {
    return new Promise((resolve, reject) => {
      if (image.complete && image.naturalWidth > 0) {
        resolve();
      } else {
        image.onload = () => resolve();
        image.onerror = () =>
          reject(new Error(`Failed to load image: ${image.src}`));
      }
    });
  }
}
