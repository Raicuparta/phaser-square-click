/* globals __DEV__ */

export default class Boot extends Phaser.Scene {
  constructor () {
    super({ key: 'Boot' })
    if (__DEV__) {
      console.log('Boot created!')
    }
  }

  preload () {
  }

  create () {
    this.scene.start('Game')
  }
}
