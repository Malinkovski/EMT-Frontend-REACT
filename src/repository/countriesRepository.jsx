import axiosInstance from "../axios/axios.js";

const countriesRepository = {
    findAll: async () => {
        return await axiosInstance.get("/countries");
    },

    findById: async (id) => {
        return await axiosInstance.get(`/countries/${id}`);
    }
};

export default countriesRepository;