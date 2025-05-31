import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes, getSingleGame, updateGame } from '../../api/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};

function GameForm({ user }) {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of the properties of
  this state variable, you need to provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGameTypes().then(setGameTypes);
  }, []);

  const loadGameData = () => {
    const url = window.location.href;
    if (url.includes('edit/')) {
      getSingleGame(url.split('edit/')[1]).then((gameData) => {
        setCurrentGame({
          ...gameData,
          gameTypeId: gameData.game_type?.id || 0,
        });
      });
    }
  };

  useEffect(() => {
    loadGameData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const payload = {
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: Number(currentGame.numberOfPlayers || currentGame.number_of_players),
      skillLevel: Number(currentGame.skillLevel || currentGame.skill_level),
      gameType: Number(currentGame.gameTypeId),
      userId: user.uid,
    };

    try {
      if (window.location.href.includes('edit/')) {
        updateGame(payload, currentGame.id).then(() => router.push('/games'));
      } else {
        // Send POST request to your API
        createGame(payload).then(() => router.push('/games'));
      }
    } catch (err) {
      console.error('Error creating/updating game', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
        <Form.Label>Maker:</Form.Label>
        <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
        <Form.Label>Number of Players:</Form.Label>
        <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers || currentGame.number_of_players} onChange={handleChange} />
        <Form.Label>Skill Level:</Form.Label>
        <Form.Control name="skillLevel" required value={currentGame.skillLevel || currentGame.skill_level} onChange={handleChange} />
        <Form.Label>Game Type:</Form.Label>{' '}
        <Form.Select aria-label="Game Type" name="gameTypeId" value={currentGame.gameTypeId} onChange={handleChange} required>
          <option value="">Select...</option>
          {gameTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameForm;
