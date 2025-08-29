export class GameState {
  private score: number = 0;
  private isGameStarted = false;
  private isGameOver: boolean = false;

  public startGame() {
    this.isGameStarted = true;
  }

  public getIsGameStarted() {
    return this.isGameStarted;
  }

  public addToScore(value: number) {
    this.score += value;
  }

  public checkGameOver() {}

  public getScore() {
    return this.score;
  }
}
