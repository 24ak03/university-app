import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Registerform from "../components/Registerform";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

const universities = [
  "Nazarbayev University",
  "Al-Farabi Kazakh National University",
  "KIMEP University",
  "Satbayev University",
  "Eurasian National University",
  "Kazakh-British Technical University",
];

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleSubmit(payload) {
    login({ name: payload.fullName, email: payload.email, university: payload.university, avatar: "https://placehold.co/32x32/2563EB/ffffff?text=AZ" });
    navigate('/');
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <Registerform onSubmit={handleSubmit} onNavigate={(p) => p === 'signin' && navigate('/login')} universities={universities} />
      </main>
      <Footer />
    </div>
  );
}
