export default class Cell extends Phaser.GameObjects.Image {
  selected = false
  border = null
  onClick = null
  isMutant = false

  constructor ({ scene, x, y, size, pattern, palette, onClick, isMutant }) {
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
    const position = {
      x: x * sizeWithMargin + margin,
      y: y * sizeWithMargin + margin,
    }
    super(scene, position.x, position.y, 'cell')

    this.onClick = onClick
    this.isMutant = isMutant

    // Generate selection border
    const thickness = 2
    const boxSize = size + thickness * 2
    this.border = scene.add.graphics()
    this.border.setPosition(position.x - thickness, position.y - thickness)
    this.border.fillStyle(0x000000, 1)
    this.border.fillRect(0, 0, boxSize, boxSize)
    this.border.setVisible(false)

    // Generate permanent border
    scene.add.graphics()
    .setPosition(position.x - thickness, position.y - thickness)
    .fillStyle(0x000000, 0.3)
    .fillRect(0, 0, boxSize, boxSize)

    this.setOrigin(0)
    scene.add.existing(this)

    // Listen for touch events
    scene.events.on('touchCell', this.unselect)
    this.setInteractive()
    this.input.onDown = this.select
  }

  select = () => {
    this.onClick(this)
    this.border.setVisible(true)
    this.selected = true
  }

  unselect = () => {
    this.selected = false
    this.border.setVisible(false)
  }
}
