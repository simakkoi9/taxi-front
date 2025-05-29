import api from "./api";
import { ENDPOINTS } from "../store";

const { RIDES_ENDPOINT } = ENDPOINTS;

export default {
  createRide: async (rideData) => {
    const response = await api.post(`${RIDES_ENDPOINT}`, rideData);
    return response.data;
  },

  getAll: async (params = { page: 0, size: 10 }) => {
    const response = await api.get(`${RIDES_ENDPOINT}`, {
      params: {
        page: params.page,
        size: params.size,
      },
    });
    return response.data;
  },

  getRide: async (id) => {
    const response = await api.get(`${RIDES_ENDPOINT}/${id}`);
    return response.data;
  },

  getDriverForRide: async (id) => {
    const response = await api.patch(`${RIDES_ENDPOINT}/${id}/getDriver`);
    return response.data;
  },

  changeStatus: async (id, params = {}) => {
    const response = await api.patch(`${RIDES_ENDPOINT}/${id}`, {
      params: {
        status: params.status,
      },
    });
    return response.data;
  },
};
