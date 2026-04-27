import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    MenuItem,
    Typography,
    Box
} from "@mui/material";
import accommodationsRepository from "../repository/accommodationsRepository";

export default function AccommodationEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const res = await accommodationsRepository.findById(id);
            setForm(res.data);
        };
        fetch();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await accommodationsRepository.update(id, form);
        navigate("/accommodations");
    };

    if (!form) return <p>Loading...</p>;

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h4" gutterBottom>
                Edit Accommodation
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />

                <TextField
                    label="Rooms"
                    name="numRooms"
                    type="number"
                    value={form.numRooms}
                    onChange={handleChange}
                />

                <Button type="submit" variant="contained">
                    Save
                </Button>
            </Box>
        </Container>
    );
}