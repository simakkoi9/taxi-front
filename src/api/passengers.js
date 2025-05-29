import api from "./api";
import { ENDPOINTS } from "../store";

const { PASSENGERS_ENDPOINT } = ENDPOINTS;

export default {
  getAll: async (params = {}) => {
    const response = await api.get(`${PASSENGERS_ENDPOINT}`, {
      params: {
        page: params.page,
        size: params.size,
      },
    });
    return response.data;
  },

  getPassenger: async (id) => {
    const response = await api.get(`${PASSENGERS_ENDPOINT}/${id}`);
    return response.data;
  },

  updatePassenger: async (id, passengerData) => {
    const response = await api.put(
      `${PASSENGERS_ENDPOINT}/${id}`,
      passengerData,
    );
    return response.data;
  },

  deletePassenger: async (id) => {
    await api.delete(`${PASSENGERS_ENDPOINT}/${id}`);
  },
};
