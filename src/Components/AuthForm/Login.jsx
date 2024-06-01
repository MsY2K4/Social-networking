import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react"; // Importing necessary components from Chakra UI library
import { useState } from "react"; // Importing useState hook from React
import useLogin from "../../hooks/useLogin"; // Custom hook for handling user login

// Define Login component
const Login = () => {
    // State to manage email and password inputs
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    // Destructuring values from useLogin hook, which handles the login functionality
    const { loading, error, login } = useLogin();

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
            {/* Input field for password */}
            <Input
                placeholder='Password'
                focusBorderColor='lime'
                fontSize={14}
                size={"sm"}
                type='password'
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
            {/* Display error message if there's an error */}
            {error && (
                <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                    <AlertIcon fontSize={12} />
                    {error.message}
                </Alert>
            )}
            {/* Login button */}
            <Button
                w={"full"}
                colorScheme='green'
                size={"sm"}
                fontSize={14}
                isLoading={loading}
                onClick={() => login(inputs)} // Call login function with input values
            >
                Log in
            </Button>
        </>
    );
};

export default Login; // Export Login component
