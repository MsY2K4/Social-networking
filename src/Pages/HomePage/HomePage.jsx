// Importing necessary components from Chakra UI and your custom components
import { Box, Container, Flex } from "@chakra-ui/react";
import FeedPosts from "../../Components/FeedPosts/FeedPosts";
import SuggestedUsers from "../../Components/SuggestedUsers/SuggestedUsers";

// Defining the HomePage component
const HomePage = () => {
  return (
    // Container component limiting the maximum width of content
    <Container maxW={"container.lg"}>
      {/* Flex container for arranging content horizontally */}
      <Flex gap={20}>
        {/* Left section */}
        <Box flex={2} py={10}>
          {/* Rendering the FeedPosts component */}
          <FeedPosts />
        </Box>
        
        {/* Right section (displayed only on large screens) */}
        <Box flex={3} mr={20} display={{ base: "none", lg: "block" }} maxW={"300px"}>
          {/* Rendering the SuggestedUsers component */}
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
};

// Exporting the HomePage component
export default HomePage;
