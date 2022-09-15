import { useState, useEffect } from "react";
import io from "socket.io-client";
import styles from "../styles/Home.module.scss";

let socket;

const Home = () => {
  const [roomInput, setRoomInput] = useState("");
  const [input, setInput] = useState("");
  const [player, setPlayer] = useState();

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // Just call it because we don't need anything else out of it
    await fetch("/api/socket");
    let player_local = localStorage.getItem("player");
    if (player_local) {
      player_local = JSON.parse(player_local);
      console.log(player_local.username);
      setPlayer(player_local);
    }

    // Check if there is already a nickname
    socket = io();

    socket.on("created-player", (player) => {
      setPlayer(player);
      localStorage.setItem("player", JSON.stringify(player));
    });

    socket.on("changed-room", (player) => {
      setPlayer(player);
      localStorage.setItem("player", JSON.stringify(player));
    });

    socket.on("other-join", (player) => {
      alert(player.username);
    });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value.trim());
  };

  const handleInputSubmit = () => {
    if (!input) {
      return;
    }
    socket.emit(
      "create-player",
      {
        username: input,
      },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );
    setInput("");
  };

  const handleRoomIdChange = (e) => {
    setRoomInput(e.target.value.trim());
  };

  const handleRoomIdSubmit = (e) => {
    if (!roomInput) {
      return;
    }
    socket.emit("join-room", { player, roomId: roomInput }, (error) => {
      if (error) {
        alert(error);
      }
    });
    setRoomInput("");
  };

  return (
    <div className={styles.container}>
      {player ? (
        <div>
          <h1>Socket.io</h1>
          <h2>Connected as: {player.username}</h2>
          <button
            onClick={() => {
              setPlayer();
              localStorage.removeItem("player");
            }}
          >
            Exit
          </button>
          <div>
            {<h3>Connected to room: {player.roomId}</h3>}
            <p>Join another room:</p>
            <input
              value={roomInput}
              type="text"
              placeholder="roomId"
              onChange={handleRoomIdChange}
            />
            <button onClick={handleRoomIdSubmit}>Join</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Please enter a nickname:</h2>
          <input
            palceholder="Your username..."
            type="text"
            value={input}
            onChange={handleInputChange}
          />
          <button onClick={handleInputSubmit}>Lesss gooo!</button>
        </div>
      )}
    </div>
  );
};

export default Home;
