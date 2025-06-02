import { clientCredentials } from '../utils/client';

const getEvents = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const getSingleEvent = async (id) => {
  const get = await fetch(`${clientCredentials.databaseURL}/events/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = get.json();
  return response;
};

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

const updateEvent = async (event, id) => {
  await fetch(`${clientCredentials.databaseURL}/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  // backend returns None so no need to return data here as it will cause errors
};

const deleteEvent = async (id) => {
  await fetch(`${clientCredentials.databaseURL}/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // 204 no content
};

export { getEvents, createEvent, getSingleEvent, updateEvent, deleteEvent };
