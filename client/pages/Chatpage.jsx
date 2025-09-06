import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatlist from "../components/Chatlist";
import Chatwindow from "../components/Chatwindow";

export default function Chatpage() {
  const [conversations] = useState([
    { id: 1, name: 'Aida Nazarbayeva', lastMessage: 'Thanks for the study notes!', time: '10:30 AM', unread: 2 },
    { id: 2, name: 'Bekzat Tolegenov', lastMessage: 'See you at the library', time: 'Yesterday', unread: 0 },
  ]);

  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);

  function openConversation(conv) {
    setActive(conv);
    setMessages([
      { sender: 'them', content: 'Hey! How are your studies going?', time: '10:25 AM' },
      { sender: 'me', content: 'Going well! Thanks for asking. How about you?', time: '10:27 AM' },
      { sender: 'them', content: 'Thanks for the study notes!', time: '10:30 AM' },
    ]);
  }

  function sendMessage(text) {
    setMessages(prev => [...prev, { sender: 'me', content: text, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) }]);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar onSignIn={() => {}} onSignUp={() => {}} onOpenChat={() => {}} />
      <main className="flex-1 flex">
        <Chatlist conversations={conversations} activeId={active?.id} onOpen={openConversation} />
        <Chatwindow active={active} messages={messages} onSend={sendMessage} onClose={() => setActive(null)} />
      </main>
      <Footer />
    </div>
  );
}
