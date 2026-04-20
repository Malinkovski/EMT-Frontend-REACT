import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, CardMedia, Paper } from "@mui/material";
import {accommodationsData} from "../dummydata/accommodations.js";

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
                    image={accommodation.image}
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