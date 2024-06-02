// Importing necessary components from Chakra UI, React Router, and your custom components
import { Container, Flex, Link, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import ProfileHeader from "../../Components/Profile/ProfileHeader";
import ProfileTabs from "../../Components/Profile/ProfileTabs";
import ProfilePosts from "../../Components/Profile/ProfilePosts";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

// Defining the ProfilePage component
const ProfilePage = () => {
  // Extracting the 'username' from the URL parameters
  const { username } = useParams();
  
  // Custom hook to fetch user profile data by username
  const { isLoading, userProfile } = useGetUserProfileByUsername(username);

  // Checking if the user profile is not found
  const userNotFound = !isLoading && !userProfile;
  
  // Rendering user not found message if applicable
  if (userNotFound) return <UserNotFound />;

  return (
    // Container component limiting the maximum width of content
    <Container maxW='container.lg' py={5}>
      {/* Flex container for arranging content vertically */}
      <Flex py={10} px={4} pl={{ base: 4, md: 10 }} w={"full"} mx={"auto"} flexDirection={"column"}>
        {/* Rendering ProfileHeader component if not loading and user profile exists */}
        {!isLoading && userProfile && <ProfileHeader />}
        {/* Rendering ProfileHeaderSkeleton component if loading */}
        {isLoading && <ProfileHeaderSkeleton />}
      </Flex>
      
      {/* Flex container for arranging content vertically */}
      <Flex px={{ base: 2, sm: 4 }} maxW={"full"} mx={"auto"} borderTop={"1px solid"} borderColor={"green.300"} direction={"column"}>
        {/* Rendering ProfileTabs and ProfilePosts components */}
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  );
};

// Exporting the ProfilePage component
export default ProfilePage;

// Skeleton component for profile header
const ProfileHeaderSkeleton = () => {
  return (
    <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }} justifyContent={"center"} alignItems={"center"}>
      {/* SkeletonCircle component for avatar */}
      <SkeletonCircle size='24' />
      
      {/* VStack component for text content */}
      <VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
        {/* Skeleton components for displaying loading effect */}
        <Skeleton height='12px' width='150px' />
        <Skeleton height='12px' width='100px' />
      </VStack>
    </Flex>
  );
};

// Component for displaying user not found message
const UserNotFound = () => {
  return (
    <Flex flexDir='column' textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2xl"}>User Not Found</Text>
      {/* Link component for navigating back to the home page */}
      <Link as={RouterLink} to={"/"} color={"green.500"} w={"max-content"} mx={"auto"}>
        Go home
      </Link>
    </Flex>
  );
};
