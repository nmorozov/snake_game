import type { Food } from "../food";
import type { Snake } from "../snake/snake";

export interface Renderer {
  render(snake: Snake, food: Food, score: number): void;
}
