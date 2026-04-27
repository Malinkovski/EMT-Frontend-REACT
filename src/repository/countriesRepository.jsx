import axiosInstance from "../axios/axios.js";

const countriesRepository = {
    findAll: async () => {
        return await axiosInstance.get("/countries");
    }
};

export default countriesRepository;