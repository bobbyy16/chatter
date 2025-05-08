"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col items-center justify-center w-full px-4 py-16">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageCircle className="h-10 w-10 text-indigo-500" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Chatter
              </h1>
            </div>
            <p className="text-xl text-gray-600">Join the conversation today</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/login")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => router.push("/register")}
              className="bg-white hover:bg-gray-100 text-indigo-600 font-medium py-3 px-8 rounded-lg border border-indigo-200 shadow-sm transition-colors"
            >
              Register
            </button>
          </div>

          <div className="pt-8">
            <p className="text-gray-500">
              Connect with friends, share your thoughts, and stay updated with
              what's happening around the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
