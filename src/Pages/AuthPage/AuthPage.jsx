// Importing necessary components from Chakra UI and your custom AuthForm component
import { Container, Flex, VStack, Box, Image } from "@chakra-ui/react";
import AuthForm from "../../Components/AuthForm/AuthForm";

// Defining the AuthPage component
const AuthPage = () => {
  return (
    // Flex container for centering content vertically and horizontally
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      {/* Container for limiting the maximum width of content */}
      <Container maxW={"container.md"} padding={0}>
        {/* Flex container for arranging content horizontally */}
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          {/* Left side (displayed only on medium screens and above) */}
          <Box display={{ base: "none", md: "block" }}>
            {/* Image component displaying an image for authentication (probably a phone mockup) */}
            {/*<Image src='/auth.png' h={650} alt='Phone img' />*/}
          </Box>

          {/* Right side */}
          <VStack spacing={4} align={"stretch"}>
            {/* Rendering the AuthForm component */}
            <AuthForm />
            
            {/* Box component displaying a message */}
            <Box textAlign={"center"}>Mobile APP very soon !!</Box>
            
            {/* Flex container for displaying content centered with a gap */}
            <Flex gap={5} justifyContent={"center"}>
              {/* Image component displaying a Playstore logo */}
              <Image src='/playstore.png' h={"10"} alt='Playstore logo' />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

// Exporting the AuthPage component
export default AuthPage;
