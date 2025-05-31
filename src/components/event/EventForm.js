import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent, getSingleEvent, updateEvent } from '../../api/eventData';
import { getGames } from '../../api/gameData';

const initialState = {
  game: 0,
  description: '',
  date: '',
  time: '',
  organizer: 0,
};

function EventForm({ user }) {
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const [games, setGames] = useState([]);
  const router = useRouter();

  const loadEventData = () => {
    const url = window.location.href;
    if (url.includes('edit/')) {
      getSingleEvent(url.split('edit/')[1]).then((eventData) => {
        setCurrentEvent({
          ...eventData,
          game: eventData.game?.id || 0,
        });
      });
    }
  };

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  useEffect(() => {
    loadEventData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      game: Number(currentEvent.game),
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      organizer: currentEvent.organizer,
      userId: user.uid,
    };
    try {
      if (window.location.href.includes('edit/')) {
        updateEvent(payload, currentEvent.id).then(() => router.push('/events'));
      } else {
        createEvent(payload).then(() => router.push('/events'));
      }
    } catch (err) {
      console.error('Error creating/updating event', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Game:</Form.Label>
        <Form.Select aria-label="Game" name="game" value={currentEvent.game} onChange={handleChange} required>
          <option value="">Select...</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.title}
            </option>
          ))}
        </Form.Select>
        <Form.Label>Description:</Form.Label>
        <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
        <Form.Label>Date:</Form.Label>
        <Form.Control name="date" required value={currentEvent.date} onChange={handleChange} />
        <Form.Label>Time:</Form.Label>
        <Form.Control name="time" required value={currentEvent.time} onChange={handleChange} />
        <Form.Label>Organizer:</Form.Label>
        <Form.Control name="organizer" required value={currentEvent.organizer?.bio} onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventForm;
