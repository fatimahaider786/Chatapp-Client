import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import JoinGroup from "./Components/JoinGroup.jsx";
import ChatRoom from "./Components/ChatRoom";
import "./App.css";

const SOCKET_URL = "http://localhost:5050";

function App() {
  const [socket, setSocket] = useState(null);

  // User 1 States
  const [user1Joined, setUser1Joined] = useState(false);
  const [user1Data, setUser1Data] = useState({ username: "", room: "" });

  // User 2 States
  const [user2Joined, setUser2Joined] = useState(false);
  const [user2Data, setUser2Data] = useState({ username: "", room: "" });

  useEffect(() => {
    const newSocket = io(SOCKET_URL, { transports: ["websocket"] });
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  // Handlers for User 1
  const handleJoin1 = ({ username, room }) => {
    socket.emit("join", room);
    setUser1Data({ username, room });
    setUser1Joined(true);
  };

  // Handlers for User 2
  const handleJoin2 = ({ username, room }) => {
    socket.emit("join", room);
    setUser2Data({ username, room });
    setUser2Joined(true);
  };

  return (
    <div className="min-h-screen bg-gray-200 p-4">
      <h1 className="text-center text-2xl font-bold mb-6 text-blue-800">✨Group Chat 🥰</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
        
        {/* Left Side: User 1 */}
        <div className="flex flex-col items-center">
          <p className="mb-2 font-semibold text-gray-600">User Window 1</p>
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

        {/* Right Side: User 2 */}
        <div className="flex flex-col items-center">
          <p className="mb-2 font-semibold text-gray-600">User Window 2</p>
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