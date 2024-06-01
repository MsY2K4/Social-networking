import {Button,Flex,Input,Modal,ModalBody,ModalCloseButton,ModalContent,ModalHeader,ModalOverlay} from "@chakra-ui/react"; // Importing necessary components from Chakra UI library
import Comment from "../Comment/Comment"; // Importing Comment component
import usePostComment from "../../hooks/usePostComment"; // Custom hook for posting comments
import { useEffect, useRef } from "react"; // Importing useEffect and useRef hooks from React

// Define CommentsModal component
const CommentsModal = ({ isOpen, onClose, post }) => {
    // Hook for posting comments
    const { handlePostComment, isCommenting } = usePostComment();
    // Refs for comment input and comments container
    const commentRef = useRef(null);
    const commentsContainerRef = useRef(null);

    // Function to handle submitting comment
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        await handlePostComment(post.id, commentRef.current.value);
        commentRef.current.value = ""; // Clear comment input after posting
    };

    // Effect to scroll to bottom when modal is opened or when comments length changes
    useEffect(() => {
        const scrollToBottom = () => {
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        };
        if (isOpen) {
            setTimeout(() => {
                scrollToBottom(); // Scroll to bottom of comments container
            }, 100);
        }
    }, [isOpen, post.comments.length]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
            <ModalOverlay />
            <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
                <ModalHeader>Comments</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {/* Container to display comments */}
                    <Flex mb={4} gap={4} flexDir={"column"} maxH={"250px"} overflowY={"auto"} ref={commentsContainerRef}>
                        {post.comments.map((comment, idx) => (
                            <Comment key={idx} comment={comment} />
                        ))}
                    </Flex>
                    {/* Form to submit new comment */}
                    <form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
                        <Input placeholder='Comment' focusBorderColor='lime' size={"sm"} ref={commentRef} />
                        <Flex w={"full"} justifyContent={"flex-end"}>
                            <Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isCommenting}>
                                Post
                            </Button>
                        </Flex>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CommentsModal; // Export CommentsModal component
