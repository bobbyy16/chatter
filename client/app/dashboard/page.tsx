"use client";
import { useEffect, useState } from "react";
import TweetCard from "@/components/TweetCard";
import TweetForm from "@/components/TweetForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, MessageCircle } from "lucide-react";

interface User {
  username: string;
  _id: string;
}

export default function DashboardPage() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchCurrentUser();
      fetchTweets();
    }
  }, []);

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { "x-auth-token": token },
      });
      setCurrentUser(res.data);
    } catch (err) {
      console.error("Error fetching current user:", err);
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  const fetchTweets = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/tweet");
      setTweets(res.data);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    await axios.post(
      `http://localhost:5000/api/tweet/like/${id}`,
      {},
      { headers: { "x-auth-token": token } }
    );
    fetchTweets();
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/tweet/${id}`, {
        headers: { "x-auth-token": token },
      });
      fetchTweets();
    } catch (err: any) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Delete failed. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Fixed header with subtle border */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-blue-600">Chatter</h1>
            </div>
            {currentUser && (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    {currentUser.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700 font-medium">
                    @{currentUser.username}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Post Form */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-md mb-6 p-4">
          <TweetForm onPost={fetchTweets} />
        </div>

        {/* Posts Section */}
        <section>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
            </div>
          ) : tweets.length === 0 ? (
            <div className="text-center py-12 rounded-xl bg-white border border-gray-200 shadow-md">
              <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                <MessageCircle className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">
                No posts yet
              </h3>
              <p className="text-gray-600 mt-2">
                Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {tweets.map((tweet: any) => (
                <div
                  key={tweet._id}
                  className="bg-white border border-gray-200 rounded-xl shadow-md hover:border-gray-300 transition-colors"
                >
                  <TweetCard
                    tweet={tweet}
                    onLike={handleLike}
                    onDelete={handleDelete}
                    currentUser={currentUser}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Chatter. All rights reserved.</p>
      </footer>
    </div>
  );
}
