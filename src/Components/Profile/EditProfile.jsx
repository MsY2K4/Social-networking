import {Avatar,Button,Center,Flex,FormControl,FormLabel,Heading,Input,Modal,ModalBody,ModalCloseButton,ModalContent,ModalHeader,ModalOverlay,Stack} from "@chakra-ui/react"; // Importing necessary components from Chakra UI library
import { useRef, useState } from "react"; // Importing useRef and useState hooks
import useAuthStore from "../../store/authStore"; // Importing custom hook to access user authentication state
import usePreviewImg from "../../hooks/usePreviewImg"; // Importing custom hook for handling image preview
import useEditProfile from "../../hooks/useEditProfile"; // Importing custom hook for handling profile editing
import useShowToast from "../../hooks/useShowToast"; // Importing custom hook for displaying toast messages

const EditProfile = ({ isOpen, onClose }) => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        bio: "",
    }); // State for form inputs
    const authUser = useAuthStore((state) => state.user); // Accessing user authentication state
    const fileRef = useRef(null); // Ref for file input element
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg(); // Custom hook for handling image preview
    const { isUpdating, editProfile } = useEditProfile(); // Custom hook for handling profile editing
    const showToast = useShowToast(); // Custom hook for displaying toast messages

    const handleEditProfile = async () => {
        try {
            await editProfile(inputs, selectedFile); // Calling the editProfile function to update the profile
            setSelectedFile(null); // Clearing the selected file
            onClose(); // Closing the modal
        } catch (error) {
            showToast("Error", error.message, "error"); // Displaying an error toast message if an error occurs
        }
    };

    return (
        <>
            {/* Modal component for editing profile */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={"black"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
                    <ModalHeader />
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Container Flex */}
                        <Flex bg={"black"}>
                            {/* Stack for arranging form elements */}
                            <Stack spacing={4} w={"full"} maxW={"md"} bg={"black"} p={6} my={0}>
                                {/* Heading */}
                                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                                    Edit Profile
                                </Heading>
                                {/* Form for editing profile */}
                                <FormControl>
                                    {/* Stack for arranging avatar, edit button, and file input */}
                                    <Stack direction={["column", "row"]} spacing={6}>
                                        <Center>
                                            {/* Avatar */}
                                            <Avatar
                                                size='xl'
                                                src={selectedFile || authUser.profilePicURL}
                                                border={"2px solid white "}
                                            />
                                        </Center>
                                        <Center w='full'>
                                            {/* Button to trigger file input */}
                                            <Button w='full' onClick={() => fileRef.current.click()}>
                                                Edit Profile Picture
                                            </Button>
                                        </Center>
                                        {/* File input for selecting profile picture */}
                                        <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
                                    </Stack>
                                </FormControl>
                                {/* Input field for full name */}
                                <FormControl>
                                    <FormLabel fontSize={"sm"}>Full Name</FormLabel>
                                    <Input
                                        placeholder={"Full Name"}
                                        size={"sm"}
                                        type={"text"}
                                        value={inputs.fullName || authUser.fullName}
                                        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                                    />
                                </FormControl>
                                {/* Input field for username */}
                                <FormControl>
                                    <FormLabel fontSize={"sm"}>Username</FormLabel>
                                    <Input
                                        placeholder={"Username"}
                                        size={"sm"}
                                        type={"text"}
                                        value={inputs.username || authUser.username}
                                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                                    />
                                </FormControl>
                                {/* Input field for bio */}
                                <FormControl>
                                    <FormLabel fontSize={"sm"}>Bio</FormLabel>
                                    <Input
                                        placeholder={"Bio"}
                                        size={"sm"}
                                        type={"text"}
                                        value={inputs.bio || authUser.bio}
                                        onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                                    />
                                </FormControl>
                                {/* Stack for arranging cancel and submit buttons */}
                                <Stack spacing={6} direction={["column", "row"]}>
                                    {/* Button to cancel editing */}
                                    <Button
                                        bg={"red.400"}
                                        color={"white"}
                                        w='full'
                                        size='sm'
                                        _hover={{ bg: "red.500" }}
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </Button>
                                    {/* Button to submit editing */}
                                    <Button
                                        bg={"green.400"}
                                        color={"white"}
                                        size='sm'
                                        w='full'
                                        _hover={{ bg: "green.700" }}
                                        onClick={handleEditProfile}
                                        isLoading={isUpdating}
                                    >
                                        Submit
                                    </Button>
                                </Stack>
                            </Stack>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditProfile; // Exporting EditProfile component
