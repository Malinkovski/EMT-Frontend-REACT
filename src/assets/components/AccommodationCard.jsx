import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from "@mui/material";

import Button from "@mui/material/Button";

import reservationsRepository from "../../repository/reservationsRepository";

export default function AccommodationCard({
    accommodation
}) {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [errorOpen, setErrorOpen] =
        useState(false);

    const [successOpen, setSuccessOpen] =
        useState(false);

    const [nights, setNights] = useState(1);

    const handleAddToCart = async () => {
        try {
            const reservationList =
                await reservationsRepository.getActive(
                    1
                );

            const alreadyExists =
                reservationList.data.items.some(
                    (item) =>
                        item.accommodation.id ===
                        accommodation.id
                );

            if (alreadyExists) {
                setOpen(false);

                setErrorOpen(true);

                return;
            }

            await reservationsRepository.addItem(
                1,
                {
                    accommodation_id:
                        accommodation.id,
                    num_nights: nights
                }
            );

            setOpen(false);

            setNights(1);

            setSuccessOpen(true);
            window.dispatchEvent(
                new Event("reservationUpdated")
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Card
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <CardMedia
                    component="img"
                    height="160"
                    image={`https://picsum.photos/id/${accommodation.id + 10
                        }/200/300`}
                    alt={accommodation.name}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">
                        {accommodation.name}
                    </Typography>

                    <Typography variant="body2">
                        {accommodation.category}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ my: 1 }}
                    >
                        Rooms:{" "}
                        {accommodation.numRooms}
                    </Typography>

                    <Typography variant="body2">
                        {accommodation.is_available
                            ? "Available"
                            : "Not Available"}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() =>
                            navigate(
                                `/accommodations/${accommodation.id}`
                            )
                        }
                    >
                        See Details
                    </Button>

                    <Button
                        size="small"
                        variant="outlined"
                        disabled={!accommodation.is_available}
                        onClick={() => setOpen(true)}
                    >
                        {accommodation.is_available
                            ? "Add to Cart"
                            : "Unavailable"}
                    </Button>
                </CardActions>
            </Card>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
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
                                Number(e.target.value)
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
                            setOpen(false)
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleAddToCart}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={errorOpen}
                onClose={() =>
                    setErrorOpen(false)
                }
            >
                <DialogTitle>
                    Already Added
                </DialogTitle>

                <DialogContent>
                    This accommodation is
                    already in your
                    reservations.
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() =>
                            setErrorOpen(false)
                        }
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={successOpen}
                onClose={() =>
                    setSuccessOpen(false)
                }
            >
                <DialogTitle>
                    Success
                </DialogTitle>

                <DialogContent>
                    Accommodation added to
                    reservations successfully.
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() =>
                            setSuccessOpen(false)
                        }
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}