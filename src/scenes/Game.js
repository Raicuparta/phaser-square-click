import Cell from '../Cell'
import Timer from '../Timer'

export default class Game extends Phaser.Scene {
  level = 1
  score = 0
  delay = 4000
  delayStep = 50
  // Score required to go to next level
  nextLevelScore = 4
  selectedCell = null
  timer = null

  constructor () {
    super({
      key: 'Game'
    })
  }

  create () {
    const cellSize = 58
    const topMargin = 0.1

    const columns = 5
    const rows = 7
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
          x: x,
          y: y + topMargin,
          palette,
          isMutant,
        })
      }
    }

    // Create timer
    this.timer = new Timer({
      scene: this,
      x: 190,
      y: 0,
      width: 340,
      delay: this.delay,
      callback: this.handleTimeOver,
      text: this.score.toString(10)
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
    this.delay -= value * this.delayStep
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

  // Mutates some pixels per row
  mutatePattern (pattern) {
    const mutationsPerRow = pattern[0].length
    return pattern.map((row) => {
      const mutatedRow = Array.from(row).map(char => (
        char === '0' ? '1' : '0'
      ))

      return mutatedRow.join('')
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
  0: '#88C542', // green
  1: '#EC4A94', // #magenta
}
