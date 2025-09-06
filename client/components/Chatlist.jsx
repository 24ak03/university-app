import React from "react";

export default function Chatlist({ conversations = [], activeId, onOpen }) {
  return (
    <div className="w-72 border-r border-[#e2e8f0] p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[#1e293b] font-semibold">Messages</h3>
      </div>
      <div className="space-y-2 overflow-auto">
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => onOpen && onOpen(c)}
            className={`w-full text-left p-3 rounded-lg border transition-colors ${
              activeId === c.id ? "border-[#2563EB] bg-[#eff6ff]" : "border-[#e2e8f0] hover:border-[#2563EB]"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="font-medium text-[#1e293b] truncate">{c.name}</p>
              <span className="text-xs text-[#64748b]">{c.time}</span>
            </div>
            <p className="text-sm text-[#64748b] truncate">{c.lastMessage}</p>
            {c.unread > 0 && <span className="mt-2 inline-flex items-center justify-center text-xs bg-[#ef4444] text-white rounded-full px-2 py-0.5">{c.unread} new</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
