import React, { useState, useEffect } from 'react';
import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

const UI = () => {
  const [villagerSelected, setVillagerSelected] = useState(false);

  useEffect(() => {
    const selectVillagerHandler = () => {
      setVillagerSelected(true);
    };

    eventEmitter.on('selectVillager', selectVillagerHandler);

    return () => {
      eventEmitter.off('selectVillager', selectVillagerHandler);
    };
  }, []);

  return (
    <div className="ui-container">
      <h1>Village RTS</h1>
      {villagerSelected && (
        <div className="menu">
          <img src="assets/images/TempleOfLove.png" alt="Temple of Love" />
          <p>Build Temple of Love</p>
        </div>
      )}
    </div>
  );
};

export default UI;
