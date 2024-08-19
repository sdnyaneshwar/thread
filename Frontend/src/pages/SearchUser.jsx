import { Box, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SuggestedUser from '../components/SuggestedUser';
import useShowToast from '../hooks/useShowToast';

const SearchUser = () => {
    const [loading, setLoading] = useState(false);
    const [searchUsers, setSearchUsers] = useState([]);
    const showToast = useShowToast();

    // Call useParams directly at the top level of the component
    const { user } = useParams();

    useEffect(() => {
        const getSuggestedUsers = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/users/search/${user}`);
                const data = await res.json();
                console.log(data);

                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setSearchUsers(data);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            getSuggestedUsers();
        }
    }, [user, showToast]); // Add user to dependency array

    return (
		<>
			
			<Flex direction={"column"} gap={4}>
				{!loading && searchUsers.map((user) => <SuggestedUser key={user._id} user={user} />)}
				{loading &&
					[0, 1, 2, 3, 4].map((_, idx) => (
						<Flex key={idx} gap={2} alignItems={"center"} p={"1"} borderRadius={"md"}>
							{/* avatar skeleton */}
							<Box>
								<SkeletonCircle size={"10"} />
							</Box>
							{/* username and fullname skeleton */}
							<Flex w={"full"} flexDirection={"column"} gap={2}>
								<Skeleton h={"8px"} w={"80px"} />
								<Skeleton h={"8px"} w={"90px"} />
							</Flex>
							{/* follow button skeleton */}
							<Flex>
								<Skeleton h={"20px"} w={"60px"} />
							</Flex>
						</Flex>
					))}
			</Flex>
		</>
	);
};

export default SearchUser;
