import React from "react";

export default function Postcard({ post, onLike, onToggleComments }) {
  if (!post) return null;
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#1e293b]">{post.title}</h3>
            <div className="mt-1 text-sm text-[#64748b]">
              <span className="font-medium text-[#1e293b]">{post.author}</span>
              <span className="mx-2">•</span>
              <span>{post.university}</span>
              <span className="mx-2">•</span>
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[#334155] leading-relaxed">{post.content}</p>
        {post.image && <img src={post.image} alt="Post" className="mt-4 w-full rounded-lg object-cover" />}
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={() => onLike && onLike(post.id)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border transition-colors ${
              post.liked ? "bg-[#2563EB] text-white border-[#2563EB]" : "bg-white text-[#1e293b] border-[#e2e8f0] hover:border-[#2563EB]"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 9l-2-2-2 2m0 6l2 2 2-2" />
            </svg>
            <span>{post.likes} Like{post.likes === 1 ? "" : "s"}</span>
          </button>

          <button
            onClick={() => onToggleComments && onToggleComments(post.id)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border bg-white text-[#1e293b] border-[#e2e8f0] hover:border-[#2563EB]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.681L3 21l2.681-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
            </svg>
            <span>Comments ({post.comments ? post.comments.length : 0})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
