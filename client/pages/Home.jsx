import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar onSignIn={() => navigate('/login')} onSignUp={() => navigate('/register')} onOpenChat={() => navigate('/chats')} />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto py-16">
          <h1 className="text-5xl sm:text-5xl md:text-6xl font-extrabold text-[#1e293b] mb-6 tracking-tight">
            Connect with your university community
          </h1>
          <p className="text-xl sm:text-lg text-[#64748b] mb-8 max-w-2xl mx-auto">
            Join thousands of students across Kazakhstan. Share knowledge, make friends, and build your academic network.
          </p>
          <div className="flex gap-4 justify-center sm:flex-row flex-col sm:items-center">
            <button onClick={() => navigate('/create-post')} className="px-8 py-3 rounded-lg bg-[#2563EB] text-white text-lg font-semibold hover:bg-[#1d4ed8]">Create Post</button>
            <button onClick={() => navigate('/chats')} className="px-8 py-3 rounded-lg border border-[#2563EB] text-[#2563EB] text-lg font-semibold hover:bg-[#2563EB] hover:text-white">Open Chats</button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e2e8f0]">
              <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"></path></svg>
              </div>
              <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Connect &amp; Chat</h3>
              <p className="text-[#64748b]">Real-time messaging with fellow students from your university</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e2e8f0]">
              <div className="w-12 h-12 bg-[#dcfce7] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              </div>
              <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Share Knowledge</h3>
              <p className="text-[#64748b]">Post study materials, ask questions, and help each other succeed</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e2e8f0]">
              <div className="w-12 h-12 bg-[#fef3c7] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg>
              </div>
              <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Build Network</h3>
              <p className="text-[#64748b]">Connect with students from universities across Kazakhstan</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
