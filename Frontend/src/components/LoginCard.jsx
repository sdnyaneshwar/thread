import React, { useState } from 'react'
import { useSetRecoilState } from "recoil"
import authScreenAtom from "../atoms/authAtom"
import userAtom from '../atoms/userAtoms'
import useShowToast from '../hooks/useShowToast'
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Link, Stack, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
const LoginCard = () => {
    const [showPassword, setShowPassword] = useState(false)
    const setAuthScreen = useSetRecoilState(authScreenAtom)
    const setUser = useSetRecoilState(userAtom)
    const [loading, setLoading] = useState(false)

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    const showToast = useShowToast()

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs)

            })

            const data = await res.json();
            if (data.error) {
                showToast("error", data.error, "error")
                return
            }
            console.log(data);

            localStorage.setItem("user-threads", JSON.stringify(data))
            setUser(data)

        } catch (error) {
            showToast("Error", error, "error")

        } finally {
            setLoading(false)
        }
    }



    return (
        <Flex align={"center"} justify={'center'} bg={''}>
            <Stack spacing={8} mx={'auto'} maxW={"lg"} py={12} px={6} bg={''}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Login
                    </Heading>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.dark")}
                    boxShadow={"lg"}
                    p={8}
                    w={{
                        base: "full",
                        sm: "400px"
                    }}
                >
                    <Stack spacing={4}>

                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type='text' value={inputs.username} onChange={(e)=>setInputs({...inputs,username:e.target.value})}/>

                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <InputGroup>
                                <Input type={showPassword? "text":"password"}
                                    value={inputs.password} 
                                    onChange={(e)=>setInputs({...inputs,password:e.target.value})}

                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                    variant={"ghost"}
                                        onClick={()=>setShowPassword((prev)=>!prev)}
                                    >
                                        {showPassword? <ViewIcon/> : <ViewOffIcon/>}

                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack>
                            <Button loadingText="Logged in"
                                size={"lg"}
                                bg={useColorModeValue("gray.600", "gray.700")}
                                color={"white"}
                                _hover={
                                    {
                                        bg:useColorModeValue("gray.700", "gray.800")
                                    }
                                }
                                onClick={handleLogin}
                                isLoading={loading}

                            >
                                Login

                            </Button>

                        </Stack>
                        <Stack pt={6}>
							<Text align={"center"}>
								Don&apos;t have an account?{" "}
								<Link color={"blue.400"} onClick={() => setAuthScreen("signup")}>
									Sign up
								</Link>
							</Text>
						</Stack>
                    </Stack>

                </Box>
            </Stack>
        </Flex>
    )
}

export default LoginCard