import { Position } from "../abstractPosition";

export class SnakeSegment extends Position {
  public increaseRow() {
    this.row += 1;
  }

  public decreaseRow() {
    this.row -= 1;
  }

  public increaseCol() {
    this.col += 1;
  }

  public decreaseCol() {
    this.col -= 1;
  }

  public setRow(row: number) {
    this.row = row;
  }

  public setCol(col: number) {
    this.col = col;
  }

  public clone(): SnakeSegment {
    return new SnakeSegment(this.row, this.col);
  }
}
