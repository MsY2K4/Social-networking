import { Button, Container, Flex, Image } from "@chakra-ui/react"; // Importing necessary components from Chakra UI library
import { Link } from "react-router-dom"; // Importing Link component from React Router

// Define Navbar component
const Navbar = () => {
    return (
        <Container maxW={"container.lg"} my={4}>
            <Flex w={"full"} justifyContent={{ base: "center", sm: "space-between" }} alignItems={"center"}>
                {/* Application logo */}
                <Image src='/logo.png' h={20} display={{ base: "none", sm: "block" }} cursor={"pointer"} />
                {/* Navigation links */}
                <Flex gap={4}>
                    {/* Login button */}
                    <Link to='/auth'>
                        <Button colorScheme={"blue"} size={"sm"}>
                            Login
                        </Button>
                    </Link>
                    {/* Signup button */}
                    <Link to='/auth'>
                        <Button variant={"outline"} size={"sm"}>
                            Signup
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Container>
    );
};

export default Navbar; // Export Navbar component
