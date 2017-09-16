import 'phaser'
import Boot from './scenes/Boot'
import Game from './scenes/Game'


const config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 360,
    height: 640,
    backgroundColor: 0xffffff,
    scene: [
      Boot,
      Game,
    ],
}

const game = new Phaser.Game(config)
