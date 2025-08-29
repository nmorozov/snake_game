export class RendererConfig {
  public static readonly CELL_SIZE = 50;
  public static readonly FOOD_SIZE = 20;
  public static readonly BACKGROUND_COLOR = "#f0f0f0";
  public static readonly SNAKE_COLOR = "red";
  public static readonly FOOD_COLOR = "green";

  // Методы для получения конфигурации
  public static getCellSize(): number {
    return RendererConfig.CELL_SIZE;
  }

  public static getFoodSize(): number {
    return RendererConfig.FOOD_SIZE;
  }
}
