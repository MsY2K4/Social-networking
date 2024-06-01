import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react"; // Importing necessary components from Chakra UI library
import { useState } from "react"; // Importing useState hook from React
import Login from "./Login"; // Importing Login component
import Signup from "./Signup"; // Importing Signup component
import GoogleAuth from "./GoogleAuth"; // Importing GoogleAuth component

// Define AuthForm component
const AuthForm = () => {
    // State variable to toggle between login and signup forms
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            {/* Main container for the authentication form */}
            <Box border={"1px solid gray"} borderRadius={4} padding={5}>
                {/* Vertical stack layout for elements inside the form */}
                <VStack spacing={4}>
                    {/* Logo */}
                    <Image src='/logo.png' h={24} cursor={"pointer"} alt='PhosNet' />

                    {/* Render either login or signup form based on isLogin state */}
                    {isLogin ? <Login /> : <Signup />}

                    {/* Horizontal divider with 'OR' text */}
                    <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                        <Box flex={2} h={"1px"} bg={"green.400"} />
                        <Text mx={1} color={"white"}>
                            OR
                        </Text>
                        <Box flex={2} h={"1px"} bg={"green.400"} />
                    </Flex>

                    {/* Google authentication component */}
                    <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
                </VStack>
            </Box>

            {/* Container for 'Sign up' or 'Log in' toggle */}
            <Box border={"1px solid gray"} borderRadius={4} padding={5}>
                <Flex alignItems={"center"} justifyContent={"center"}>
                    {/* Text indicating whether to sign up or log in */}
                    <Box mx={2} fontSize={14}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                    </Box>
                    {/* Toggle between sign up and log in */}
                    <Box onClick={() => setIsLogin(!isLogin)} color={"green.500"} cursor={"pointer"}>
                        {isLogin ? "Sign up" : "Log in"}
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default AuthForm; // Export AuthForm component
