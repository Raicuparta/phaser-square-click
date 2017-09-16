import Cell from '../Cell'

export default class Game extends Phaser.Scene {
  constructor () {
    super({
      key: 'Game'
    })
  }

  create () {
    const cellSize = 50

    const columns = 5
    const rows = 8

    const pattern = this.generatePattern(3)
    const mutation = this.mutatePattern(pattern)

    const mutant = {
      x: Math.floor(Math.random() * columns),
      y: Math.floor(Math.random() * rows),
    }

    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        const isMutant = x === mutant.x && y === mutant.y
        new Cell(this, x, y, cellSize, isMutant ? mutation : pattern, palette)
      }
    }
  }

  // Generates array of strings (pixel rows) to be used by Phaser's generateTexture.
  // Each char in the string represents a color in the pallete
  generatePattern(size) {
    return Array.from({length: size}, (v, i) => (
      Array.from({length: size}, (v, i) => this.randomPixel()).join('')
    ))
  }

  // Mutates 1 pixel per row
  mutatePattern (pattern) {
    return pattern.map((row) => {
      const index = Phaser.Math.RND.integerInRange(0, row.length - 1)
      const pixel = parseInt(row[index], 16)
      const mutatedPixel = (pixel + 8) % Object.keys(palette).length

      return row.substr(0,index) + (mutatedPixel).toString(16) + row.substr(index + 1)
    })
  }

  randomPixel() {
    return Phaser.Math.RND.integerInRange(0, Object.keys(palette).length).toString(16)
  }

  update () {
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
  A: '#31499c',
  B: '#834c9d',
}
