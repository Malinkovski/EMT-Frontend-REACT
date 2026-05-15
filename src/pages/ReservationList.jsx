import { useEffect, useState } from "react";

import {
    Container,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Paper,
    Box
} from "@mui/material";

import reservationsRepository
    from "../repository/reservationsRepository";

export default function ReservationList() {
    const [reservationList, setReservationList] =
        useState(null);

    const USER_ID = 1;

    const getPrice = (
        accommodationId
    ) => {
        return (
            50 + accommodationId * 20
        );
    };

    const loadData = async () => {
        try {
            const res =
                await reservationsRepository.getActive(
                    USER_ID
                );

            setReservationList(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchData =
            async () => {
                await loadData();
            };

        fetchData();
    }, []);

    const handleRemove =
        async (itemId) => {
            await reservationsRepository.removeItem(
                reservationList.id,
                itemId
            );

            await loadData();

            window.dispatchEvent(
                new Event(
                    "reservationUpdated"
                )
            );
        };

    const handleReserve =
        async () => {
            await reservationsRepository.confirmReservations(
                reservationList.id
            );

            await loadData();

            window.dispatchEvent(
                new Event(
                    "reservationUpdated"
                )
            );
        };

    if (!reservationList) {
        return (
            <Container sx={{ mt: 10 }}>
                <Typography>
                    Loading...
                </Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 10 }}>
            <Typography
                variant="h4"
                gutterBottom
            >
                Reservation List
            </Typography>

            {reservationList.items
                .length === 0 ? (
                <Typography>
                    No reservations
                    added.
                </Typography>
            ) : (
                <Paper sx={{ p: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Accommodation
                                </TableCell>

                                <TableCell>
                                    Country
                                </TableCell>

                                <TableCell>
                                    Host
                                </TableCell>

                                <TableCell>
                                    Nights
                                </TableCell>

                                <TableCell>
                                    Price
                                </TableCell>

                                <TableCell>
                                    Total
                                </TableCell>

                                <TableCell>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {reservationList.items.map(
                                (
                                    item
                                ) => (
                                    <TableRow
                                        key={
                                            item.id
                                        }
                                    >
                                        <TableCell>
                                            {
                                                item
                                                    .accommodation
                                                    .name
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                item
                                                    .accommodation
                                                    .host
                                                    .country
                                                    .name
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                item
                                                    .accommodation
                                                    .host
                                                    .name
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                item.num_nights
                                            }
                                        </TableCell>

                                        <TableCell>
                                            $
                                            {getPrice(
                                                item
                                                    .accommodation
                                                    .id
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            $
                                            {getPrice(
                                                item
                                                    .accommodation
                                                    .id
                                            ) *
                                                item.num_nights}
                                        </TableCell>

                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() =>
                                                    handleRemove(
                                                        item.id
                                                    )
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>

                    <Box
                        sx={{
                            mt: 3,
                            display:
                                "flex",
                            gap: 2
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={
                                handleReserve
                            }
                        >
                            Reserve
                        </Button>
                    </Box>
                </Paper>
            )}
        </Container>
    );
}