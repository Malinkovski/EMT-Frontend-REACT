import { useEffect, useState } from "react";

import {
    Box,
    TextField,
    MenuItem,
    Pagination
} from "@mui/material";

import accommodationsRepository
    from "../repository/accommodationsRepository";

import AccommodationCard
    from "../assets/components/AccommodationCard";

import styles
    from "../assets/styles/components/accommodationlist.module.css";

const AccommodationList = () => {
    const [accommodations,
        setAccommodations] = useState([]);

    const [filtered,
        setFiltered] = useState([]);

    const [loading,
        setLoading] = useState(true);

    const [error,
        setError] = useState(null);

    const [search,
        setSearch] = useState("");

    const [selectedCountry,
        setSelectedCountry] =
        useState("ALL");

    const [selectedHost,
        setSelectedHost] =
        useState("ALL");

    const [page,
        setPage] = useState(1);

    const ITEMS_PER_PAGE = 12;

    useEffect(() => {
        const fetchAccommodations =
            async () => {
                try {
                    const response =
                        await accommodationsRepository.findAll();

                    setAccommodations(
                        response.data
                    );

                    setFiltered(
                        response.data
                    );
                } catch (err) {
                    setError(
                        "Failed to load accommodations"
                    );

                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

        fetchAccommodations();
    }, []);

    useEffect(() => {
        let result =
            accommodations;

        if (search.trim()) {
            result = result.filter(
                (acc) => {
                    const query =
                        search.toLowerCase();

                    const accommodationName =
                        acc.name.toLowerCase();

                    const hostName =
                        `${acc.host.name} ${acc.host.surname}`.toLowerCase();

                    const countryName =
                        acc.host.country.name.toLowerCase();

                    return (
                        accommodationName.includes(
                            query
                        ) ||
                        hostName.includes(
                            query
                        ) ||
                        countryName.includes(
                            query
                        )
                    );
                }
            );
        }

        if (
            selectedCountry !==
            "ALL"
        ) {
            result = result.filter(
                (acc) =>
                    acc.host.country
                        .name ===
                    selectedCountry
            );
        }

        if (
            selectedHost !==
            "ALL"
        ) {
            result = result.filter(
                (acc) =>
                    `${acc.host.name} ${acc.host.surname}` ===
                    selectedHost
            );
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFiltered(result);

        setPage(1);

    }, [
        search,
        selectedCountry,
        selectedHost,
        accommodations
    ]);

    const countries = [
        "ALL",
        ...new Set(
            accommodations.map(
                (acc) =>
                    acc.host.country
                        .name
            )
        )
    ];

    const hosts = [
        "ALL",
        ...new Set(
            accommodations.map(
                (acc) =>
                    `${acc.host.name} ${acc.host.surname}`
            )
        )
    ];

    const totalPages =
        Math.ceil(
            filtered.length /
            ITEMS_PER_PAGE
        );

    const paginatedItems =
        filtered.slice(
            (page - 1) *
            ITEMS_PER_PAGE,
            page *
            ITEMS_PER_PAGE
        );

    if (loading)
        return <p>Loading...</p>;

    if (error)
        return <p>{error}</p>;

    return (
        <Box sx={{ p: 4 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "center",
                    alignItems:
                        "center",
                    gap: 2,
                    mb: 5,
                    flexWrap: "wrap",
                    width: "100%"
                }}
            >
                <TextField
                    label="Search accommodations"
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    sx={{
                        minWidth: 320,
                        backgroundColor:
                            "white"
                    }}
                />

                <TextField
                    select
                    label="Country"
                    value={
                        selectedCountry
                    }
                    onChange={(e) =>
                        setSelectedCountry(
                            e.target.value
                        )
                    }
                    sx={{
                        minWidth: 220,
                        backgroundColor:
                            "white"
                    }}
                >
                    {countries.map(
                        (country) => (
                            <MenuItem
                                key={
                                    country
                                }
                                value={
                                    country
                                }
                            >
                                {country}
                            </MenuItem>
                        )
                    )}
                </TextField>

                <TextField
                    select
                    label="Host"
                    value={
                        selectedHost
                    }
                    onChange={(e) =>
                        setSelectedHost(
                            e.target.value
                        )
                    }
                    sx={{
                        minWidth: 240,
                        backgroundColor:
                            "white"
                    }}
                >
                    {hosts.map(
                        (host) => (
                            <MenuItem
                                key={host}
                                value={host}
                            >
                                {host}
                            </MenuItem>
                        )
                    )}
                </TextField>
            </Box>

            <div
                className={`${styles.accommodationGrid} section`}
            >
                {paginatedItems.map(
                    (acc) => (
                        <AccommodationCard
                            accommodation={
                                acc
                            }
                            key={acc.id}
                        />
                    )
                )}
            </div>

            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "center",
                    mt: 5
                }}
            >
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(
                        _,
                        value
                    ) =>
                        setPage(
                            value
                        )
                    }
                    color="primary"
                    size="large"
                />
            </Box>
        </Box>
    );
};

export default AccommodationList;