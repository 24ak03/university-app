import React, { useState } from "react";

export default function Loginform({ onSubmit, onNavigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) onSubmit({ email, password });
  }

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-[#e2e8f0] p-8">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">UC</span>
          </div>
          <span className="text-xl font-bold text-[#1e293b]">UniConnect</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#1e293b]">Welcome Back</h2>
        <p className="text-[#64748b] mt-2">Sign in to your account</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">Email</label>
          <input
            className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">Password</label>
          <input
            className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="w-full bg-[#2563EB] text-white py-2 px-4 rounded-lg hover:bg-[#1d4ed8] transition-colors font-medium">
          Sign In
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-[#64748b]">Don't have an account? <button onClick={() => onNavigate && onNavigate('signup')} className="text-[#2563EB] hover:underline">Sign Up</button></p>
      </div>
    </div>
  );
}
