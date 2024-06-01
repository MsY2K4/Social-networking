import {Avatar,Button,Divider,Flex,GridItem,Image,Modal,ModalBody,ModalCloseButton,ModalContent,ModalOverlay,Text,VStack,useDisclosure,} from "@chakra-ui/react"; // Importing necessary Chakra UI components
import { AiFillHeart } from "react-icons/ai"; // Importing heart icon from react-icons
import { FaComment } from "react-icons/fa"; // Importing comment icon from react-icons
import { MdDelete } from "react-icons/md"; // Importing delete icon from react-icons
import Comment from "../Comment/Comment"; // Importing Comment component
import PostFooter from "../FeedPosts/PostFooter"; // Importing PostFooter component
import useUserProfileStore from "../../store/userProfileStore"; // Importing custom hook for user profile state
import useAuthStore from "../../store/authStore"; // Importing custom hook for authentication state
import useShowToast from "../../hooks/useShowToast"; // Importing custom hook for displaying toast messages
import { useState } from "react"; // Importing useState hook
import { deleteObject, ref } from "firebase/storage"; // Importing functions for deleting objects from Firebase storage
import { firestore, storage } from "../../firebase/firebase"; // Importing Firestore and Firebase storage instances
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore"; // Importing Firestore functions for updating and deleting documents
import usePostStore from "../../store/postStore"; // Importing custom hook for managing posts
import Caption from "../Comment/Caption"; // Importing Caption component

const ProfilePost = ({ post }) => {
    const { isOpen, onOpen, onClose } = useDisclosure(); // Custom hook for managing modal state
    const userProfile = useUserProfileStore((state) => state.userProfile); // Accessing user profile state
    const authUser = useAuthStore((state) => state.user); // Accessing authentication state
    const showToast = useShowToast(); // Custom hook for displaying toast messages
    const [isDeleting, setIsDeleting] = useState(false); // State for tracking deletion status
    const deletePost = usePostStore((state) => state.deletePost); // Function for deleting post
    const decrementPostsCount = useUserProfileStore((state) => state.deletePost); // Function for decrementing post count

    // Function for handling post deletion
    const handleDeletePost = async () => {
        // Prompt user for confirmation
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        // Return if deletion is already in progress
        if (isDeleting) return;

        try {
            // Reference to post image in Firebase storage
            const imageRef = ref(storage, `posts/${post.id}`);
            // Delete post image from storage
            await deleteObject(imageRef);
            // Reference to user document
            const userRef = doc(firestore, "users", authUser.uid);
            // Delete post document from Firestore
            await deleteDoc(doc(firestore, "posts", post.id));
            // Remove post ID from user's posts array
            await updateDoc(userRef, {
                posts: arrayRemove(post.id),
            });
            // Update local post state and user profile post count
            deletePost(post.id);
            decrementPostsCount(post.id);
            // Display success toast message
            showToast("Success", "Post deleted successfully", "success");
        } catch (error) {
            // Display error toast message if deletion fails
            showToast("Error", error.message, "error");
        } finally {
            // Reset deletion status
            setIsDeleting(false);
        }
    };

    return (
        <>
            {/* Grid item representing the post */}
            <GridItem
                cursor={"pointer"}
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                position={"relative"}
                aspectRatio={1 / 1}
                onClick={onOpen}
            >
                {/* Overlay with post interaction buttons */}
                <Flex
                    opacity={0}
                    _hover={{ opacity: 1 }}
                    position={"absolute"}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg={"blackAlpha.700"}
                    transition={"all 0.3s ease"}
                    zIndex={1}
                    justifyContent={"center"}
                >
                    {/* Flex container for interaction buttons */}
                    <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
                        {/* Like button */}
                        <Flex>
                            <AiFillHeart size={20} />
                            <Text fontWeight={"bold"} ml={2}>
                                {post.likes.length}
                            </Text>
                        </Flex>
                        {/* Comment button */}
                        <Flex>
                            <FaComment size={20} />
                            <Text fontWeight={"bold"} ml={2}>
                                {post.comments.length}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
                {/* Post image */}
                <Image src={post.imageURL} alt='profile post' w={"100%"} h={"100%"} objectFit={"cover"} />
            </GridItem>

            {/* Modal for displaying post details */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody bg={"black"} pb={5}>
                        {/* Flex container for post details */}
                        <Flex
                            gap='4'
                            w={{ base: "90%", sm: "70%", md: "full" }}
                            mx={"auto"}
                            maxH={"90vh"}
                            minH={"50vh"}
                        >
                            {/* Flex container for post image */}
                            <Flex
                                borderRadius={4}
                                overflow={"hidden"}
                                border={"1px solid"}
                                borderColor={"whiteAlpha.300"}
                                flex={1.5}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Image src={post.imageURL} alt='profile post' />
                            </Flex>
                            {/* Flex container for post details and comments */}
                            <Flex
                                flex={1}
                                flexDir={"column"}
                                px={10}
                                display={{ base: "none", md: "flex" }}
                            >
                                {/* Flex container for post header */}
                                <Flex alignItems={"center"} justifyContent={"space-between"}>
                                    {/* Avatar and username */}
                                    <Flex alignItems={"center"} gap={4}>
                                        <Avatar src={userProfile.profilePicURL} size={"sm"} name='As a Programmer' />
                                        <Text fontWeight={"bold"} fontSize={12}>
                                            {userProfile.username}
                                        </Text>
                                    </Flex>
                                    {/* Delete button (visible to post owner) */}
                                    {authUser?.uid === userProfile.uid && (
                                        <Button
                                            size={"sm"}
                                            bg={"transparent"}
                                            _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                                            borderRadius={4}
                                            p={1}
                                            onClick={handleDeletePost}
                                            isLoading={isDeleting}
                                        >
                                            <MdDelete size={20} cursor='pointer' />
                                        </Button>
                                    )}
                                </Flex>
                                {/* Divider */}
                                <Divider my={4} bg={"gray.500"} />
                                {/* VStack for displaying caption and comments */}
                                <VStack w='full' alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                                    {/* Caption */}
                                    {post.caption && <Caption post={post} />}
                                    {/* Comments */}
                                    {post.comments.map((comment) => (
                                        <Comment key={comment.id} comment={comment} />
                                    ))}
                                </VStack>
                                {/* Divider */}
                                <Divider my={4} bg={"gray.8000"} />
                                {/* Post footer (includes like, comment, and delete buttons) */}
                                <PostFooter isProfilePage={true} post={post} />
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProfilePost; // Exporting ProfilePost component
