import React, { useState, useRef, useEffect } from "react";

export default function Postform({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !content) return;
    if (onSubmit) onSubmit({ title, content, image });
    setTitle("");
    setContent("");
    setImage(null);
  }

  function handleImage(e) {
    const f = e.target.files?.[0];
    if (f) setImage(URL.createObjectURL(f));
  }

  return (
    <div className="w-full max-w-lg bg-white rounded-xl shadow-xl border border-[#e2e8f0] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#1e293b]">Create Post</h3>
        <button onClick={onCancel} className="text-[#64748b]">✕</button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          ref={titleRef}
          placeholder="Title"
          className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="What's on your mind?"
          className="w-full min-h-[120px] px-3 py-2 border border-[#d1d5db] rounded-lg"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">Image</label>
          <input type="file" accept="image/*" onChange={handleImage} />
          {image && <img src={image} alt="Preview" className="mt-3 rounded-md" />}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-[#d1d5db]">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-[#2563EB] text-white">Post</button>
        </div>
      </form>
    </div>
  );
}
