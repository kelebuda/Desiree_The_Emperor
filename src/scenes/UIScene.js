import Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  create() {
    const text = this.add.text(10, 10, 'Désirée the Empress', {
      fontSize: '20px',
      fill: '#ffffff',
    });

    this.selectedVillagerText = this.add.text(10, 40, '', {
      fontSize: '16px',
      fill: '#ffffff',
    });

    this.icon = this.add.sprite(50, 100, 'TempleOfLove');
    this.icon.setVisible(false);

    this.scene.get('GameScene').events.on('selectVillager', (villager) => {
      this.selectedVillagerText.setText('Villager selected');
      this.icon.setVisible(true);
    });
  }
}
