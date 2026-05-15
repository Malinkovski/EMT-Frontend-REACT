import axiosInstance from "../axios/axios";

const reservationsRepository = {
    getActive: async (userId) => {
        return await axiosInstance.get(
            `/reservations/user/${userId}`
        );
    },

    addItem: async (listId, data) => {
        return await axiosInstance.post(
            `/reservations/${listId}/add-item`,
            data
        );
    },

    removeItem: async (listId, itemId) => {
        return await axiosInstance.delete(
            `/reservations/${listId}/items/${itemId}`
        );
    },

    confirmReservations: async (listId) => {
        return await axiosInstance.post(
            `/reservations/${listId}/confirm`
        );
    }
};

export default reservationsRepository;