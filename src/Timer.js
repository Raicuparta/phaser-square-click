import Music from './Music'

export default class Timer {
  callback = null
  event = null
  bar = null
  music = null
  x = 0
  y = 0
  height = 30

  constructor({ scene, x, y, delay, callback, width, text}) {
    this.callback = callback
    this.x = x
    this.y = y
    this.width = width
    this.music = new Music()
    //this.music.play()

    this.event = scene.time.addEvent({
      callbackScope: this,
      loop: true,
      callback,
      delay,
    })

    // scene.time.addEvent({
    //   callbackScope: this,
    //   loop: true,
    //   callback: () => this.music.play(),
    //   delay: delay / 8,
    // })

    // Create bar graphics
    const graphics = scene.make.graphics()
    graphics.fillStyle(0x000000, 1)
    graphics.fillRect(0, 0, this.width, this.height)
    graphics.generateTexture('timer', this.width, this.height)
    this.bar = scene.add.image(x, y, 'timer')
    this.bar.setOrigin(0.5)

    // Create score text
    this.text = scene.add.text(x, y, text, {
      font: '12px Arial',
      align: 'center',
    })
  }

  update() {
    const scaleX = 1 - this.event.getProgress()
    this.bar.setScale(scaleX, 1)
  }
}
