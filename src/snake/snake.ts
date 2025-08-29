import type { Food } from "../food";
import { SnakeSegment } from "./snakeSegment";

export class Snake {
  private segments: SnakeSegment[] = [];

  constructor(initialSegments: SnakeSegment[]) {
    this.segments = initialSegments;
  }

  public getHead(): SnakeSegment {
    return this.segments[0];
  }

  public getSegments(): SnakeSegment[] {
    return this.segments;
  }

  public getLength(): number {
    return this.segments.length;
  }

  public move(velocityX: number, velocityY: number) {
    if (velocityX === 0 && velocityY === 0) {
      return;
    }

    const oldPositions = this.segments.map((s) => s.clone());

    const head = this.getHead();

    if (velocityX > 0) {
      head.increaseCol();
    } else if (velocityX < 0) {
      head.decreaseCol();
    }

    if (velocityY > 0) {
      head.increaseRow();
    } else if (velocityY < 0) {
      head.decreaseRow();
    }

    for (let i = this.segments.length - 1; i > 0; i--) {
      this.segments[i].setCol(oldPositions[i - 1].getCol());
      this.segments[i].setRow(oldPositions[i - 1].getRow());
    }
  }

  public grow() {
    const tail = this.segments[this.segments.length - 1];

    this.segments.push(tail.clone());
  }

  public collidesWithSelf(): boolean {
    const head = this.getHead();

    for (let i = 1; i < this.segments.length; i++) {
      if (
        head.getRow() === this.segments[i].getRow() &&
        head.getCol() === this.segments[i].getCol()
      ) {
        return true;
      }
    }
    return false;
  }

  public eats(food: Food) {
    const head = this.getHead();

    return food.getCol() === head.getCol() && food.getRow() === head.getRow();
  }
}
