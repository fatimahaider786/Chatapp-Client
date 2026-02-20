import { useEffect, useState } from "react";

const ChatRoom = ({ username, room, socket, onLeave }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const receiveMessage = (msg) => {
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
    <div className="flex flex-col h-[550px] w-full max-w-md border border-gray-200 rounded-2xl bg-white shadow-xl overflow-hidden font-sans">
      
      {/* 🟦 COLORED HEADLINE / HEADER */}
      <div className="bg-gradient-to-r bg-blue-950 to-indigo-700 p-4 flex justify-between items-center shadow-md">
        <div>
          <h3 className="font-bold text-white text-lg tracking-wide uppercase">
            Room: {room}
          </h3>
        </div>
        <button 
          onClick={onLeave}
          className="bg-white/20 hover:bg-red-500 text-white text-[10px] px-4 py-1.5 rounded-lg font-bold transition-all border border-white/30 uppercase"
        >
          Leave
        </button>
      </div>
      
      {/* ✉️ MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`p-3 px-4 rounded-2xl max-w-[85%] shadow-sm ${
              msg.username === username 
                ? 'bg-amber-200 text-black rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
            }`}>
              <p className="text-sm">
                <span className={`font-bold mr-1 ${
                  msg.username === username ? 'text-orange-950' : 'text-pink-900'
                }`}>
                  {msg.username}:
                </span> 
                {msg.text}
              </p>
            </div>
          </div>
        ))}
      </div>

  
      <form onSubmit={handleSend} className="p-4 bg-green-500 border-t  border-amber-500 flex gap-2">
        <input 
          placeholder="Type your message..."
          className="flex-1 bg-sky-200 border-0 p-2.5 rounded-xl focus:ring-2 focus:ring-blue-400 text-black text-sm transition-all outline-amber-300"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-amber-200 hover:bg-blue-700 text-black px-5 rounded-xl transition-all shadow-md font-bold text-sm active:scale-95">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;