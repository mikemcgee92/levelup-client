import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleGame } from '../../api/gameData';

export default function ViewGame({ params }) {
  const [gameDetails, setGameDetails] = useState({});

  const { id } = params;

  useEffect(() => {
    getSingleGame(id).then(setGameDetails);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <h1>{gameDetails.title}</h1>
        <h3>By {gameDetails.maker}</h3>
        <h3>Genre: {gameDetails.gameType}</h3>
        <h3>For {gameDetails.numberOfPlayers} players</h3>
        <h3>Skill Level: {gameDetails.skillLevel}</h3>
      </div>
    </div>
  );
}

ViewGame.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
