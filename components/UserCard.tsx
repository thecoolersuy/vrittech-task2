"use client";

import { User } from "@/lib/types";
import Link from "next/link";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <p className="text-gray-700">
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Company:</span> {user.company.name}
        </p>
      </div>

      <Link
        href={`/users/${user.id}`}
        className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-center transition-colors"
      >
        View Posts
      </Link>
    </div>
  );
}
