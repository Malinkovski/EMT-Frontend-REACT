import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    MenuItem,
    Typography,
    Box
} from "@mui/material";
import accommodationsRepository from "../repository/accommodationsRepository";
import hostsRepository from "../repository/hostsRepository";

export default function AccommodationCreate() {
    const navigate = useNavigate();
    const [hosts, setHosts] = useState([]);

    useEffect(() => {
        const fetchHosts = async () => {
            const res = await hostsRepository.findAll();
            setHosts(res.data);
        };

        fetchHosts();
    }, []);

    const [form, setForm] = useState({
        name: "",
        category: "ROOM",
        host_id: "",
        numRooms: 1,
        is_available: true
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await accommodationsRepository.create(form);
        navigate("/accommodations");
    };

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h4" gutterBottom>
                Create Accommodation
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                <TextField
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <TextField
                    label="Category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    select
                >
                    <MenuItem value="ROOM">Room</MenuItem>
                    <MenuItem value="HOUSE">House</MenuItem>
                    <MenuItem value="FLAT">Flat</MenuItem>
                    <MenuItem value="APARTMENT">Apartment</MenuItem>
                    <MenuItem value="HOTEL">Hotel</MenuItem>
                    <MenuItem value="MOTEL">Motel</MenuItem>
                </TextField>

                <TextField
                    select
                    label="Host"
                    name="host_id"
                    value={form.host_id}
                    onChange={handleChange}
                    required
                >
                    {hosts.map((host) => (
                        <MenuItem key={host.id} value={host.id}>
                            {host.name} {host.surname}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Number of Rooms"
                    name="numRooms"
                    type="number"
                    value={form.numRooms}
                    onChange={handleChange}
                />

                <Button type="submit" variant="contained">
                    Create
                </Button>
            </Box>
        </Container>
    );
}