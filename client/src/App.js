import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io.connect("http://localhost:8000");

function App() {
  const [message, setMessage] = useState("");
  const [recievedMessage, setRecievedMessage] = useState("");
  const [room, setRoom] = useState("");

  const sendMessage = () => {
    //sendMessageToServer
    socket.emit("send_message", { message, room });
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  useEffect(() => {
    //recieveMessageFromTheServer
    socket.on("recieve_message", (data) => {
      setRecievedMessage(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input
        placeholder="Enter room number!"
        onChange={(e) => setRoom(Number(e.target.value))}
      />
      <button onClick={joinRoom}>Join Room</button>
      <input
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>{recievedMessage}</h1>
    </div>
  );
}

export default App;
