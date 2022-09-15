import {
  players,
  addPlayer,
  getPlayersInRoom,
  getPlayer,
  removePlayer,
  updatePlayer,
} from "./players.js";

export default (io, socket) => {
  socket.on("join-room", ({ player, roomId }, callback) => {
    const playersInRoom = getPlayersInRoom(roomId);
    if (playersInRoom.length >= 2) {
      return callback("Room Full, try another one.");
    }

    socket.join(roomId);

    const { updatedPlayer, err } = updatePlayer(player.playerId, {
      roomId: roomId,
    });

    if (err) {
      return callback(err);
    }

    io.in(updatedPlayer.roomId).emit("other-join", getPlayersInRoom(roomId));
    socket.emit("changed-room", updatedPlayer);
  });

  socket.on("create-player", (player, callback) => {
    player.playerId = socket.id;
    player.roomId = socket.id;
    const { playerCreated, err } = addPlayer(player);

    if (err) return callback(err);

    socket.emit("created-player", playerCreated);
  });
};
