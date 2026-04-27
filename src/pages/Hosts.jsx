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
import hostsRepository from "../repository/hostsRepository.jsx";

export default function HostsPage() {
    const [hosts, setHosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await hostsRepository.findAll();
                setHosts(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetch();
    }, []);

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h4" gutterBottom>
                Browse Hosts
            </Typography>

            <Grid container spacing={3}>
                {hosts.map((host) => (
                    <Grid item xs={12} sm={6} md={4} key={host.id}>
                        <Card>
                            <CardActionArea
                                onClick={() => navigate(`/hosts/${host.id}`)}
                            >
                                <CardContent>
                                    <Typography variant="h6">
                                        {host.name} {host.surname}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {host.email}
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