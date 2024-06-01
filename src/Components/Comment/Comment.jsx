import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react"; // Importing necessary components from Chakra UI library
import useGetUserProfileById from "../../hooks/useGetUserProfileById"; // Custom hook for fetching user profile by ID
import { Link } from "react-router-dom"; // Importing Link component from React Router
import { timeAgo } from "../../utils/timeAgo"; // Importing timeAgo function from utils

// Define Comment component
const Comment = ({ comment }) => {
    // Fetching user profile data based on the ID of the user who created the comment
    const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);

    // If data is loading, render skeleton component
    if (isLoading) return <CommentSkeleton />;

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
                    {/* Comment text */}
                    <Text fontSize={14}>{comment.comment}</Text>
                </Flex>
                {/* Time since comment creation */}
                <Text fontSize={12} color={"gray"}>
                    {timeAgo(comment.createdAt)}
                </Text>
            </Flex>
        </Flex>
    );
};

export default Comment;

// Skeleton component to display while comment data is loading
const CommentSkeleton = () => {
    return (
        <Flex gap={4} w={"full"} alignItems={"center"}>
            <SkeletonCircle h={10} w='10' />
            <Flex gap={1} flexDir={"column"}>
                <Skeleton height={2} width={100} />
                <Skeleton height={2} width={50} />
            </Flex>
        </Flex>
    );
};
