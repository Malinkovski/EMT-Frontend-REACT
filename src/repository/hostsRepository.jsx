import axiosInstance from "../axios/axios.js";

const hostsRepository = {
    findAll: async () => {
        return await axiosInstance.get("/hosts");
    }
};

export default hostsRepository;