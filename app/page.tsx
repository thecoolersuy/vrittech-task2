"use client";

import { useEffect, useState, useMemo } from "react";
import { useDashboardStore } from "@/lib/store";
import { SearchBar } from "@/components/SearchBar";
import { UserCard } from "@/components/UserCard";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  const { users, apiIsLoading, error, fetchAllUsers } = useDashboardStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchAllUsers();
    }
  }, [mounted, fetchAllUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const query = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    });
  }, [users, searchQuery]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Users & Posts Dashboard
          </h1>
          <p className="text-gray-600">Explore users and their posts</p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            Something went wrong: {error}
          </div>
        )}

        <div className="mb-6">
          <SearchBar
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {apiIsLoading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              {searchQuery
                ? "No users found matching your search"
                : "No users available"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
