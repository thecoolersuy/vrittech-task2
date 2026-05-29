"use client";

import { useState } from "react";
import { useDashboardStore } from "@/lib/store";
import { createPostSchema, CreatePostFormData } from "@/lib/validations";

interface PostFormProps {
  userId: number;
  onPostAdded?: () => void;
}

export function PostForm({ userId, onPostAdded }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const addLocalPost = useDashboardStore((state) => state.addLocalPost);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    const result = createPostSchema.safeParse({ title, body });

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path) {
          newErrors[path.toString()] = issue.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    addLocalPost({
      title,
      body,
      userId,
    });

    setTitle("");
    setBody("");
    setSuccess(true);

    setTimeout(() => setSuccess(false), 3000);

    if (onPostAdded) {
      onPostAdded();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-lg p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Post</h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Post added successfully!
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter post title"
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Body
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          placeholder="Enter post body"
        />
        {errors.body && (
          <p className="text-red-600 text-sm mt-1">{errors.body}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        Create Post
      </button>
    </form>
  );
}
