import {useNavigate} from "react-router-dom";
import {Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import Button from "@mui/material/Button";

export default function AccommodationCard({ accommodation }) {
    const navigate = useNavigate();

    return (
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardMedia
                component="img"
                height="160"
                image={`https://picsum.photos/id/${accommodation.id + 100}/200/300`}
                alt={accommodation.name}
            />

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{accommodation.name}</Typography>

                <Typography variant="body2">
                    {accommodation.category}
                </Typography>

                <Typography variant="body2" sx={{ my: 1 }}>
                    Rooms: {accommodation.numRooms}
                </Typography>

                <Typography variant="body2">
                    {accommodation.is_available ? "Available" : "Not Available"}
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => navigate(`/accommodations/${accommodation.id}`)}
                >
                    See Details
                </Button>

                <Button size="small" variant="outlined">
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
}