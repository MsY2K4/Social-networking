import { Box, Image } from "@chakra-ui/react"; // Importing necessary components from Chakra UI library
import PostFooter from "./PostFooter"; // Importing PostFooter component
import PostHeader from "./PostHeader"; // Importing PostHeader component
import useGetUserProfileById from "../../hooks/useGetUserProfileById"; // Custom hook for fetching user profile by ID

// Define FeedPost component
const FeedPost = ({ post }) => {
    // Fetching user profile data based on the ID of the post creator
    const { userProfile } = useGetUserProfileById(post.createdBy);

    return (
        <>
            {/* Render post header */}
            <PostHeader post={post} creatorProfile={userProfile} />
            {/* Box to contain the post image */}
            <Box my={2} borderRadius={4} overflow={"hidden"}>
                <Image src={post.imageURL} alt={"FEED POST IMG"} />
            </Box>
            {/* Render post footer */}
            <PostFooter post={post} creatorProfile={userProfile} />
        </>
    );
};

export default FeedPost; // Export FeedPost component
