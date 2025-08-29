export class GameConfig {
  public static readonly CELL_SIZE = 50;
  public static readonly GAME_SPEED = 1000;
  public static readonly INITIAL_SNAKE_POSITION = { row: 5, col: 5 };

  // Вычисляем размер сетки на основе размера canvas
  public static getGridSize(
    canvasWidth: number,
    canvasHeight: number
  ): { cols: number; rows: number } {
    const cols = Math.floor(canvasWidth / GameConfig.CELL_SIZE);
    const rows = Math.floor(canvasHeight / GameConfig.CELL_SIZE);

    return { cols, rows };
  }

  // Создаем сетку уровня динамически
  public static createSnakeLevel(
    canvasWidth: number,
    canvasHeight: number
  ): number[][] {
    const { cols, rows } = GameConfig.getGridSize(canvasWidth, canvasHeight);
    return Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(0));
  }

  public static getGameSpeed(): number {
    return GameConfig.GAME_SPEED;
  }

  public static getCellSize(): number {
    return GameConfig.CELL_SIZE;
  }
}
