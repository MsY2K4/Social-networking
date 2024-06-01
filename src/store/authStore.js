// Importing the 'create' function from the 'zustand' library
import { create } from "zustand";

// Creating a custom store called 'useAuthStore' using Zustand
const useAuthStore = create((set) => ({
  // Initializing the 'user' state with the parsed JSON from local storage
  user: JSON.parse(localStorage.getItem("user-info")),
  
  // Defining a 'login' function to update the 'user' state when a user logs in
  login: (user) => set({ user }),
  
  // Defining a 'logout' function to set the 'user' state to null when a user logs out
  logout: () => set({ user: null }),
  
  // Defining a 'setUser' function to update the 'user' state with a new user object
  setUser: (user) => set({ user }),
}));

// Exporting the 'useAuthStore' for use in other parts of the application
export default useAuthStore;
