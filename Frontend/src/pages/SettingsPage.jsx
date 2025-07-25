import { Button, Center, Stack, Switch, Text, useColorMode } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";


export const SettingsPage = () => {
	const showToast = useShowToast();
	const logout = useLogout();
	const { colorMode, toggleColorMode } = useColorMode();

	const freezeAccount = async () => {
		if (!window.confirm("Are you sure you want to freeze your account?")) return;

		try {
			const res = await fetch("/api/users/freeze", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();

			if (data.error) {
				return showToast("Error", data.error, "error");
			}
			if (data.success) {
				await logout();
				showToast("Success", "Your account has been frozen", "success");
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<>
			<Text my={1} fontWeight={"bold"}>
				Freeze Your Account
			</Text>
			<Text my={1}>You can unfreeze your account anytime by logging in.</Text>
			<Button size={"sm"} colorScheme='red' onClick={freezeAccount}>
				Freeze
			</Button>
			<Stack direction='row' my={8} align={"center"}>
				<IoSunnyOutline />
				<Switch
					colorScheme='teal'
					size='lg'
					isChecked={colorMode === "dark"}
					onChange={toggleColorMode}
				/>
				<MdOutlineDarkMode />
				<Text>{colorMode}</Text>
			</Stack>
		</>
	);
};
