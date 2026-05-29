"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDashboardStore } from "@/lib/store";
import { fetchUserById } from "@/lib/api";
import { PostCard } from "@/components/PostCard";
import { PostForm } from "@/components/PostForm";
import { User } from "@/lib/types";

export default function UserPostsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = parseInt(params.id as string);

  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const { posts, postsLoading, postsError, fetchUserPosts, addLocalPost } =
    useDashboardStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadData = async () => {
      setUserLoading(true);
      setUserError(null);

      try {
        const userData = await fetchUserById(userId);
        setUser(userData);
      } catch (err) {
        setUserError("Failed to load user details");
      } finally {
        setUserLoading(false);
      }
    };

    loadData();
    fetchUserPosts(userId);
  }, [userId, fetchUserPosts, mounted]);

  if (!mounted) {
    return null;
  }

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading user...</p>
      </div>
    );
  }

  if (userError || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => router.push("/")}
            className="mb-6 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Users
          </button>
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {userError || "User not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => router.push("/")}
          className="mb-6 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Users
        </button>

        <div className="bg-white rounded-lg p-6 mb-8 border">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="font-medium">Email:</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="font-medium">Phone:</p>
              <p>{user.phone}</p>
            </div>
            <div>
              <p className="font-medium">Company:</p>
              <p>{user.company.name}</p>
            </div>
            <div>
              <p className="font-medium">Website:</p>
              <p>{user.website}</p>
            </div>
          </div>
        </div>

        <PostForm userId={userId} />

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Posts ({posts.length})
          </h2>

          {postsError && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              Something went wrong
            </div>
          )}

          {postsLoading ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border">
              <p className="text-gray-600">No posts yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
