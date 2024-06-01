import { Box, Flex, Text } from "@chakra-ui/react";
import { FaImage } from "react-icons/fa6";

const ProfileTabs = () => {
	return (
		<Flex w={"full"}justifyContent={"center"}gap={{ base: 4, sm: 10 }}textTransform={"uppercase"}fontWeight={"bold"}>
			{/* Tab for Posts */}
			<Flex borderTop={"1px solid green"} alignItems={"center"} p='3' gap={1} cursor={"pointer"}>
				<Box fontSize={20}>
					<FaImage />
				</Box>
				<Text fontSize={12} display={{ base: "none", sm: "block" }}>
					Posts
				</Text>
			</Flex>


			</Flex>
	);
};

export default ProfileTabs;
