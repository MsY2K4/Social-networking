import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; // Importing icons for showing and hiding password
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"; // Importing necessary components from Chakra UI library
import { useState } from "react"; // Importing useState hook from React
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword"; // Custom hook for handling user signup

// Define Signup component
const Signup = () => {
    // State to manage input fields for full name, username, email, password, and whether to show password
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false); // State to manage whether to show password
    // Destructuring values from useSignUpWithEmailAndPassword hook, which handles the signup functionality
    const { loading, error, signup } = useSignUpWithEmailAndPassword();

    return (
        <>
            {/* Input field for email */}
            <Input
                placeholder='Email'
                focusBorderColor='lime'
                fontSize={14}
                type='email'
                size={"sm"}
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            {/* Input field for username */}
            <Input
                placeholder='Username'
                focusBorderColor='lime'
                fontSize={14}
                type='text'
                size={"sm"}
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
            {/* Input field for full name */}
            <Input
                placeholder='Full Name'
                focusBorderColor='lime'
                fontSize={14}
                type='text'
                size={"sm"}
                value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
            {/* Input field for password with show/hide password functionality */}
            <InputGroup>
                <Input
                    placeholder='Password'
                    focusBorderColor='lime'
                    fontSize={14}
                    type={showPassword ? "text" : "password"}
                    value={inputs.password}
                    size={"sm"}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
                <InputRightElement h='full'>
                    <Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>

            {/* Display error message if there's an error */}
            {error && (
                <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                    <AlertIcon fontSize={12} />
                    {error.message}
                </Alert>
            )}

            {/* Signup button */}
            <Button
                w={"full"}
                colorScheme='green'
                size={"sm"}
                fontSize={14}
                isLoading={loading}
                onClick={() => signup(inputs)} // Call signup function with input values
            >
                Sign Up
            </Button>
        </>
    );
};

export default Signup; // Export Signup component
