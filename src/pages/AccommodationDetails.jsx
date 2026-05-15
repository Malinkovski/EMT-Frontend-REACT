import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    Container,
    Typography,
    Button,
    CardMedia,
    Paper,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from "@mui/material";

import accommodationsRepository from "../repository/accommodationsRepository";
import reservationsRepository from "../repository/reservationsRepository";

export default function AccommodationsDetails() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [accommodation, setAccommodation] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [open, setOpen] =
        useState(false);

    const [errorOpen, setErrorOpen] =
        useState(false);

    const [successOpen, setSuccessOpen] =
        useState(false);

    const [nights, setNights] =
        useState(1);

    useEffect(() => {
        const fetchAccommodation =
            async () => {
                try {
                    const res =
                        await accommodationsRepository.findById(
                            id
                        );

                    setAccommodation(
                        res.data
                    );
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

        fetchAccommodation();
    }, [id]);

    const handleDelete = async () => {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this accommodation?"
            );

        if (!confirmed) return;

        try {
            await accommodationsRepository.deleteById(
                id
            );

            navigate(
                "/accommodations"
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = () => {
        navigate(
            `/accommodations/edit/${id}`
        );
    };

    const handleAddToReservations =
        async () => {
            try {
                const reservationList =
                    await reservationsRepository.getActive(
                        1
                    );

                const alreadyExists =
                    reservationList.data.items.some(
                        (item) =>
                            item
                                .accommodation
                                .id ===
                            accommodation.id
                    );

                if (alreadyExists) {
                    setOpen(false);

                    setErrorOpen(
                        true
                    );

                    return;
                }

                await reservationsRepository.addItem(
                    1,
                    {
                        accommodation_id:
                            accommodation.id,
                        num_nights:
                            nights
                    }
                );

                setOpen(false);

                setNights(1);

                setSuccessOpen(
                    true
                );
                window.dispatchEvent(
                    new Event("reservationUpdated")
                );
            } catch (err) {
                console.error(err);
            }
        };

    if (loading) {
        return (
            <Container sx={{ py: 5 }}>
                <Typography>
                    Loading...
                </Typography>
            </Container>
        );
    }

    if (!accommodation) {
        return (
            <Container sx={{ py: 5 }}>
                <Typography variant="h5">
                    Accommodation not
                    found.
                </Typography>

                <Button
                    sx={{ mt: 2 }}
                    onClick={() =>
                        navigate(
                            "/accommodations"
                        )
                    }
                >
                    Back
                </Button>
            </Container>
        );
    }

    return (
        <>
            <Container
                sx={{ py: 5 }}
                maxWidth="sm"
            >
                <Paper sx={{ p: 3 }}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={`https://picsum.photos/id/${accommodation.id +
                            10
                            }/600/400`}
                        alt={
                            accommodation.name
                        }
                        sx={{
                            borderRadius: 2
                        }}
                    />

                    <Typography
                        variant="h4"
                        sx={{ mt: 2 }}
                    >
                        {
                            accommodation.name
                        }
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{ mt: 2 }}
                    >
                        <strong>
                            Category:
                        </strong>{" "}
                        {
                            accommodation.category
                        }
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{ mt: 1 }}
                    >
                        <strong>
                            Rooms:
                        </strong>{" "}
                        {
                            accommodation.numRooms
                        }
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{ mt: 1 }}
                    >
                        <strong>
                            Status:
                        </strong>{" "}
                        {accommodation.is_available
                            ? "Available"
                            : "Not Available"}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{ mt: 2 }}
                    >
                        <strong>
                            Host:
                        </strong>{" "}
                        {
                            accommodation
                                .host
                                .name
                        }{" "}
                        {
                            accommodation
                                .host
                                .surname
                        }
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{ mt: 1 }}
                    >
                        <strong>
                            Country:
                        </strong>{" "}
                        {
                            accommodation
                                .host
                                .country
                                .name
                        }
                    </Typography>

                    <Box
                        sx={{
                            mt: 4,
                            display:
                                "flex",
                            gap: 2,
                            flexWrap:
                                "wrap"
                        }}
                    >
                        <Button
                            variant="contained"
                            color="success"
                            disabled={!accommodation.is_available}
                            onClick={() => setOpen(true)}
                        >
                            {accommodation.is_available
                                ? "Add To Cart"
                                : "Unavailable"}
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={
                                handleEdit
                            }
                        >
                            Edit
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            onClick={
                                handleDelete
                            }
                        >
                            Delete
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() =>
                                navigate(
                                    "/accommodations"
                                )
                            }
                        >
                            Back
                        </Button>
                    </Box>
                </Paper>
            </Container>

            <Dialog
                open={open}
                onClose={() =>
                    setOpen(false)
                }
            >
                <DialogTitle>
                    Add Reservation
                </DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Number of Nights"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={nights}
                        onChange={(e) =>
                            setNights(
                                Number(
                                    e
                                        .target
                                        .value
                                )
                            )
                        }
                        inputProps={{
                            min: 1
                        }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() =>
                            setOpen(
                                false
                            )
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={
                            handleAddToReservations
                        }
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={errorOpen}
                onClose={() =>
                    setErrorOpen(
                        false
                    )
                }
            >
                <DialogTitle>
                    Already Added
                </DialogTitle>

                <DialogContent>
                    This accommodation
                    is already in your
                    reservations.
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() =>
                            setErrorOpen(
                                false
                            )
                        }
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={successOpen}
                onClose={() =>
                    setSuccessOpen(
                        false
                    )
                }
            >
                <DialogTitle>
                    Success
                </DialogTitle>

                <DialogContent>
                    Accommodation added
                    to reservations
                    successfully.
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() =>
                            setSuccessOpen(
                                false
                            )
                        }
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}