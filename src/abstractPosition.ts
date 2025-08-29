export abstract class Position {
  protected row: number;
  protected col: number;

  constructor(row?: number, col?: number) {
    this.row = row ?? 0;
    this.col = col ?? 0;
  }

  public getRow() {
    return this.row;
  }

  public getCol() {
    return this.col;
  }
}
