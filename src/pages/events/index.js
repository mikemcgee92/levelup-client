import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/event/EventCard';
import { getEvents, joinEvent, leaveEvent } from '../../api/eventData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getEvents(user.uid).then((data) => setEvents(data));
  }, [user.uid]);

  return (
    <article className="events">
      <h1>Events</h1>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Event
      </Button>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard description={event.description} date={event.date} time={event.time} />
          <Link href={`events/edit/${event.id}`} passHref>
            Edit {event.description}
          </Link>
          <br />
          <Link href={`events/${event.id}`} passHref>
            View {event.description}
          </Link>
          <br />{' '}
          {event.joined ? (
            <Button
              onClick={() => {
                leaveEvent(event.id, user.uid)
                  .then(() => getEvents(user.uid))
                  .then((data) => setEvents(data));
              }}
            >
              Leave
            </Button>
          ) : (
            <Button
              onClick={() => {
                joinEvent(event.id, user.uid)
                  .then(() => getEvents(user.uid))
                  .then((data) => setEvents(data));
              }}
            >
              Join
            </Button>
          )}
        </section>
      ))}
    </article>
  );
}

export default Home;
