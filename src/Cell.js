export default class Cell extends Phaser.GameObjects.Image {
  constructor (scene, x, y) {
    scene.textures.generate('cell', { data: generatePattern(10), pixelWidth: 4, pixelHeight: 4 })
    super(scene, x, y, 'cell')
    scene.add.existing(this)
  }
}

const generatePattern = function(size) {
  return Array.from({length: size}, (v, i) => (
    Array.from({length: size}, (v, i) => Math.floor(Math.random() * 10)).join('')
  ))
}
