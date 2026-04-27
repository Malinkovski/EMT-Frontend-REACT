import { useEffect, useState } from "react";
import accommodationsRepository from "../repository/accommodationsRepository";
import AccommodationCard from "../assets/components/AccommodationCard";
import styles from "../assets/styles/components/accommodationlist.module.css";

const AccommodationList = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const response = await accommodationsRepository.findAll();
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

    return (
        <div className={`${styles.accommodationGrid} section`}>
            {accommodations.map((acc) => (
                <AccommodationCard accommodation={acc} key={acc.id} />
            ))}
        </div>
    );
};

export default AccommodationList;