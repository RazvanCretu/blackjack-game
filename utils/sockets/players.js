export let players = [];

export const addPlayer = ({ playerId, username, roomId }) => {
  console.log(playerId, username, roomId);

  username = username.trim().toLowerCase();
  roomId = roomId.trim().toLowerCase();

  const existingPlayer = players.find((player) => {
    return player.username === username;
  });

  //   console.log(existingPlayer);
  if (existingPlayer) {
    return { err: "Playername is taken" };
  }

  const playerCreated = { playerId, username, roomId };

  players.push(playerCreated);
  return { playerCreated };
};

export const removePlayer = (id) => {
  const index = players.findIndex((player) => {
    return player.playerId === id;
  });

  console.log(index);

  if (index !== -1) {
    return players.splice(index, 1)[0];
  }
};

export const getPlayer = (id) =>
  players.find((player) => player.playerId === id);

export const getPlayersInRoom = (room) =>
  players.filter((player) => player.roomId === room);
