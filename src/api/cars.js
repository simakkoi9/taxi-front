import api from "./api";
import { ENDPOINTS } from "../store";

const { CARS_ENDPOINT } = ENDPOINTS;

export default {
  getAll: async (params = {}) => {
    const response = await api.get(`${CARS_ENDPOINT}`, {
      params: {
        page: params.page,
        size: params.size,
      },
    });
    return response.data;
  },

  getCar: async (id) => {
    const response = await api.get(`${CARS_ENDPOINT}/${id}`);
    return response.data;
  },

  createCar: async (carData) => {
    const response = await api.post(`${CARS_ENDPOINT}`, carData);
    return response.data;
  },

  updateCar: async (id, carData) => {
    const response = await api.put(`${CARS_ENDPOINT}/${id}`, carData);
    return response.data;
  },

  deleteCar: async (id) => {
    await api.delete(`${CARS_ENDPOINT}/${id}`);
  },
};
