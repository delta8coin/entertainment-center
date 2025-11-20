declare module 'soundtouchjs' {
  export class PitchShifter {
    constructor(context: AudioContext | OfflineAudioContext, buffer: AudioBuffer, bufferSize: number);
    pitchSemitones: number;
    tempo: number;
  }

  export class SoundTouch {
    constructor();
    pitch: number;
    pitchSemitones: number;
    rate: number;
    tempo: number;
  }
}
