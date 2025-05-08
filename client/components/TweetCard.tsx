"use client";
import { useState } from "react";
import { Heart, Trash2, MessageCircle, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

export default function TweetCard({
  tweet,
  onLike,
  onDelete,
  currentUser,
}: any) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(tweet.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);

  const isLikedByCurrentUser =
    currentUser &&
    tweet.likes?.some((like: any) => like.user === currentUser._id);

  const canDelete = currentUser && tweet.user?._id === currentUser._id;

  const formattedDate = tweet.createdAt
    ? formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })
    : "";

  const handleComment = async () => {
    if (!comment.trim()) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/tweet/comment/${tweet._id}`,
        { text: comment },
        { headers: { "x-auth-token": token } }
      );
      setComments(res.data.comments);
      setComment("");
    } catch (err) {
      console.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-4 sm:p-5 rounded-xl border border-gray-800 hover:bg-gray-800 transition-colors">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
              {tweet.user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-white">{tweet.user?.username}</p>
              <p className="text-xs text-gray-400">{formattedDate}</p>
            </div>
          </div>
          {canDelete && (
            <button
              onClick={() => onDelete(tweet._id)}
              className="text-gray-400 hover:text-red-400 transition-colors p-1 rounded-full hover:bg-gray-700"
              aria-label="Delete tweet"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>

        <p className="text-gray-100 break-words pl-12">{tweet.text}</p>

        <div className="flex items-center gap-6 pt-2 pl-12">
          <button
            onClick={() => onLike(tweet._id)}
            disabled={isLikedByCurrentUser}
            className={`flex items-center gap-1.5 transition-colors ${
              isLikedByCurrentUser
                ? "text-red-400"
                : "text-gray-400 hover:text-red-400"
            }`}
            aria-label="Like"
          >
            <Heart
              size={16}
              fill={isLikedByCurrentUser ? "currentColor" : "none"}
            />
            <span className="text-sm">{tweet.likes?.length || 0}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-gray-400 hover:text-indigo-400 transition-colors"
            aria-label="View comments"
          >
            <MessageCircle size={16} />
            <span className="text-sm">{comments.length}</span>
          </button>
        </div>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-700 pl-12">
          <div className="flex gap-2">
            <input
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={handleComment}
              disabled={!comment.trim() || loading}
              className={`bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${
                !comment.trim() || loading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Post"}
            </button>
          </div>

          {comments.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {comments.map((c: any, idx: number) => (
                <li
                  key={idx}
                  className="text-sm p-3 bg-gray-800 rounded-lg border border-gray-700"
                >
                  <div className="flex gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                      {c.user?.username?.charAt(0).toUpperCase() || "A"}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-xs text-gray-300">
                        {c.user?.username || "Anonymous"}
                      </span>
                      <span className="mt-1 text-white">{c.text}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 mt-3">No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
