import { execOnce } from "next/dist/shared/lib/utils";

export let players = [];

export const addPlayer = ({ playerId, username, roomId }) => {
  username = username.trim().toLowerCase();
  roomId = roomId.trim().toLowerCase();

  const existingPlayer = players.find((player) => {
    return player.username === username;
  });
  if (existingPlayer) {
    return { err: "Playername is taken" };
  }

  const playerCreated = { playerId, username, roomId };

  players.push(playerCreated);
  return { playerCreated };
};

export const updatePlayer = (id, props) => {
  const index = players.findIndex((player) => {
    return player.playerId === id;
  });

  if (index === -1) {
    return { err: `The server couldn't find the player with ID: ${id}` };
  }

  const existingPlayer = players.splice(index, 1)[0];

  const updatedPlayer = {
    ...existingPlayer,
    ...props,
  };

  players.push(updatedPlayer);

  return { updatedPlayer };
};

export const removePlayer = (id) => {
  const index = players.findIndex((player) => {
    return player.playerId === id;
  });

  if (index !== -1) {
    return players.splice(index, 1)[0];
  }
};

export const getPlayer = (id) =>
  players.find((player) => player.playerId === id);

export const getPlayersInRoom = (room) =>
  players.filter((player) => player.roomId === room);
