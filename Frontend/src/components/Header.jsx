import { Button, Flex, Image, Link, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtoms'
import useLogout from "../hooks/useLogout"
import authScreenAtom from '../atoms/authAtom'
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";


const Header = () => {

    // const [colorMode , toggleColorMode ] = useColorMode()
    const user = useRecoilValue(userAtom)
    const logout = useLogout(); 
    const setAuthScreen = useSetRecoilState(authScreenAtom)



    
  return (

    <Flex justifyContent={"space-between" } mt={6} mb={12}>
        {
            user && (
                <Link as={RouterLink} to={'/'}>
                    <AiFillHome size={24} />
                </Link>
            )
        }
        {
            !user && (
                <Link as={RouterLink} to={"/auth"} onClick={()=>setAuthScreen("login")}>
                    Login
                </Link>
            )
        }
        <Image
            cursor={"pointer"}
            alt='logo'
            w={6}
            src='\public\dark-logo.svg'
            // src={colorMode === "dark"? "/light-logo-.svg" : "/dark-logo.svg" }
            // onClick={toggleColorMode}
        />
        {
            user && (
                <Flex alignItems={"center"} gap={4}>
                    <Link as={RouterLink} to={`/${user.username}`}>
                        <RxAvatar size={24}/>
                    </Link>

                    <Link as={RouterLink} to={"/chat"}>
                        <BsFillChatQuoteFill size={20} />
                    </Link>

                    <Link as={RouterLink} to={'/setting'}>
                        <MdOutlineSettings size={20} />
                    </Link>

                    <Button size={'xs'} onClick={logout}>
                        <FiLogOut size={20} />
                    </Button>

                </Flex>
            )
        }

        {
            !user && (
                <Link as={RouterLink} to={'/auth'} onClick={()=>setAuthScreen('signu[')}>
                    Sign Up
                </Link>
            )
        }

    </Flex>
    
  )
}

export default Header
