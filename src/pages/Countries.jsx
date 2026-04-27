import { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActionArea
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import countriesRepository from "../repository/countriesRepository";

export default function CountriesPage() {
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await countriesRepository.findAll();
                setCountries(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetch();
    }, []);

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h4" gutterBottom>
                Browse by Country
            </Typography>

            <Grid container spacing={3}>
                {countries.map((country) => (
                    <Grid item xs={12} sm={6} md={4} key={country.id}>
                        <Card>
                            <CardActionArea
                                onClick={() => navigate(`/countries/${country.id}`)}
                            >
                                <CardContent>
                                    <Typography variant="h6">
                                        {country.name}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {country.continent}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}