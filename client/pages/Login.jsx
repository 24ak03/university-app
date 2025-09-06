import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loginform from "../components/Loginform";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleSubmit({ email, password }) {
    // Mock auth: create a user object from email
    const name = email.split("@")[0].replace(/[._]/g, " ");
    login({ name: name.charAt(0).toUpperCase() + name.slice(1), email, university: "Nazarbayev University", avatar: "https://placehold.co/32x32/2563EB/ffffff?text=AZ" });
    navigate('/');
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <Loginform onSubmit={handleSubmit} onNavigate={(page) => (page === 'signup' ? navigate('/register') : null)} />
      </main>
      <Footer />
    </div>
  );
}
