import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Aigerim Zhaksylyk',
    email: 'aigerim.zhaksylyk@nu.edu.kz',
    university: 'Nazarbayev University',
    avatar: 'https://placehold.co/100x100/2563EB/ffffff?text=AZ',
    joinDate: 'September 2023'
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar onSignIn={() => {}} onSignUp={() => {}} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-6 mb-6">
          <div className="flex items-start gap-6 max-sm:flex-col max-sm:items-center max-sm:text-center">
            <img src={profile.avatar} alt="Profile" className="w-24 h-24 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 max-sm:justify-center">
                <h1 className="text-2xl font-bold text-[#1e293b]">{profile.name}</h1>
                <button onClick={() => setEditing(v => !v)} className="text-[#2563EB] hover:text-[#1d4ed8]">Edit</button>
              </div>
              <p className="text-[#64748b] mb-1">{profile.email}</p>
              <p className="text-[#64748b] mb-1">{profile.university}</p>
              <p className="text-sm text-[#64748b]">Member since {profile.joinDate}</p>
            </div>
          </div>
        </div>

        {editing && (
          <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-6 mb-6">
            <h2 className="text-xl font-bold text-[#1e293b] mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Full Name</label>
                <input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Email</label>
                <input value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">University</label>
                <input value={profile.university} onChange={(e) => setProfile({...profile, university: e.target.value})} className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg" />
              </div>

              <div className="flex justify-end gap-3">
                <button onClick={() => setEditing(false)} className="px-4 py-2 rounded-lg border border-[#d1d5db]">Close</button>
                <button onClick={() => setEditing(false)} className="px-4 py-2 rounded-lg bg-[#2563EB] text-white">Save</button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
