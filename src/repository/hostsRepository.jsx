import axiosInstance from "../axios/axios.js";

const hostsRepository = {
    findAll: async () => {
        return await axiosInstance.get("/hosts");
    },

    findById: async (id) => {
        return await axiosInstance.get(`/hosts/${id}`);
    }
};

export default hostsRepository;