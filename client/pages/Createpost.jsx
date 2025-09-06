import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Postform from "../components/Postform";
import { useNavigate } from "react-router-dom";

export default function Createpost() {
  const navigate = useNavigate();

  function handleSubmit(post) {
    // in real app save to server
    console.log('new post', post);
    navigate('/');
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar onSignIn={() => navigate('/login')} onSignUp={() => navigate('/register')} />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <Postform onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
      </main>
      <Footer />
    </div>
  );
}
