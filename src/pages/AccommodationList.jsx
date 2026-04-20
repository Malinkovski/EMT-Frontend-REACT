import { useEffect, useState } from "react";
import axiosInstance from "../axios/axios.js";
import AccommodationCard from "../assets/components/AccommodationCard";
import styles from "../assets/styles/components/accommodationlist.module.css";

const AccommodationList = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //ADD TO REPOSITORY
    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const response = await axiosInstance.get("/accommodations"); // endpoint from your backend
                setAccommodations(response.data);
            } catch (err) {
                setError("Failed to load accommodations");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAccommodations();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    console.log(accommodations)

    return (
        <div className={`${styles.accommodationGrid} section`}>
            {accommodations.map((acc) => (
                <AccommodationCard accommodation={acc} key={acc.id} />
            ))}
        </div>
    );
};

export default AccommodationList;