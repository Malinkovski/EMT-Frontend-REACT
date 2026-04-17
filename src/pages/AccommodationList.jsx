import AccommodationCard from "../assets/components/AccommodationCard";

const AccommodationList = () => {

    const accommodations = [
        { id: 1, name: "Hotel Skopje", price: 120 },
        { id: 2, name: "Mountain Lodge", price: 80 },
        { id: 3, name: "City Apartment", price: 95 },
        { id: 4, name: "Beach Resort", price: 150 },
    ];

    return (
        <div style={{ display: "grid", gap: "20px", padding: "20px" }}>
            {accommodations.map((acc) => (
                <AccommodationCard accommodation={acc} key={acc.id} />
            ))}
        </div>
    );
};

export default AccommodationList;