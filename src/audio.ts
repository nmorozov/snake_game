export class Audio {
  private audio: HTMLAudioElement;

  constructor(audio: HTMLAudioElement) {
    this.audio = audio;
  }

  public bite() {
    this.audio.src = "/bite.wav";
    this.audio.play();
  }
}
