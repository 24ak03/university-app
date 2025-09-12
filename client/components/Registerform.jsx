import { useState } from "react";

export default function Registerform({ onSubmit, onNavigate, universities = [] }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) onSubmit({ fullName, email, password, university });
  }

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-[#e2e8f0] p-8">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Uni</span>
          </div>
          <span className="text-xl font-bold text-[#1e293b]">versity</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#1e293b]">Create Account</h2>
        <p className="text-[#64748b] mt-2">Join your university community</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">Full Name</label>
          <input
            className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">University</label>
          <select
            className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            required
          >
            <option value="">Select your university</option>
            {universities.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <button className="w-full bg-[#2563EB] text-white py-2 px-4 rounded-lg hover:bg-[#1d4ed8] transition-colors font-medium">Sign Up</button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-[#64748b]">Already have an account? <button onClick={() => onNavigate && onNavigate('signin')} className="text-[#2563EB] hover:underline">Sign In</button></p>
      </div>
    </div>
  );
}
