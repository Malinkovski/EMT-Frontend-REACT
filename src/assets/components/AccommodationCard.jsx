import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import accommodationImg from "../images/hero.png";

export default function AccommodationCard({ accommodation }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="160"
        image={accommodationImg}
        alt={accommodation.name}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{accommodation.name}</Typography>
        <Typography variant="body1" sx={{ my: 1 }}>
          ${accommodation.price}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={() => navigate(`/products/${accommodation.id}`)}
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