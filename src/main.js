import 'phaser'
import Boot from './scenes/Boot'
import Game from './scenes/Game'

const width = 380
const height = 550
const zoom = window.innerHeight / height

const config = {
    type: Phaser.AUTO,
    parent: 'content',
    backgroundColor: 0xffffff,
    scene: [
      Boot,
      Game,
    ],
    width,
    height,
    zoom,

}

const game = new Phaser.Game(config)
