import Cell from '../Cell'
import Timer from '../Timer'

export default class Game extends Phaser.Scene {
  level = 1
  score = 0
  // Score required to go to next level
  nextLevelScore = 2
  selectedCell = null
  timer = null

  constructor () {
    super({
      key: 'Game'
    })
  }

  create () {
    const cellSize = 50

    const columns = 5
    const rows = 8

    const pattern = this.generatePattern(this.level)
    const mutation = this.mutatePattern(pattern)

    const mutant = {
      x: Math.floor(Math.random() * columns),
      y: Math.floor(Math.random() * rows),
    }

    // Create Cells
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        const isMutant = x === mutant.x && y === mutant.y
        new Cell({
          scene: this,
          size: cellSize,
          pattern: isMutant ? mutation : pattern,
          onClick: this.handleCellClick,
          palette,
          x,
          y,
          isMutant,
        })
      }
    }

    // Create timer
    this.timer = new Timer({
      scene: this,
      x: 175,
      y: 0,
      width: 350,
      delay: 1500,
      callback: this.handleTimeOver,
    })
  }

  handleCellClick = (cell) => {
    if (this.selectedCell) this.selectedCell.unselect()
    this.selectedCell = cell
  }

  handleTimeOver = () => {
    if (this.selectedCell && this.selectedCell.isMutant) this.incScore(1)
    else this.incScore(-1)
  }

  incScore(value) {
    if (this.score + value >= 0) this.score += value
    this.level = Math.floor((this.score / this.nextLevelScore) + 1)
    this.selectedCell = null
    this.scene.start('Game')
  }

  // Generates array of strings (pixel rows) to be used by Phaser's generateTexture.
  // Each char in the string represents a color in the pallete
  generatePattern (size) {
    return Array.from({length: size}, (v, i) => (
      Array.from({length: size}, (v, i) => this.randomPixel()).join('')
    ))
  }

  // Mutates 1 pixel per row
  mutatePattern (pattern) {
    return pattern.map((row) => {
      const index = Phaser.Math.RND.integerInRange(0, row.length - 1)
      const pixel = parseInt(row[index], 16)
      const mutatedPixel = (pixel + 8) % (Object.keys(palette).length - 1)

      return row.substr(0,index) + (mutatedPixel).toString(16) + row.substr(index + 1)
    })
  }

  randomPixel () {
    const pixel = Phaser.Math.RND.integerInRange(0, Object.keys(palette).length - 1).toString(16)
    return pixel
  }

  update () {
    this.timer.update()
  }
}


const palette = {
  0: '#ec4035',
  1: '#ec7b2e',
  2: '#f1a430',
  3: '#f8cf32',
  4: '#ea4993',
  5: '#f7eb3a',
  6: '#87c341',
  7: '#55b848',
  8: '#4cb3d5',
  9: '#377abd',
  a: '#31499c',
  b: '#834c9d',
}
