// Importing the 'create' function from the 'zustand' library
import { create } from "zustand";

// Creating a custom store called 'usePostStore' using Zustand
const usePostStore = create((set) => ({
  // Initializing the 'posts' state as an empty array
  posts: [],
  
  // Function to create a new post and add it to the 'posts' array
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  
  // Function to delete a post from the 'posts' array based on its id
  deletePost: (id) => set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  
  // Function to set the 'posts' array with a new set of posts
  setPosts: (posts) => set({ posts }),
  
  // Function to add a comment to a specific post based on its postId
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          // If the post matches the provided postId, add the comment to its 'comments' array
          return {
            ...post,
            comments: [...post.comments, comment],
          };
        }
        return post;
      }),
    })),
}));

// Exporting the 'usePostStore' for use in other parts of the application
export default usePostStore;
