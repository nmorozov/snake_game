import { Game } from "./game";
import { Sound } from "./sound";

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

const init = () => {
  const canvasCtx = initCanvas();
  const sound = new Sound();
  const game = new Game(canvasCtx, sound);

  game.start();
};

document.addEventListener("DOMContentLoaded", init);
