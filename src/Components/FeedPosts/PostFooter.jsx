import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from "@chakra-ui/react"; // Importing necessary components from Chakra UI library
import { useRef, useState } from "react"; // Importing useRef and useState hooks from React
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants"; // Importing icons/constants
import usePostComment from "../../hooks/usePostComment"; // Custom hook for posting comments
import useAuthStore from "../../store/authStore"; // Custom hook for accessing auth user data
import useLikePost from "../../hooks/useLikePost"; // Custom hook for liking posts
import { timeAgo } from "../../utils/timeAgo"; // Utility function for calculating time ago
import CommentsModal from "../Modals/CommentsModal"; // Importing CommentsModal component

// Define PostFooter component
const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
    // State and hooks initialization
    const { isCommenting, handlePostComment } = usePostComment(); // Hook for posting comments
    const [comment, setComment] = useState(""); // State for comment input
    const authUser = useAuthStore((state) => state.user); // Auth user data
    const commentRef = useRef(null); // Reference to comment input element
    const { handleLikePost, isLiked, likes } = useLikePost(post); // Hook for liking posts
    const { isOpen, onOpen, onClose } = useDisclosure(); // Hook for managing modal state

    // Function to handle submitting comment
    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment);
        setComment(""); // Clear comment input after posting
    };

    return (
        <Box mb={10} marginTop={"auto"}>
            {/* Icons for like and comment */}
            <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
                <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
                    {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>
                <Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
                    <CommentLogo />
                </Box>
            </Flex>
            {/* Display likes count */}
            <Text fontWeight={600} fontSize={"sm"}>
                {likes} likes
            </Text>

            {/* Display post creation time if on profile page */}
            {isProfilePage && (
                <Text fontSize='12' color={"gray"}>
                    Posted {timeAgo(post.createdAt)}
                </Text>
            )}

            {/* If not on profile page, display post caption and comments */}
            {!isProfilePage && (
                <>
                    <Text fontSize='sm' fontWeight={700}>
                        {creatorProfile?.username}{" "}
                        <Text as='span' fontWeight={400}>
                            {post.caption}
                        </Text>
                    </Text>
                    {/* Display link to view all comments */}
                    {post.comments.length > 0 && (
                        <Text fontSize='sm' color={"gray"} cursor={"pointer"} onClick={onOpen}>
                            View all {post.comments.length} comments
                        </Text>
                    )}
                    {/* Render CommentsModal component if modal is open */}
                    {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}
                </>
            )}

            {/* Input field for adding a comment */}
            {authUser && (
                <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
                    <InputGroup>
                        <Input
                            variant={"flushed"}
                            focusBorderColor='lime'
                            placeholder={"Add a comment..."}
                            fontSize={14}
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            ref={commentRef}
                        />
                        <InputRightElement>
                            {/* Button to submit comment */}
                            <Button
                                fontSize={14}
                                color={"green.500"}
                                fontWeight={600}
                                cursor={"pointer"}
                                _hover={{ color: "white" }}
                                bg={"transparent"}
                                onClick={handleSubmitComment}
                                isLoading={isCommenting}
                            >
                                Post
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Flex>
            )}
        </Box>
    );
};

export default PostFooter; // Export PostFooter component
