import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getSingleEvent, deleteEvent } from '../../api/eventData';

export default function ViewEvent() {
  const [eventDetails, setEventDetails] = useState({});
  const router = useRouter();

  const id = window.location.href.split('events/')[1];

  useEffect(() => {
    getSingleEvent(id).then(setEventDetails);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <h1>{eventDetails.description}</h1>
        <h3>Playing {eventDetails.game?.title}</h3>
        <h3>On {eventDetails.date}</h3>
        <h3>At {eventDetails.time} players</h3>
        <h3>Hosted by {eventDetails.organizer?.bio}</h3>
        <Button
          onClick={() => {
            deleteEvent(eventDetails.id);
            router.push('/events');
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
