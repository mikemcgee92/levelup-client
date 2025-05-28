import { clientCredentials } from '../utils/client';

const getEvents = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const createEvent = async (event) => {
  const post = await fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  const response = post.json();
  return response;
};

export { getEvents, createEvent };
