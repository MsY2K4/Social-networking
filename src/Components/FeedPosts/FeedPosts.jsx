import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react"; // Importing necessary components from Chakra UI library
import FeedPost from "./FeedPost"; // Importing FeedPost component
import useGetFeedPosts from "../../hooks/useGetFeedPosts"; // Custom hook for fetching feed posts

// Define FeedPosts component
const FeedPosts = () => {
    // Fetching feed posts and loading status using custom hook
    const { isLoading, posts } = useGetFeedPosts();

    return (
        <Container maxW={"container.sm"} py={10} px={2}>
            {/* If loading, render skeleton placeholders */}
            {isLoading &&
                [0, 1, 2].map((_, idx) => (
                    <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
                        <Flex gap='2'>
                            <SkeletonCircle size='10' />
                            <VStack gap={2} alignItems={"flex-start"}>
                                <Skeleton height='10px' w={"200px"} />
                                <Skeleton height='10px' w={"200px"} />
                            </VStack>
                        </Flex>
                        <Skeleton w={"full"}>
                            <Box h={"400px"}>contents wrapped</Box>
                        </Skeleton>
                    </VStack>
                ))}

            {/* If not loading and there are posts, render each post */}
            {!isLoading && posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post} />)}

            {/* If not loading and there are no posts, display message */}
            {!isLoading && posts.length === 0 && (
                <>
                    <Text fontSize={"md"} color={"red.400"}>
                        No Posts Available.
                    </Text>
                    <Text color={"red.400"}>Add some friends!!</Text>
                </>
            )}
        </Container>
    );
};

export default FeedPosts; // Export FeedPosts component
