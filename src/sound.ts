export class Sound {
  private audioContext: AudioContext;

  constructor() {
    this.audioContext = new window.AudioContext();
  }

  public async playBackgroundMusic() {
    const audioBuffer = await this.getSoundFile("/background_music.mp3");

    this.playSound(audioBuffer, true);
  }

  public async bite() {
    const audioBuffer = await this.getSoundFile("/eat.mp3");

    this.playSound(audioBuffer);
  }

  private async getSoundFile(fileName: string) {
    const file = await fetch(fileName);
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

    return audioBuffer;
  }

  private playSound(audioBuffer: AudioBuffer, isLoop: boolean = false) {
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = isLoop;
    source.connect(this.audioContext.destination);
    source.start(0);
  }
}
