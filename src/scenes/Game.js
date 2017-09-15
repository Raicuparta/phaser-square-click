import Cell from '../Cell'

export default class Game extends Phaser.Scene {
  constructor () {
    super({
      key: 'Game'
    })
  }

  create () {
    new Cell(this, 100, 100)
  }

  update () {
  }
}
