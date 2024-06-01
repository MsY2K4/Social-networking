import CreatePost from "./CreatePost";
import Home from "./Home";
import Messages from "./Messages";
import ProfileLink from "./ProfileLink";
import Search from "./Search";

const SidebarItems = () => {
	return (
		<>
			<Home />
			<Search />
			<Messages />
			<CreatePost />
			<ProfileLink />
		</>
	);
};

export default SidebarItems;
