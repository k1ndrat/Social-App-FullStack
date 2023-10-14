import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`http://localhost:3500/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        console.log("sssssssdata", data);
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
    } = user;

    return (
        <WidgetWrapper>
            <FlexBetween
                gap="0.5rem"
                pb="1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                transition: "all .3s ease",
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                },
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>
                            {friends.length} friends
                        </Typography>
                    </Box>
                </FlexBetween>

                <ManageAccountsOutlined />
            </FlexBetween>

            <Divider />

            <Box p="1rem 0">
                <Box
                    display="flex"
                    alignItems="center"
                    gap="0.7rem"
                    mb="0.5rem"
                >
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="0.7rem">
                    <WorkOutlineOutlined
                        fontSize="large"
                        sx={{ color: main }}
                    />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>

            <Divider />

            <Box p="1rem 0">
                <FlexBetween gap="0.5rem">
                    <Typography color={medium}>
                        Who`s viewed your profile
                    </Typography>
                    <Typography>{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween gap="0.5rem">
                    <Typography color={medium}>
                        Impressions of your post
                    </Typography>
                    <Typography>{impressions}</Typography>
                </FlexBetween>
            </Box>

            <Divider />

            <Box p="1rem 0">
                <Typography variant="h5" mb="0.5rem">
                    Social Profiles
                </Typography>

                <FlexBetween gap="0.5rem" mb="0.5rem">
                    <Box display="flex" gap="1rem" alignItems="center">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            <Typography>Twitter</Typography>
                            <Typography color={medium}>
                                Social Network
                            </Typography>
                        </Box>
                    </Box>
                    <EditOutlined />
                </FlexBetween>

                <FlexBetween gap="0.5rem">
                    <Box display="flex" gap="1rem" alignItems="center">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            <Typography>Linkedin</Typography>
                            <Typography color={medium}>
                                Network Platform
                            </Typography>
                        </Box>
                    </Box>
                    <EditOutlined />
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    );
};

export default UserWidget;
