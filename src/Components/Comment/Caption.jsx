import { Avatar, Flex, Text } from "@chakra-ui/react"; // Importing necessary components from Chakra UI library
import { Link } from "react-router-dom"; // Importing Link component from React Router
import { timeAgo } from "../../utils/timeAgo"; // Importing timeAgo function from utils
import useUserProfileStore from "../../store/userProfileStore"; // Custom hook for accessing user profile data

// Define Caption component
const Caption = ({ post }) => {
    // Accessing user profile data using custom hook
    const userProfile = useUserProfileStore((state) => state.userProfile);

    return (
        <Flex gap={4}>
            {/* Avatar with link to user profile */}
            <Link to={`/${userProfile.username}`}>
                <Avatar src={userProfile.profilePicURL} size={"sm"} />
            </Link>
            <Flex direction={"column"}>
                <Flex gap={2} alignItems={"center"}>
                    {/* Username with link to user profile */}
                    <Link to={`/${userProfile.username}`}>
                        <Text fontWeight={"bold"} fontSize={12}>
                            {userProfile.username}
                        </Text>
                    </Link>
                    {/* Post caption */}
                    <Text fontSize={14}>{post.caption}</Text>
                </Flex>
                {/* Time since post creation */}
                <Text fontSize={12} color={"gray"}>
                    {timeAgo(post.createdAt)}
                </Text>
            </Flex>
        </Flex>
    );
};

export default Caption; // Export Caption component
