import axiosInstance from "../axios/axios.js";

const accommodationsRepository = {
    findAll: async () => {
        return await axiosInstance.get("/accommodations");
    },

    findById: async (id) => {
        return await axiosInstance.get(`/accommodations/${id}`);
    },

    create: async (data) => {
        return await axiosInstance.post("/accommodations", data);
    },

    update: async (id, data) => {
        return await axiosInstance.put(`/accommodations/${id}`, data);
    },

    deleteById: async (id) => {
        return await axiosInstance.delete(`/accommodations/${id}`);
    }
};

export default accommodationsRepository;