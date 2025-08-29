import { Position } from "./abstractPosition";
import type { Snake } from "./snake/snake";

export class Food extends Position {
  private gridCols: number;
  private gridRows: number;

  constructor(gridCols: number, gridRows: number) {
    super();
    this.gridCols = gridCols;
    this.gridRows = gridRows;
    this.generateNewPosition();
  }

  public generateNewPosition(snake?: Snake) {
    let attempts = 0;
    const maxAttempts = 100;

    do {
      this.col = Math.floor(Math.random() * this.gridCols);
      this.row = Math.floor(Math.random() * this.gridRows);
      attempts++;
    } while (snake && this.isOnSnake(snake) && attempts < maxAttempts);
  }

  private isOnSnake(snake: Snake): boolean {
    const segments = snake.getSegments();
    return segments.some(
      (segment) =>
        segment.getRow() === this.row && segment.getCol() === this.col
    );
  }
}
