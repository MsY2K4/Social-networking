// Importing necessary components from Chakra UI and React Router
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

// Defining the PageLayout component
const PageLayout = ({ children }) => {
  // Extracting the current pathname from the location
  const { pathname } = useLocation();
  
  return (
    // Flex container for arranging content horizontally
    <Flex>
      {/* Left side (sidebar) */}
      {pathname !== "/auth" ? (
        // Rendering Sidebar component if the current path is not '/auth'
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}
      
      {/* Right side (main content area) */}
      <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}>
        {/* Rendering children components */}
        {children}
      </Box>
    </Flex>
  );
};

// Exporting the PageLayout component
export default PageLayout;
