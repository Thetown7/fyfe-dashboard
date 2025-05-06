import React from 'react';

export default function ChatBox({
    chatMessages,
    setChatMessages,
    newMessage,
    setNewMessage,
    customerName,
    showChat,
  }) {
  return (
    <>
      {showChat && (
  <div className="bg-gray-100 p-4 mt-4 rounded-2xl shadow-inner max-h-60 overflow-y-auto space-y-2">
    <div className="font-semibold mb-2 text-[#D39BFF]">Chat Live con {customerName || 'il Cliente'}</div>
    <div className="space-y-1 max-h-32 overflow-y-auto">
      {chatMessages.map((msg, idx) => (
        <div key={idx} className="text-sm bg-white p-2 rounded-xl shadow">
          {msg}
        </div>
      ))}
    </div>
    <div className="flex gap-2 mt-2">
      <input
        type="text"
        className="flex-1 border rounded-xl p-2 text-sm"
        placeholder="Scrivi un messaggio..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button
        onClick={() => {
          if (newMessage.trim()) {
            setChatMessages((prev) => [...prev, newMessage]);
            setNewMessage('');
          }
        }}
        className="bg-[#D39BFF] text-white px-4 rounded-xl text-sm"
      >
        Invia
      </button>
    </div>
  </div>
            )}
    </>
  );
}

