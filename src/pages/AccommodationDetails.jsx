import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../axios/axios.js";
import { Container, Typography, Button, CardMedia, Paper } from "@mui/material";

export default function AccommodationsDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [accommodation, setAccommodation] = useState(null);
    const [loading, setLoading] = useState(true);

    //ADD TO REPOSITORY
    useEffect(() => {
        const fetchAccommodation = async () => {
            try {
                const res = await axiosInstance.get(`/accommodations/${id}`);
                setAccommodation(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAccommodation();
    }, [id]);

    if (loading) {
        return (
            <Container sx={{ py: 5 }}>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    if (!accommodation) {
        return (
            <Container sx={{ py: 5 }}>
                <Typography variant="h5">Accommodation not found.</Typography>
                <Button sx={{ mt: 2 }} onClick={() => navigate("/")}>
                    Back
                </Button>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 5 }} maxWidth="sm">
            <Paper sx={{ p: 3 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={`https://picsum.photos/id/${accommodation.id + 100}/200/300`}
                    alt={accommodation.name}
                />

                <Typography variant="h4" sx={{ mt: 2 }}>
                    {accommodation.name}
                </Typography>

                <Typography variant="body1" sx={{ my: 1 }}>
                    Category: {accommodation.category}
                </Typography>

                <Typography variant="body1">
                    Rooms: {accommodation.numRooms}
                </Typography>

                <Typography variant="body1">
                    {accommodation.is_available ? "Available" : "Not Available"}
                </Typography>

                <Typography variant="body1" sx={{ mt: 2 }}>
                    Host: {accommodation.host.name} {accommodation.host.surname}
                </Typography>

                <Button variant="outlined" sx={{ mt: 3 }} onClick={() => navigate("/")}>
                    Back
                </Button>
            </Paper>
        </Container>
    );
}