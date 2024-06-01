import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react"; // Importing necessary components from Chakra UI library
import { Link } from "react-router-dom"; // Importing Link component from React Router
import useFollowUser from "../../hooks/useFollowUser"; // Custom hook for following users
import { timeAgo } from "../../utils/timeAgo"; // Utility function for calculating time ago

// Define PostHeader component
const PostHeader = ({ post, creatorProfile }) => {
    // Hook for following users
    const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post.createdBy);

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
            {/* Creator profile picture */}
            <Flex alignItems={"center"} gap={2}>
                {creatorProfile ? (
                    <Link to={`/${creatorProfile.username}`}>
                        <Avatar src={creatorProfile.profilePicURL} alt='user profile pic' size={"sm"} />
                    </Link>
                ) : (
                    <SkeletonCircle size='10' />
                )}

                {/* Creator username and post creation time */}
                <Flex fontSize={12} fontWeight={"bold"} gap='2'>
                    {creatorProfile ? (
                        <Link to={`/${creatorProfile.username}`}>{creatorProfile.username}</Link>
                    ) : (
                        <Skeleton w={"100px"} h={"10px"} />
                    )}
                    <Box color={"gray.500"}>• {timeAgo(post.createdAt)}</Box>
                </Flex>
            </Flex>
            {/* Button to follow/unfollow the user */}
            <Box cursor={"pointer"}>
                <Button
                    size={"xs"}
                    bg={"transparent"}
                    fontSize={12}
                    color={"red.500"}
                    fontWeight={"bold"}
                    _hover={{ color: "white" }}
                    transition={"0.2s ease-in-out"}
                    onClick={handleFollowUser}
                    isLoading={isUpdating}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            </Box>
        </Flex>
    );
};

export default PostHeader; // Export PostHeader component
