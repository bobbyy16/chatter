"use client";
import { useState } from "react";
import axios from "axios";
import { Loader2, Send } from "lucide-react";

export default function TweetForm({ onPost }: { onPost: () => void }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const MAX_CHARS = 280;

  const handleTextChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setText(value);
      setCharacterCount(value.length);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/tweet",
        { text },
        { headers: { "x-auth-token": token } }
      );
      setText("");
      setCharacterCount(0);
      onPost();
    } catch (error) {
      console.error("Error posting tweet:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-4 sm:p-5 rounded-xl border border-gray-800">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
            {/* User's avatar first letter */}?
          </div>
        </div>
        <div className="w-full">
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={handleTextChange}
            className="w-full bg-transparent border-none text-white placeholder-gray-500 resize-none p-0 min-h-24 focus:outline-none text-lg"
          />

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
            <span
              className={`text-xs ${
                characterCount > MAX_CHARS * 0.8
                  ? characterCount >= MAX_CHARS
                    ? "text-red-400"
                    : "text-amber-400"
                  : "text-gray-400"
              }`}
            >
              {characterCount}/{MAX_CHARS}
            </span>

            <button
              onClick={handleSubmit}
              disabled={!text.trim() || loading || characterCount > MAX_CHARS}
              className={`bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium px-5 py-2 rounded-full transition-all flex items-center gap-2 ${
                !text.trim() || loading || characterCount > MAX_CHARS
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:opacity-90"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Post</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
