export class GameConfig {
  public static readonly CELL_SIZE = 50;
  public static readonly GAME_SPEED = 1000;
  public static readonly INITIAL_SNAKE_POSITION = { row: 5, col: 5 };

  public static getGridSize(
    canvasWidth: number,
    canvasHeight: number
  ): { cols: number; rows: number } {
    const cols = Math.floor(canvasWidth / GameConfig.CELL_SIZE);
    const rows = Math.floor(canvasHeight / GameConfig.CELL_SIZE);

    return { cols, rows };
  }

  public static createSnakeLevel(
    canvasWidth: number,
    canvasHeight: number
  ): string[][] {
    const { cols, rows } = GameConfig.getGridSize(canvasWidth, canvasHeight);
    const rowsArr = Array(rows).fill(null);

    return rowsArr.map((_, rowIndex) => {
      const colsArr = Array(cols).fill("grass");

      if (rowIndex === 0) {
        colsArr[0] = "cornerTopLeft";
        colsArr[colsArr.length - 1] = "cornerTopRight";

        for (let i = 1; i < colsArr.length - 1; i++) {
          colsArr[i] = "wallTop";
        }
      }

      if (rowIndex === rowsArr.length - 1) {
        colsArr[0] = "cornerBottomLeft";
        colsArr[colsArr.length - 1] = "cornerBottomRight";

        for (let i = 1; i < colsArr.length - 1; i++) {
          colsArr[i] = "wallBottom";
        }
      }

      if (rowIndex > 0 && rowIndex < rowsArr.length - 1) {
        colsArr[0] = "wallLeft";
        colsArr[colsArr.length - 1] = "wallRight";
      }

      return colsArr;
    });
  }

  public static getGameSpeed(): number {
    return GameConfig.GAME_SPEED;
  }

  public static getCellSize(): number {
    return GameConfig.CELL_SIZE;
  }
}
