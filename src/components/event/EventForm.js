import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent } from '../../api/eventData';

const initialState = {
  game: 0,
  description: '',
  date: '',
  time: '',
  organizer: 0,
};

function EventForm({ user }) {
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      game: Number(currentEvent.game),
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      organizer: currentEvent.organizer,
      userId: user.uid,
    };

    // Send POST request to your API
    createEvent(event).then(() => router.push('/events'));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Game:</Form.Label>
        <Form.Control name="game" required value={currentEvent.game} onChange={handleChange} />
        <Form.Label>Description:</Form.Label>
        <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
        <Form.Label>Date:</Form.Label>
        <Form.Control name="date" required value={currentEvent.date} onChange={handleChange} />
        <Form.Label>Time:</Form.Label>
        <Form.Control name="time" required value={currentEvent.time} onChange={handleChange} />
        <Form.Label>Organizer:</Form.Label>
        <Form.Control name="organizer" required value={currentEvent.organizer} onChange={handleChange} />
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
