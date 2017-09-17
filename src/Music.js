export default class Music {
  static ctx = new AudioContext()
  freqIndex = 0
  effect = {}

  constructor() {
    this.effect = {
        frequency: 0,
        attack: 0.05,
        decay: 0.2,
        volume: 3,
    }
  }

  play() {
    this.effect.frequency = frequencies[this.freqIndex]
    this.freqIndex = (this.freqIndex + 1) % frequencies.length
    new Phaser.Sound.Dynamic.FX(Music.ctx, this.effect)
  }
}

const frequencies = [
    523.25,
    587.33,
    659.25,
    698.46,
    783.99,
    880.00,
    987.77,
    1046.50,
]
