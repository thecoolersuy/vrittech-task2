import { User, Post } from "./types";

const API_BASE = "https://jsonplaceholder.typicode.com";

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function fetchUserById(id: number): Promise<User> {
  try {
    const response = await fetch(`${API_BASE}/users/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function fetchPostsByUserId(userId: number): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE}/posts?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
