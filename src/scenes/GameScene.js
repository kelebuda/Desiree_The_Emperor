import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.selectedVillager = null;
    this.lovePoints = 0;
    this.homageVillagers = [];
    this.knightAppeared = false;
    this.questionAnswered = false;
  }

  create() {
    const { width, height } = this.scale;

    // Add the tilemap image
    const tilemap = this.add.image(width / 2, height / 2, 'tilemap');
    tilemap.setDisplaySize(width, height); // Adjust the tilemap to cover the entire screen

    // Create buildings with scale
    this.princessCastle = this.add.sprite(width / 2, height / 2, 'PrincessCastle').setScale(0.3);
    this.templeOfLove = this.add.sprite(100, height / 2, 'TempleOfLove').setScale(0.3);
    this.statue = this.add.sprite(width / 2, height - 75, 'Statue').setScale(0.3);

    // Add titles for buildings
    this.add.text(this.princessCastle.x, this.princessCastle.y - 100, 'Désirée\'s Castle', {
      fontSize: '16px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(this.templeOfLove.x, this.templeOfLove.y - 100, 'Temple of Désirée', {
      fontSize: '16px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(this.statue.x, this.statue.y - 100, 'Statue of Désirée', {
      fontSize: '16px',
      fill: '#ffffff'
    }).setOrigin(0.5);

    // Create villagers with scale and spacing
    this.villagers = this.physics.add.group({
      key: 'villager',
      repeat: 4,
      setXY: { x: width - 100, y: height / 2 - 200, stepY: 100 } // Adjust stepY for spacing
    });

    this.villagers.children.iterate((villager) => {
      villager.setInteractive();
      villager.setScale(0.3);
      villager.on('pointerdown', () => {
        this.selectVillager(villager);
      });
    });

    // Enable homage interaction
    this.statue.setInteractive();
    this.statue.on('pointerdown', this.payHomage, this);

    // Timer for earning love points
    this.time.addEvent({
      delay: 10000,
      callback: this.earnLovePoints,
      callbackScope: this,
      loop: true
    });

    // Love points text
    this.lovePointsText = this.add.text(width / 2, 25, 'Love Points = Age: 0', {
      fontSize: '20px',
      fill: '#ffffff',
    }).setOrigin(0.5);

    // Add the princess
    this.princess = this.add.sprite(width - 100, 100, 'Princess').setScale(0.3);

    // Add princess text
    this.princessText = this.add.text(width - 250, 50, 'To find my heart, \nseek the stone where\nI stand tall and fair.\nBring my friends there,\nand love will bloom.', {
      fontSize: '16px',
      fill: '#ffffff',
      wordWrap: { width: 200 }
    }).setOrigin(0.5);
  }

  selectVillager(villager) {
    if (this.selectedVillager) {
      this.selectedVillager.clearTint();
    }
    this.selectedVillager = villager;
    this.selectedVillager.setTint(0x00ff00); // Add shadow effect (green tint)
  }

  payHomage() {
    if (this.selectedVillager) {
      this.selectedVillager.isPraying = true;
      this.selectedVillager.setTint(0x0000ff); // Indicate praying (blue tint)
      this.selectedVillager.removeInteractive(); // Make the villager non-interactive
      this.homageVillagers.push(this.selectedVillager);
      this.selectedVillager = null;
    }
  }

  earnLovePoints() {
    this.homageVillagers.forEach(villager => {
      villager.setTint(0x0000ff); // Keep blue tint while praying
    });

    this.lovePoints += this.homageVillagers.length;
    this.lovePointsText.setText(`Love Points: ${this.lovePoints}`);

    if (this.lovePoints >= 20 && !this.knightAppeared) {
      this.spawnKnightAndDragons();
    }
  }

  spawnKnightAndDragons() {
    const { width, height } = this.scale;

    // Add the knight
    this.knight = this.add.sprite(width - 150, 100, 'Knight').setScale(0.3);

    // Add dragons around the princess castle
    this.dragons = [
      this.add.sprite(width / 2 - 100, height / 2 - 100, 'Dragon1').setScale(0.3).setInteractive(),
      this.add.sprite(width / 2 + 100, height / 2 - 100, 'Dragon2').setScale(0.3).setInteractive(),
      this.add.sprite(width / 2, height / 2 + 100, 'Dragon3').setScale(0.3).setInteractive()
    ];

    // Add labels to dragons
    this.dragonLabels = [
      this.add.text(width / 2 - 100, height / 2 - 50, 'Iron Flame', { fontSize: '16px', fill: '#ffffff' }).setOrigin(0.5),
      this.add.text(width / 2 + 100, height / 2 - 50, 'Golden Wing', { fontSize: '16px', fill: '#ffffff' }).setOrigin(0.5),
      this.add.text(width / 2, height / 2 + 150, 'Silver Sky', { fontSize: '16px', fill: '#ffffff' }).setOrigin(0.5)
    ];

    // Add interaction for dragons
    this.dragons[0].on('pointerdown', () => this.correctAnswer());
    this.dragons[1].on('pointerdown', () => this.wrongAnswer());
    this.dragons[2].on('pointerdown', () => this.wrongAnswer());

    // Update princess text to ask the question
    this.princessText.setText('What is the sequel called of "Fourth Wing"?');

    this.knightAppeared = true;
  }

  correctAnswer() {
    this.princessText.setText('Correct! We shall go to the Temple of Love.');
    this.dragons.forEach(dragon => dragon.destroy());
    this.dragonLabels.forEach(label => label.destroy());
    this.knight.destroy();
    this.princess.destroy();
    this.templeOfLove.setTint(0xff0000); // Shake effect simulation
    this.add.text(this.templeOfLove.x, this.templeOfLove.y - 150, 'Fick mich i mim tempel!', {
      fontSize: '20px',
      fill: '#ffffff',
    }).setOrigin(0.5);
    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.templeOfLove.clearTint();
      }
    });
    this.time.addEvent({
      delay: 5000, // Wait for 5 seconds
      callback: () => {
        this.showCelebrationScreen();
      }
    });
  }

  wrongAnswer() {
    this.princessText.setText('Incorrect. Try again.');
  }

  showCelebrationScreen() {
    const { width, height } = this.scale;
    const celebrationImage = this.add.image(width / 2, height / 2, 'celebration');
    celebrationImage.setDisplaySize(width / 2, height / 2); // Make the image half the screen size
    celebrationImage.setOrigin(0.5, 0.5); // Center the image
  }

  update() {
    // No need to move characters in the update loop anymore
  }
}
