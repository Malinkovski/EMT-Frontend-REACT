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

import hostsRepository from "../repository/hostsRepository.jsx";
import accommodationsRepository from "../repository/accommodationsRepository.jsx";

export default function HostsPage() {
    const [hosts, setHosts] = useState([]);
    const [accommodations, setAccommodations] = useState([]);
    const [selectedHost, setSelectedHost] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const hostsRes = await hostsRepository.findAll();
                setHosts(hostsRes.data);

                const accommodationsRes =
                    await accommodationsRepository.findAll();

                setAccommodations(accommodationsRes.data);

            } catch (err) {
                console.error(err);
            }
        };

        fetch();
    }, []);

    const handleHostClick = (host) => {
        setSelectedHost(host);
    };

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h4" gutterBottom>
                Browse Hosts
            </Typography>

            {/* HOSTS */}
            <Grid container spacing={3}>
                {hosts.map((host) => (
                    <Grid item xs={12} sm={6} md={4} key={host.id}>
                        <Card>
                            <CardActionArea
                                onClick={() => handleHostClick(host)}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={`https://i.pravatar.cc/300?u=${host.id + 72}`}
                                    alt={host.name}
                                />

                                <CardContent>
                                    <Typography variant="h6">
                                        {host.name} {host.surname}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {host.country?.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {selectedHost && (
                <>
                    <Typography
                        variant="h5"
                        sx={{ mt: 6, mb: 3 }}
                    >
                        Accommodations by {selectedHost.name}
                    </Typography>

                    <Grid container spacing={3}>
                        {accommodations
                            .filter(
                                (acc) =>
                                    acc.host.id === selectedHost.id
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