import { Routes, Route } from "react-router-dom";
import AccommodationList from "./pages/AccommodationList.jsx";
import AccommodationsDetails from "./pages/AccommodationDetails.jsx"; // Провери дали патеката е точна
import { AppBar, Toolbar, Typography } from "@mui/material";

function App() {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Accommodations</Typography>
                </Toolbar>
            </AppBar>

            {/* routes here*/}
            <Routes>
                <Route path="/" element={<AccommodationList />} />
                <Route path="/accommodations/:id" element={<AccommodationsDetails />} />
            </Routes>
        </>
    );
}

export default App;