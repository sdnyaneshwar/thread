import { Button, Flex, Image, Input, InputGroup, InputRightElement, Link, useColorMode } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { CheckIcon } from "@chakra-ui/icons";
import searchAtom from "../atoms/searchAtom";


const Header = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const user = useRecoilValue(userAtom);
	const logout = useLogout();
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const setSearchShow = useSetRecoilState(searchAtom)
	const searchShow = useRecoilValue(searchAtom)
	const [searchText, setSearchText] = useState("");
	if (user) {
		// console.log(user);
	}
	const navigate =useNavigate();

	const handleSendMessage = ()=>{
		navigate(`/search/${searchText}`);
	}

	return (
		<Flex justifyContent={"space-between"} mt={6} mb='12' >
			{user && (
				<Link as={RouterLink} to='/'>
					{/* // 	<AiFillHome size={24} /> */}
					<Image
						cursor={"pointer"}
						alt='logo'
						w={6}
						src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}

					/>
				</Link>
			)}
			{!user && (
				<Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("login")}>
					Login
				</Link>
			)}
			{/* 
			<Image
				cursor={"pointer"}
				alt='logo'
				w={6}
				src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
				onClick={toggleColorMode}
			/> */}
			{
				user && searchShow && (



					<form onSubmit={handleSendMessage} style={{ flex: 95 }}>
						<InputGroup minW={5} ml={4} >
							<Input placeholder='search people ...' value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
							<InputRightElement >
								<IoSearchSharp onClick={handleSendMessage}/>
							</InputRightElement>
						</InputGroup>
					</form>
				)
			}

			{user && !searchShow && (
				<Flex alignItems={"center"} gap={4}>
					{!searchShow &&
						(<IoSearchSharp onMouseOver={() => setSearchShow(true)} />)
					}
					<Link as={RouterLink} to={`/${user.username}`}>
						<RxAvatar size={24} />
					</Link>
					<Link as={RouterLink} to={`/chat`}>
						<BsFillChatQuoteFill size={20} />
					</Link>
					<Link as={RouterLink} to={`/settings`}>
						<MdOutlineSettings size={20} />
					</Link>
					<Button size={"xs"} onClick={logout}>
						<FiLogOut size={20} />
					</Button>
				</Flex>
			)}

			{!user && (
				<Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("signup")}>
					Sign up
				</Link>
			)}
		</Flex>
	);
};

export default Header;
