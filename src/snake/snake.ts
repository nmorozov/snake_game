import type { Food } from "../food";
import { SnakeSegment } from "./snakeSegment";

export class Snake {
  private segments: SnakeSegment[] = [];
  private velocityX: number = 0;
  private velocityY: number = 0;

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

  public setDirection(velocityX: number, velocityY: number) {
    if (
      (this.velocityX === 1 && velocityX === -1) ||
      (this.velocityX === -1 && velocityX === 1) ||
      (this.velocityY === 1 && velocityY === -1) ||
      (this.velocityY === -1 && velocityY === 1)
    ) {
      return;
    }

    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  public move() {
    if (this.velocityX === 0 && this.velocityY === 0) {
      return;
    }

    const oldPositions = this.segments.map((s) => s.clone());

    const head = this.getHead();

    if (this.velocityX > 0) {
      head.increaseCol();
    } else if (this.velocityX < 0) {
      head.decreaseCol();
    }

    if (this.velocityY > 0) {
      head.increaseRow();
    } else if (this.velocityY < 0) {
      head.decreaseRow();
    }

    for (let i = this.segments.length - 1; i > 0; i--) {
      this.segments[i].setCol(oldPositions[i - 1].getCol());
      this.segments[i].setRow(oldPositions[i - 1].getRow());
    }
  }

  public getVelocity(): { x: number; y: number } {
    return { x: this.velocityX, y: this.velocityY };
  }

  public isMoving(): boolean {
    return this.velocityX !== 0 || this.velocityY !== 0;
  }

  public grow() {
    const tail = this.segments[this.segments.length - 1];
    const preTail = this.segments[this.segments.length - 2];

    const deltaX = tail.getCol() - preTail.getCol();
    const deltaY = tail.getRow() - preTail.getRow();

    const newTail = tail.clone();
    newTail.setCol(tail.getCol() + deltaX);
    newTail.setRow(tail.getRow() + deltaY);

    this.segments.push(newTail);
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

  public collidesWithWall(maxCol: number, maxRows: number): boolean {
    const head = this.getHead();
    const col = head.getCol();
    const row = head.getRow();

    return col === 0 || row === 0 || col === maxCol - 1 || row === maxRows - 1;
  }

  public eats(food: Food) {
    const head = this.getHead();

    return food.getCol() === head.getCol() && food.getRow() === head.getRow();
  }
}
