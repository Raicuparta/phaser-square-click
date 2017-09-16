import Cell from '../Cell'
import Timer from '../Timer'

export default class Game extends Phaser.Scene {
  level = 1
  score = 0
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
    const cellSize = 50
    const topMargin = 0.1

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
      x: 175,
      y: 0,
      width: 350,
      delay: 1500,
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

    const mutationsPerRow = Math.floor(this.level / 2)
    return pattern.map((row) => {
      let mutatedRow = Array.from(row)
      // Get all the indexes
      const indexes = Array.from(mutatedRow.keys())
      // Pick n of those indexes randomly
      const randomIndexes = Utils.shuffle(indexes).slice(0, mutationsPerRow)
      // Mutate the pixels
      for (let i of randomIndexes) {
        mutatedRow[i] += 8
        mutatedRow[i] %= Object.keys(palette).length - 1
      }
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
  0: '#ec4035',
  1: '#f1a430',
  2: '#f7eb3a',
  3: '#55b848',
  4: '#377abd',
  5: '#834c9d',
}
