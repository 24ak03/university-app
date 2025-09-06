import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e6eef8] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#2563EB] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">UC</span>
          </div>
          <div>
            <p className="text-sm text-[#64748b]">UniConnect · Connecting students across Kazakhstan</p>
            <p className="text-xs text-[#9aa4b2]">© {new Date().getFullYear()} UniConnect</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a className="text-sm text-[#2563EB] hover:underline" href="#">Privacy</a>
          <a className="text-sm text-[#2563EB] hover:underline" href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
}
