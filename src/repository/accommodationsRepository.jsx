import axiosInstance from "../axios/axios.js";

const accommodationsRepository = {
    findAll: async () => {
        return await axiosInstance.get("/accommodations");
    },

    findById: async (id) => {
        return await axiosInstance.get(`/accommodations/${id}`);
    }
};

export default accommodationsRepository;