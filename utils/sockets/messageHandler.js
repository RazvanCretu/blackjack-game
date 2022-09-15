import {
  players,
  addPlayer,
  getPlayersInRoom,
  getPlayer,
  removePlayer,
} from "./players.js";

export default (io, socket) => {
  socket.on("join-room", ({ player, roomId }, callback) => {
    const playersInRoom = getPlayersInRoom(roomId);
    if (playersInRoom.length >= 2) {
      return callback("Room Full, try another one.");
    }

    socket.join(roomId);
    removePlayer(player.playerId);
    player.roomId = roomId;
    const { playerCreated, err } = addPlayer(player);

    if (err) {
      return callback(err);
    }

    socket.in(player.roomId).emit("other-join", playerCreated);
    socket.emit("changed-room", playerCreated);
  });

  socket.on("create-player", (player, callback) => {
    player.playerId = socket.id;
    player.roomId = socket.id;
    const { playerCreated, err } = addPlayer(player);

    if (err) return callback(err);

    socket.emit("created-player", playerCreated);
  });
};
