import AccommodationCard from './assets/components/AccommodationCard.jsx';
import './assets/styles/core/index.css'
import AccommodationList from "./pages/AccommodationList.jsx";
import { AppBar, Toolbar, Typography } from "@mui/material";

function App() {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Accommodations
                    </Typography>
                </Toolbar>
            </AppBar>
            <AccommodationList/>
        </>
    );
}

export default App