import { create } from "zustand";
import { User, Post, CreatePostInput } from "./types";
import { fetchUsers, fetchPostsByUserId } from "./api";

interface DashboardStore {
  users: User[];
  apiIsLoading: boolean;
  error: string | null;
  fetchAllUsers: () => Promise<void>;

  posts: Post[];
  postsLoading: boolean;
  postsError: string | null;
  fetchUserPosts: (userId: number) => Promise<void>;
  addLocalPost: (post: CreatePostInput) => void;

  reset: () => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  users: [],
  apiIsLoading: false,
  error: null,

  fetchAllUsers: async () => {
    set({ apiIsLoading: true, error: null });
    try {
      const users = await fetchUsers();
      set({ users, apiIsLoading: false });
    } catch (err) {
      set({ error: "Failed to load users", apiIsLoading: false });
    }
  },

  posts: [],
  postsLoading: false,
  postsError: null,

  fetchUserPosts: async (userId: number) => {
    set({ postsLoading: true, postsError: null });
    try {
      const posts = await fetchPostsByUserId(userId);
      set({ posts, postsLoading: false });
    } catch (err) {
      set({ postsError: "Failed to load posts", postsLoading: false });
    }
  },

  addLocalPost: (newPost: CreatePostInput) => {
    set((state) => ({
      posts: [
        {
          id: Math.max(...state.posts.map((p) => p.id), 0) + 1,
          userId: newPost.userId,
          title: newPost.title,
          body: newPost.body,
        },
        ...state.posts,
      ],
    }));
  },

  reset: () => {
    set({
      users: [],
      posts: [],
      apiIsLoading: false,
      postsLoading: false,
      error: null,
      postsError: null,
    });
  },
}));
