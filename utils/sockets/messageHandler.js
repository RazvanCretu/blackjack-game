let players = [];
let rooms = [];
// let players = {};

const addPlayer = (player) => {
  players.push(player);
};

const removePlayer = (playerId) => {
  if (users.hasOwnProperty(nickname)) {
    delete users[nickname];
  }
};

export default (io, socket) => {
  const createPlayer = (player) => {
    addPlayer(player);
    // rooms.push({
    //     roomId: player.roomId,
    //     playersInRoom: []
    // })
    // socket.join(player.roomId);
    socket.emit("created-player", player);
  };

  const joinRoom = (roomId) => {
    socket.join(roomId);
    console.log(socket.rooms, io.of("/").adapter.rooms);
    socket.emit("changed-room", roomId);
  };

  socket.on("join-room", joinRoom);
  socket.on("create-player", createPlayer);
};
