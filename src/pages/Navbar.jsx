import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
    Badge
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";

import ShoppingCartIcon
    from "@mui/icons-material/ShoppingCart";

import reservationsRepository
    from "../repository/reservationsRepository";

const pages = [
    { name: "Home", path: "/" },
    {
        name: "Accommodations",
        path: "/accommodations"
    },
    { name: "Hosts", path: "/hosts" },
    {
        name: "Countries",
        path: "/countries"
    },
    {
        name: "Add Accommodation",
        path: "/accommodations/create"
    },
];

function Navbar() {
    const [count, setCount] =
        useState(0);

    useEffect(() => {
        const fetchReservations =
            async () => {
                try {
                    const res =
                        await reservationsRepository.getActive(
                            1
                        );

                    setCount(
                        res.data.items.length
                    );
                } catch (err) {
                    console.error(err);
                }
            };

        fetchReservations();

        window.addEventListener(
            "reservationUpdated",
            fetchReservations
        );

        return () => {
            window.removeEventListener(
                "reservationUpdated",
                fetchReservations
            );
        };
    }, []);

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration:
                                "none",
                        }}
                    >
                        StayFinder
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: {
                                xs: "none",
                                md: "flex"
                            }
                        }}
                    >
                        {pages.map(
                            (page) => (
                                <Button
                                    key={
                                        page.name
                                    }
                                    component={
                                        Link
                                    }
                                    to={
                                        page.path
                                    }
                                    sx={{
                                        my: 2,
                                        color:
                                            "white",
                                        display:
                                            "block"
                                    }}
                                >
                                    {
                                        page.name
                                    }
                                </Button>
                            )
                        )}
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 0,
                            display: "flex",
                            alignItems:
                                "center",
                            gap: 1
                        }}
                    >
                        <Tooltip title="Reservations">
                            <IconButton
                                component={
                                    Link
                                }
                                to="/reservations"
                                color="inherit"
                            >
                                <Badge
                                    badgeContent={
                                        count
                                    }
                                    color="error"
                                    invisible={
                                        count ===
                                        0
                                    }
                                >
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Go to Home">
                            <IconButton
                                component={
                                    Link
                                }
                                to="/"
                                color="inherit"
                            >
                                <HomeIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;