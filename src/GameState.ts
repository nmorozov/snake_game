import type { Snake } from "./snake/snake";

export class GameState {
  private isGameStarted = false;
  private score: number = 0;
  private snake: Snake;
  private maxCols: number;
  private maxRows: number;

  constructor(snake: Snake, maxCols: number, maxRows: number) {
    this.snake = snake;
    this.maxCols = maxCols;
    this.maxRows = maxRows;
  }

  public startGame() {
    this.isGameStarted = true;
  }

  public getIsGameStarted() {
    return this.isGameStarted;
  }

  public addToScore(value: number) {
    this.score += value;
  }

  public checkGameOver() {
    if (
      this.snake.collidesWithSelf() ||
      this.snake.collidesWithWall(this.maxCols, this.maxRows)
    ) {
      this.isGameStarted = false;

      return true;
    }

    return false;
  }

  public getScore() {
    return this.score;
  }
}
