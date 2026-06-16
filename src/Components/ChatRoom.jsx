import { useEffect, useState } from "react";

const ChatRoom = ({ username, room, socket, onLeave }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const receiveMessage = (msg) => {
      console.log("Received:", msg);
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [socket]);

  const handleSend = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const msgData = {
      text: message,
      room,
      username,
    };

    socket.emit("send", msgData);

    setMessage("");
  };

  return (
    <div className="flex flex-col h-[550px] w-full max-w-md border rounded-2xl bg-white shadow-xl overflow-hidden">

      <div className="bg-blue-950 p-4 flex justify-between items-center">
        <h3 className="font-bold text-white">
          Room: {room}
        </h3>

        <button
          onClick={onLeave}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Leave
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.username === username
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-xl ${
                msg.username === username
                  ? "bg-yellow-200"
                  : "bg-gray-200"
              }`}
            >
              <strong>{msg.username}: </strong>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSend}
        className="p-4 flex gap-2 border-t"
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          className="flex-1 border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;