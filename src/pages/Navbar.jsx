import { Link } from "react-router-dom";
import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const pages = [
    { name: "Home", path: "/" },
    { name: "Accommodations", path: "/accommodations" },
    { name: "Hosts", path: "/hosts" },
    { name: "Countries", path: "/countries" },
    { name: "Add Accommodation", path: "/accommodations/create" }
];

function Navbar() {
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
                            textDecoration: "none",
                        }}
                    >
                        StayFinder
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                component={Link}
                                to={page.path}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Go to Home">
                            <IconButton component={Link} to="/" color="inherit">
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