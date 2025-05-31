import React, { useEffect, useState } from 'react';
import { getSingleGame } from '../../api/gameData';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({});

  const id = window.location.href.split('games/')[1];

  useEffect(() => {
    getSingleGame(id).then(setGameDetails);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <h1>{gameDetails.title}</h1>
        <h3>By {gameDetails.maker}</h3>
        <h3>Genre: {gameDetails.game_type?.label}</h3>
        <h3>For {gameDetails.number_of_players} players</h3>
        <h3>Skill Level: {gameDetails.skill_level}</h3>
      </div>
    </div>
  );
}
