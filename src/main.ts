import { Game } from "./game";

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

const initAudio = () => {
  return document.getElementById("audio") as HTMLAudioElement;
};

const init = () => {
  const canvasCtx = initCanvas();
  const audio = initAudio();
  const game = new Game(canvasCtx, audio);

  game.start();
};

document.addEventListener("DOMContentLoaded", init);
