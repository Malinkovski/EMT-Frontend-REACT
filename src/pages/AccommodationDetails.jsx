import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, CardMedia, Paper } from "@mui/material";

const accommodationsData = [
    { id: 1, name: "Hotel Skopje", price: 120, description: "Great hotel in the center." },
    { id: 2, name: "Mountain Lodge", price: 80, description: "Fresh air and nature." },
    { id: 3, name: "City Apartment", price: 95, description: "Modern apartment." },
    { id: 4, name: "Beach Resort", price: 150, description: "Sunny beach view." },
];

export default function AccommodationsDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const accommodation = accommodationsData.find((p) => p.id === Number(id));

    if (!accommodation) {
        return (
            <Container sx={{ py: 5 }}>
                <Typography variant="h5">Accommodation not found.</Typography>
                <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate("/")}>
                    Back to accommodations
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
                    image={"https://picsum.photos/200/300"}
                    alt={accommodation.name}
                />
                <Typography variant="h4" sx={{ mt: 2 }}>{accommodation.name}</Typography>
                <Typography variant="h5" sx={{ my: 1 }}>${accommodation.price}</Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>{accommodation.description}</Typography>
                <Button variant="contained" sx={{ mr: 1 }}>Add to Cart</Button>
                <Button variant="outlined" onClick={() => navigate("/")}>Back</Button>
            </Paper>
        </Container>
    );
}