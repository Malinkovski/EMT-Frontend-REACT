import { useEffect, useState } from "react";

import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    CardMedia
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import countriesRepository from "../repository/countriesRepository.jsx";
import accommodationsRepository from "../repository/accommodationsRepository.jsx";

export default function CountriesPage() {
    const [countries, setCountries] = useState([]);
    const [accommodations, setAccommodations] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const countriesRes =
                    await countriesRepository.findAll();

                setCountries(countriesRes.data);

                const accommodationsRes =
                    await accommodationsRepository.findAll();

                setAccommodations(accommodationsRes.data);

            } catch (err) {
                console.error(err);
            }
        };

        fetch();
    }, []);

    const handleCountryClick = (country) => {
        setSelectedCountry(country);
    };

    const countryCodes = {
    Italy: "IT",
    Japan: "JP",
    "United States": "US"
};

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h4" gutterBottom>
                Browse Countries
            </Typography>


            <Grid container spacing={3}>
                {countries.map((country) => (
                    <Grid item xs={12} sm={6} md={4} sx={{
                        textAlign: "center",
                        width: "160px",
                        height: "160px",
                        display: "flex",
                        flexDirection: "column"
                    }} key={country.id}>
                        <Card>
                            <CardActionArea
                                onClick={() =>
                                    handleCountryClick(country)
                                }
                            >
                                <CardMedia
                                    component="img"
                                    height="80"
                                    image={`https://flagsapi.com/${countryCodes[country.name]}/flat/64.png`}
                                    alt={country.name}
                                />

                                <CardContent>
                                    <Typography variant="h6">
                                        {country.name}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {country.continent}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* ACCOMMODATIONS */}
            {selectedCountry && (
                <>
                    <Typography
                        variant="h5"
                        sx={{ mt: 6, mb: 3 }}
                    >
                        Accommodations in {selectedCountry.name}
                    </Typography>

                    <Grid container spacing={3}>
                        {accommodations
                            .filter(
                                (acc) =>
                                    acc.host.country.id ===
                                    selectedCountry.id
                            )
                            .map((acc) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={acc.id}
                                >
                                    <Card>
                                        <CardActionArea
                                            onClick={() =>
                                                navigate(
                                                    `/accommodations/${acc.id}`
                                                )
                                            }
                                        >
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={`https://picsum.photos/id/${acc.id + 10}/400/250`}
                                                alt={acc.name}
                                            />

                                            <CardContent>
                                                <Typography variant="h6">
                                                    {acc.name}
                                                </Typography>

                                                <Typography variant="body2">
                                                    Category: {acc.category}
                                                </Typography>

                                                <Typography variant="body2">
                                                    Rooms: {acc.numRooms}
                                                </Typography>

                                                <Typography variant="body2">
                                                    Host: {acc.host.name}{" "}
                                                    {acc.host.surname}
                                                </Typography>

                                                <Typography variant="body2">
                                                    {acc.is_available
                                                        ? "Available"
                                                        : "Not Available"}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </>
            )}
        </Container>
    );
}