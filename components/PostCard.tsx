"use client";

import { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 capitalize">
        {post.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">{post.body}</p>
      <div className="mt-3 text-xs text-gray-500">Post ID: {post.id}</div>
    </div>
  );
}
