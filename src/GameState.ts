export class GameState {
  private score: number = 0;
  private isGameOver: boolean = false;

  public addToScore(value: number) {
    this.score += value;
  }

  public checkGameOver() {}

  public getScore() {
    return this.score;
  }
}
