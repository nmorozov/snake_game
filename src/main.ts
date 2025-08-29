import { Game } from "./game";
import { Sound } from "./sound";
import { CanvasRenderer } from "./renderer/canvasRenderer";

const initCanvas = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get context");
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  return ctx;
};

const init = async () => {
  const canvasCtx = initCanvas();
  const sound = new Sound();
  const renderer = new CanvasRenderer(canvasCtx);

  try {
    // Ждем загрузки всех ресурсов
    await renderer.waitForAssetsToLoad();

    // Создаем и запускаем игру
    const game = new Game(canvasCtx, sound);
    game.start();
  } catch (error) {
    console.error("Ошибка загрузки ресурсов:", error);
  }
};

document.addEventListener("DOMContentLoaded", init);
