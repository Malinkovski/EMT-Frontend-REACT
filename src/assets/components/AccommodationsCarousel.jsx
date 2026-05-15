import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import {
    Navigation,
    Pagination,
    Autoplay
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import accommodationsRepository
    from "../../repository/accommodationsRepository";

export default function AccommodationsCarousel() {
    const [items, setItems] =
        useState([]);

    const navigate =
        useNavigate();

    useEffect(() => {
        const fetch =
            async () => {
                try {
                    const res =
                        await accommodationsRepository.findAll();

                    setItems(
                        res.data.slice(
                            0,
                            9
                        )
                    );
                } catch (err) {
                    console.error(
                        err
                    );
                }
            };

        fetch();
    }, []);

    return (
        <Box
            sx={{
                py: 6,
                display: "flex",
                justifyContent:
                    "center"
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth:
                        "1200px",
                    px: 2
                }}
            >
                <Swiper
                    modules={[
                        Navigation,
                        Pagination,
                        Autoplay
                    ]}
                    navigation
                    pagination={{
                        clickable: true
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    loop={
                        items.length > 5
                    }
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        540: {
                            slidesPerView: 1
                        },
                        840: {
                            slidesPerView: 2
                        },
                        1024: {
                            slidesPerView: 3
                        }
                    }}
                >
                    {items.map(
                        (item) => (
                            <SwiperSlide
                                key={
                                    item.id
                                }
                            >
                                <Card
                                    sx={{
                                        borderRadius: 3,
                                        overflow:
                                            "hidden",
                                        height:
                                            "100%",
                                        boxShadow: 3
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="220"
                                        image={`https://picsum.photos/id/${
                                            item.id +
                                            10
                                        }/600/400`}
                                        alt={
                                            item.name
                                        }
                                    />

                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                        >
                                            {
                                                item.name
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {
                                                item.category
                                            }{" "}
                                            •{" "}
                                            {
                                                item.numRooms
                                            }{" "}
                                            rooms
                                        </Typography>

                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                mt: 2
                                            }}
                                            onClick={() =>
                                                navigate(
                                                    `/accommodations/${item.id}`
                                                )
                                            }
                                        >
                                            View
                                            Details
                                        </Button>
                                    </CardContent>
                                </Card>
                            </SwiperSlide>
                        )
                    )}
                </Swiper>
            </Box>
        </Box>
    );
}