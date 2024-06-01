import { Flex, Image, Text } from "@chakra-ui/react"; // Importing necessary components from Chakra UI library
import { useSignInWithGoogle } from "react-firebase-hooks/auth"; // Importing hook for Google authentication from Firebase
import { auth, firestore } from "../../firebase/firebase"; // Importing Firebase authentication and firestore
import useShowToast from "../../hooks/useShowToast"; // Custom hook for displaying toast messages
import useAuthStore from "../../store/authStore"; // Custom hook for managing authentication state
import { doc, getDoc, setDoc } from "firebase/firestore"; // Importing functions for interacting with Firestore documents

// Define GoogleAuth component
const GoogleAuth = ({ prefix }) => {
    // Destructuring hook for signing in with Google, Firebase auth object, and Firestore object
    const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
    const showToast = useShowToast(); // Custom hook for displaying toast messages
    const loginUser = useAuthStore((state) => state.login); // Custom hook for logging in user

    // Function to handle Google authentication
    const handleGoogleAuth = async () => {
        try {
            // Sign in with Google
            const newUser = await signInWithGoogle();
            if (!newUser && error) {
                showToast("Error", error.message, "error");
                return;
            }

            // Check if user already exists in Firestore
            const userRef = doc(firestore, "users", newUser.user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                // If user exists, login
                const userDoc = userSnap.data();
                localStorage.setItem("user-info", JSON.stringify(userDoc)); // Store user info in local storage
                loginUser(userDoc); // Set user info in authentication state
            } else {
                // If user doesn't exist, sign up
                const userDoc = {
                    uid: newUser.user.uid,
                    email: newUser.user.email,
                    username: newUser.user.email.split("@")[0],
                    fullName: newUser.user.displayName,
                    bio: "",
                    profilePicURL: newUser.user.photoURL,
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                };
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc); // Add user to Firestore
                localStorage.setItem("user-info", JSON.stringify(userDoc)); // Store user info in local storage
                loginUser(userDoc); // Set user info in authentication state
            }
        } catch (error) {
            showToast("Error", error.message, "error"); // Display error message in toast
        }
    };

    // Render Google authentication button
    return (
        <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleGoogleAuth}>
            <Image src='/google.png' w={5} alt='Google logo' />
            <Text mx='2' color={"green.500"}>
                {prefix} with Google
            </Text>
        </Flex>
    );
};

export default GoogleAuth; // Export GoogleAuth component
