export default class Cell extends Phaser.GameObjects.Image {
  constructor (scene, x, y, size, pattern, palette) {
    const pixelSize = size / pattern.length
    const textureOptions = {
      data: pattern,
      pixelWidth: pixelSize,
      pixelHeight: pixelSize,
      palette,
    }
    scene.textures.generate('cell', textureOptions)

    const margin = 15
    const sizeWithMargin = size + margin
    super(scene, x * sizeWithMargin + margin, y * sizeWithMargin + margin, 'cell')
    this.setOrigin(0)
    scene.add.existing(this)
  }
}
