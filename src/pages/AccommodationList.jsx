import AccommodationCard from "../assets/components/AccommodationCard";
import styles from "../assets/styles/components/accommodationlist.module.css";
import {accommodationsData} from "../dummydata/accommodations.js";
const AccommodationList = () => {

    return (
        <div className={`${styles.accommodationGrid} section`}>
            {accommodationsData.map((acc) => (
                <AccommodationCard accommodation={acc} key={acc.id} />
            ))}
        </div>
    );
};

export default AccommodationList;