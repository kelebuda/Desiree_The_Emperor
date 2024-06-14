import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Load assets from public/assets/images
    this.load.image('tilemap', 'assets/images/tilemap.png');
    this.load.image('PrincessCastle', 'assets/images/PrincessCastle.png');
    this.load.image('Statue', 'assets/images/Statue.png');
    this.load.image('TempleOfLove', 'assets/images/TempleOfLove.png');
    this.load.image('villager', 'assets/images/Villager.png');
    this.load.image('Princess', 'assets/images/Princess.png'); // Load princess image
    this.load.image('Knight', 'assets/images/Knight.png'); // Load knight image
    this.load.image('Dragon1', 'assets/images/Dragon1.png'); // Load first dragon image
    this.load.image('Dragon2', 'assets/images/Dragon2.png'); // Load second dragon image
    this.load.image('Dragon3', 'assets/images/Dragon3.png'); // Load third dragon image
  }

  create() {
    this.scene.start('GameScene');
  }
}
