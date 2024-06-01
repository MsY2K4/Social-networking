// Importing the 'create' function from the 'zustand' library
import { create } from "zustand";

// Creating a custom store called 'useUserProfileStore' using Zustand
const useUserProfileStore = create((set) => ({
  // Initializing the 'userProfile' state as null
  userProfile: null,
  
  // Function to set the 'userProfile' state with a new user profile object
  setUserProfile: (userProfile) => set({ userProfile }),
  
  // Function to add a post ID to the 'posts' array in the user's profile
  addPost: (post) =>
    set((state) => ({
      // Updating the 'userProfile' state by adding the new post ID to the 'posts' array
      userProfile: { ...state.userProfile, posts: [post.id, ...state.userProfile.posts] },
    })),
    
  // Function to delete a post ID from the 'posts' array in the user's profile
  deletePost: (postId) =>
    set((state) => ({
      // Updating the 'userProfile' state by removing the specified post ID from the 'posts' array
      userProfile: {
        ...state.userProfile,
        posts: state.userProfile.posts.filter((id) => id !== postId),
      },
    })),
}));

// Exporting the 'useUserProfileStore' for use in other parts of the application
export default useUserProfileStore;
