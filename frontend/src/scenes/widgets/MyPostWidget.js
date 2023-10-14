import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../../state";
import WidgetWrapper from "../../components/WidgetWrapper";

const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState([]);
    const [bodyPost, setBodyPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", bodyPost);
        if (image) {
            image.forEach((img) => {
                formData.append("images", img);
                formData.append("picturePath", img.name);
            });
        }

        const response = await fetch(`http://localhost:3500/posts`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const posts = await response.json();
        console.log("postSuccsess", posts);
        dispatch(setPosts({ posts }));
        setImage([]);
        setBodyPost("");
        setIsImage(false);
    };

    const handleRemoveImg = (index) => {
        setImage([...image.slice(0, index), ...image.slice(index + 1)]);
    };

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="What`s on your mind..."
                    onChange={(e) => setBodyPost(e.target.value)}
                    value={bodyPost}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    {Boolean(image.length) && (
                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(auto-fill, minmax(120px, 1fr))"
                            justifyContent="space-between"
                            gap="0.5rem"
                            mb="1rem"
                        >
                            {image.map((image, index) => (
                                <Box
                                    width="100%"
                                    height="160px"
                                    bgcolor="rgba(0, 0, 0, 0.2)"
                                    borderRadius="0.3rem"
                                    overflow="hidden"
                                    position="relative"
                                >
                                    <Button
                                        color="error"
                                        sx={{
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                            opacity: 0,
                                            zIndex: "5",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                opacity: 1,
                                                backgroundColor:
                                                    "rgba(255, 0, 0, 0.5)",
                                                color: "white",
                                            },
                                        }}
                                        onClick={() => handleRemoveImg(index)}
                                    >
                                        <DeleteOutlined />
                                    </Button>
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(image)}
                                        alt={`Preview ${index}`}
                                        style={{
                                            objectFit: "cover",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    )}
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={true}
                        onDrop={(acceptedFiles) =>
                            setImage((prev) => [...prev, ...acceptedFiles])
                        }
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween gap="1rem">
                                <Box
                                    {...getRootProps()}
                                    border={`2px solid ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{
                                        "&:hover": {
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    <p>Add Image Here</p>
                                </Box>
                                {image.length !== 0 && (
                                    <IconButton
                                        onClick={() => setImage([])}
                                        sx={{ p: "0.8rem" }}
                                        title="Delete all images"
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                color: "medium",
                            },
                        }}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                {isNonMobileScreens ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>
                                Attachment
                            </Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>
                ) : (
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexBetween>
                )}

                <Button
                    disabled={!bodyPost}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default MyPostWidget;
