import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccommodationsCarousel from "../../src/assets/components/AccommodationsCarousel.jsx"

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    textAlign: "center",
                    mt: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3
                }}
            >
                <Typography variant="h3" fontWeight="bold">
                    Welcome to StayFinder
                </Typography>

                <Typography variant="h6" color="text.secondary">
                    Discover and book the best accommodations.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/accommodations")}
                >
                    Browse Accommodations
                </Button>
                <AccommodationsCarousel />
            </Box>
        </Container>
    );
}