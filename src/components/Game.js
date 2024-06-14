import React, { useEffect } from 'react';
import Phaser from 'phaser';
import BootScene from '../scenes/BootScene';
import GameScene from '../scenes/GameScene';
import UIScene from '../scenes/UIScene';

const Game = () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: '100%',
      height: '100%',
      parent: 'phaser-game',
      scene: [BootScene, GameScene, UIScene],
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
    };

    const game = new Phaser.Game(config);

    // Resize the game if the window size changes
    window.addEventListener('resize', () => {
      game.scale.resize(window.innerWidth, window.innerHeight);
    });

    return () => {
      window.removeEventListener('resize', () => {
        game.scale.resize(window.innerWidth, window.innerHeight);
      });
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-game" style={{ width: '100vw', height: '100vh' }}></div>;
};

export default Game;
