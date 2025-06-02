import { clientCredentials } from '../utils/client';

const getGames = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const getSingleGame = async (id) => {
  const get = await fetch(`${clientCredentials.databaseURL}/games/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = get.json();
  return response;
};

const createGame = async (game) => {
  const post = await fetch(`${clientCredentials.databaseURL}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  });
  const response = post.json();
  return response;
};

const updateGame = async (game, id) => {
  await fetch(`${clientCredentials.databaseURL}/games/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  });
  // backend returns None so no need to return data here as it will cause errors
};

const getGameTypes = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/gametypes`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const deleteGame = async (id) => {
  await fetch(`${clientCredentials.databaseURL}/games/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // 204 no content
};

export { getGames, createGame, getGameTypes, getSingleGame, updateGame, deleteGame };
