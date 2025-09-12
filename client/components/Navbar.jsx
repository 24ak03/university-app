import React from "react";
import { useAuth } from "../lib/AuthContext";
import { useNavigate } from "react-router-dom";

function Logo() {
  return (
    <div className="flex items-center gap-0 select-none">
      <div className="w-8 h-8 bg-[#7ca4fb] rounded-lg flex items-center justify-center shadow-sm">
        <span className="text-white font-extrabold text-sm leading-none">Uni</span>
      </div>
      <span className="text-xl font-extrabold tracking-tight text-[#1e293b]">versity</span>
    </div>
  );
}

export default function Navbar({ onOpenChat }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm border-b border-[#e2e8f0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Logo />
            {user && (
              <div className="hidden md:flex items-center gap-3 ml-6">
                <button onClick={() => navigate('/')} className="text-[#64748b] hover:text-[#2563EB] transition-colors">Home</button>
                <button onClick={() => navigate('/create-post')} className="text-[#64748b] hover:text-[#2563EB] transition-colors">Create Post</button>
                <button onClick={() => navigate('/chats')} className="text-[#64748b] hover:text-[#2563EB] transition-colors">Chats</button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={onOpenChat} className="p-2 text-[#64748b] hover:text-[#2563EB] transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.681L3 21l2.681-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-[#ef4444] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
            </button>

            {user ? (
              <>
                <button onClick={() => navigate('/profile')} className="flex items-center gap-2 p-2 hover:bg-[#f1f5f9] rounded-lg transition-colors">
                  <img src={user.avatar || 'https://placehold.co/32x32/2563EB/ffffff?text=AZ'} alt="Profile" className="w-8 h-8 rounded-full" />
                  <span className="text-[#1e293b] font-medium hidden sm:inline">{user.name}</span>
                </button>
                <button onClick={() => { logout(); navigate('/'); }} className="text-[#64748b] hover:text-[#ef4444] transition-colors hidden sm:inline-flex" title="Sign out">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="px-4 py-2 text-[#2563EB] border border-[#2563EB] rounded-lg hover:bg-[#2563EB] hover:text-white transition-colors">Sign In</button>
                <button onClick={() => navigate('/register')} className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors">Sign Up</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
