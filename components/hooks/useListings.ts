import { create } from "zustand";

type State = {
  posts: any;
  getPosts: () => Promise<void>;
};

const useStore = create<State>((set) => ({
  posts: [],
  getPosts: async () => {
    const response = await fetch("http://localhost:3000/api/getListings");
    set({ posts: await response.json() });
  },
}));

export default useStore;
