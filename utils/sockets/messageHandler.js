import {
  players,
  addPlayer,
  getPlayersInRoom,
  getPlayer,
  removePlayer,
} from "./players.js";

// let players = [];
// let rooms = [];
// let players = {};

// const addPlayer = (player) => {
//   players.push(player);
// };

// const removePlayer = (playerId) => {
//   players = players.filter((player) => player.playerId !== playerId);
// };

export default (io, socket) => {
  socket.on("join-room", ({ username, roomId }, callback) => {
    // socket.leave();
    const playersInRoom = getPlayersInRoom(roomId);
    if (playersInRoom.length === 2) {
      callback({ message: "Room Full" });
    }
    socket.join(roomId);
    // console.log(socket.rooms);
    socket.emit("changed-room", roomId);
  });

  socket.on("create-player", (player, callback) => {
    // socket.join(player.roomId);
    // console.log(io.of("/").adapter.rooms[player.roomId]);
    player.playerId = socket.id;
    player.roomId = socket.id;
    const { playerCreated, err } = addPlayer(player);
    // console.log(player, playerCreated, err);
    if (err) return callback(err);

    socket.emit("created-player", playerCreated);
    // rooms.push({
    //     roomId: player.roomId,
    //     playersInRoom: []
    // })
    // socket.join(player.roomId);
  });
};
