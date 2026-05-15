import { Routes, Route } from "react-router-dom";
import AccommodationList from "./pages/AccommodationList.jsx";
import AccommodationsDetails from "./pages/AccommodationDetails.jsx"; // Провери дали патеката е точна
import { AppBar, Toolbar, Typography } from "@mui/material";
import Navbar from "./pages/Navbar.jsx";
import HomePage from "./pages/Homepage.jsx";
import CountriesPage from "./pages/Countries.jsx";
import HostsPage from "./pages/Hosts.jsx"
import AccommodationCreate from "./pages/CreateAccommodation.jsx";
import AccommodationEdit from "./pages/EditAccommodation.jsx";
import ReservationList from "./pages/ReservationList.jsx";
function App() {
    return (
        <>
            <Navbar></Navbar>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Accommodations</Typography>
                </Toolbar>
            </AppBar>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/accommodations" element={<AccommodationList />} />
                <Route path="/accommodations/:id" element={<AccommodationsDetails />} />
                <Route path="/countries" element={<CountriesPage />} />
                <Route path="/hosts" element={<HostsPage />} />
                <Route path="/accommodations/create" element={<AccommodationCreate />} />
                <Route path="/accommodations/edit/:id" element={<AccommodationEdit />} />
                <Route path="/reservations" element={<ReservationList />}
                />
            </Routes>
        </>
    );
}

export default App;