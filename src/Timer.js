export default class Timer {
  callback = null
  event = null
  bar = null
  x = 0
  y = 0
  height = 20

  constructor({ scene, x, y, delay, callback, width}) {
    this.callback = callback
    this.x = x
    this.y = y
    this.width = width

    this.event = scene.time.addEvent({
      callbackScope: this,
      loop: true,
      callback,
      delay,
    })

    const graphics = scene.make.graphics()
    graphics.fillStyle(0x000000, 1)
    graphics.fillRect(0, 0, this.width, this.height)
    graphics.generateTexture('timer', this.width, this.height)
    this.bar = scene.add.image(x, y, 'timer')
    this.bar.setOrigin(0.5)
  }

  update() {
    const scaleX = 1 - this.event.getProgress()
    this.bar.setScale(scaleX, 1)
  }
}