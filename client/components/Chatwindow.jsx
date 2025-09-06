import React, { useState, useRef, useEffect } from "react";

export default function Chatwindow({ active, messages = [], onSend, onClose }) {
  const [text, setText] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages, active]);

  function handleSend(e) {
    e && e.preventDefault();
    if (!text.trim()) return;
    if (onSend) onSend(text.trim());
    setText("");
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-[#e2e8f0] flex items-center justify-between">
        <p className="font-semibold text-[#1e293b]">{active ? active.name : "Select a conversation"}</p>
        <div>
          <button onClick={onClose} className="text-[#64748b]">✕</button>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 overflow-auto p-4 space-y-3 bg-[#f8fafc]">
        {active ? (
          messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${m.sender === "me" ? "bg-[#2563EB] text-white" : "bg-white border border-[#e2e8f0] text-[#1e293b]"}`}>
                <p>{m.content}</p>
                <p className="mt-1 text-[10px] opacity-70">{m.time}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-[#64748b]">Choose a conversation to start chatting.</p>
        )}
      </div>

      <form className="p-4 flex gap-2 border-t border-[#e2e8f0]" onSubmit={handleSend}>
        <input className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg" placeholder="Type your message..." value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit" className="px-4 py-2 bg-[#2563EB] text-white rounded-lg">Send</button>
      </form>
    </div>
  );
}
