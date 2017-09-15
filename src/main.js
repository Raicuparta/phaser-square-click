import 'phaser'
import BootScene from './scenes/Boot'
import Game from './scenes/Game'


const config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 800,
    height: 600,
    scene: [
      BootScene,
      Game,
    ]
}

const game = new Phaser.Game(config)
