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
import accommodationsRepository from "../../repository/accommodationsRepository";

export default function AccommodationsCarousel() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            const res = await accommodationsRepository.findAll();
            setItems(res.data.slice(0, 5));
        };
        fetch();
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                overflowX: "auto",
                gap: 2,
                pb: 2,
                scrollSnapType: "x mandatory",
                "&::-webkit-scrollbar": { display: "none" }
            }}
        >
            {items.map((item) => (
                <Card
                    key={item.id}
                    sx={{
                        minWidth: 360,
                        flex: "0 0 auto",
                        scrollSnapAlign: "start",
                        borderRadius: 2
                    }}
                >
                    <CardMedia
                        component="img"
                        height="160"
                        image={`https://picsum.photos/id/${item.id + 100}/300/200`}
                    />

                    <CardContent>
                        <Typography variant="h6">
                            {item.name}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {item.category} • {item.numRooms} rooms
                        </Typography>

                        <Button
                            size="small"
                            sx={{ mt: 1 }}
                            onClick={() => navigate(`/accommodations/${item.id}`)}
                        >
                            View Details
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}