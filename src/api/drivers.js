import api from "./api";
import { ENDPOINTS } from "../store";

const { DRIVERS_ENDPOINT } = ENDPOINTS;

export default {
  getAll: async (params = { page: 0, size: 10 }) => {
    const response = await api.get(`${DRIVERS_ENDPOINT}`, {
      params: {
        page: params.page,
        size: params.size,
      },
    });
    return response.data;
  },

  getDriver: async (id) => {
    const response = await api.get(`${DRIVERS_ENDPOINT}/${id}`);
    return response.data;
  },

  updateDriver: async (id, driver) => {
    const response = await api.patch(`${DRIVERS_ENDPOINT}/${id}`, driver);
    return response.data;
  },

  deleteDriver: async (id) => {
    await api.delete(`${DRIVERS_ENDPOINT}/${id}`);
  },

  setCar: async (driverId, params = {}) => {
    await api.patch(`${DRIVERS_ENDPOINT}/${driverId}/setCar`, null, {
      params: {
        id: params.carId,
      },
    });
  },

  removeCar: async (driverId) => {
    await api.patch(`${DRIVERS_ENDPOINT}/${driverId}/removeCar`);
  },
};
