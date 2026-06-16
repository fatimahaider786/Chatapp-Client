import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import JoinGroup from "./Components/JoinGroup";
import ChatRoom from "./Components/ChatRoom";
import "./App.css";


const SOCKET_URL = "https://chatapp-server-ruddy.vercel.app";

function App() {
  const [socket, setSocket] = useState(null);

  const [user1Joined, setUser1Joined] = useState(false);
  const [user1Data, setUser1Data] = useState({
    username: "",
    room: "",
  });

  const [user2Joined, setUser2Joined] = useState(false);
  const [user2Data, setUser2Data] = useState({
    username: "",
    room: "",
  });

  useEffect(() => {
    
    const newSocket = io(SOCKET_URL, {
      transports: ["polling", "websocket"] 
    });

    newSocket.on("connect", () => {
      console.log("Connected to Live Vercel Server:", newSocket.id);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleJoin1 = ({ username, room }) => {
    if (!socket) return;

    socket.emit("join", room);

    setUser1Data({
      username,
      room,
    });

    setUser1Joined(true);
  };

  const handleJoin2 = ({ username, room }) => {
    if (!socket) return;

    socket.emit("join", room);

    setUser2Data({
      username,
      room,
    });

    setUser2Joined(true);
  };

  return (
    <div className="min-h-screen bg-gray-200 p-4">
      <h1 className="text-center text-2xl font-bold mb-6 text-blue-800">
        ✨ Group Chat 🥰
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">

        <div className="flex flex-col items-center">
          <p className="mb-2 font-semibold text-gray-600">
            User Window 1
          </p>

          {!user1Joined ? (
            <JoinGroup onJoin={handleJoin1} />
          ) : (
            <ChatRoom
              username={user1Data.username}
              room={user1Data.room}
              socket={socket}
              onLeave={() => setUser1Joined(false)}
            />
          )}
        </div>

        <div className="flex flex-col items-center">
          <p className="mb-2 font-semibold text-gray-600">
            User Window 2
          </p>

          {!user2Joined ? (
            <JoinGroup onJoin={handleJoin2} />
          ) : (
            <ChatRoom
              username={user2Data.username}
              room={user2Data.room}
              socket={socket}
              onLeave={() => setUser2Joined(false)}
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default App;