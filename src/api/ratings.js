import api from "./api";
import { ENDPOINTS } from "../store";

const { RATING_ENDPOINT } = ENDPOINTS;

export default {
  createRating: async (ratingData) => {
    const response = await api.post(`${RATING_ENDPOINT}`, ratingData);
    return response.data;
  },

  getAll: async (params = {}) => {
    const response = await api.get(`${RATING_ENDPOINT}`, {
      params: {
        page: params.page,
        size: params.size,
      },
    });

    return response.data;
  },

  getRating: async (id) => {
    const response = await api.get(`${RATING_ENDPOINT}/${id}`);
    return response.data;
  },

  getDriverAverage: async (id) => {
    const response = await api.get(`${RATING_ENDPOINT}/driver/${id}`);
    return response.data;
  },

  getPassengerAverage: async (id) => {
    const response = await api.get(`${RATING_ENDPOINT}/passenger/${id}`);
    return response.data;
  },

  rateDriver: async (id, ratingData) => {
    const response = await api.patch(
      `${RATING_ENDPOINT}/${id}/driver/rate`,
      ratingData,
    );
    return response.data;
  },

  ratePassenger: async (id, ratingData) => {
    const response = await api.patch(
      `${RATING_ENDPOINT}/${id}/passenger/rate`,
      ratingData,
    );
    return response.data;
  },
};
