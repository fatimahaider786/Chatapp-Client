import { useState } from "react";

const JoinGroup = ({ onJoin }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && room.trim()) {
      onJoin({ username, room });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm border border-pink-800">
      <h2 className="text-xl font-bold mb-4 text-center text-black">
        Join a Chat Group
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text- ">Username</label>
          <input
            type="text"
            placeholder=" Enter your name"
            className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-green-950">Room ID</label>
          <input
            type="text"
            placeholder="E.g. ideoversity"
            className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          Join Room
        </button>
      </form>
    </div>
  );
};

export default JoinGroup;