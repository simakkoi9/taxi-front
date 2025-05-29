import api from "./api";
import { ENDPOINTS } from "../store";

const { AUTH_ENDPOINT } = ENDPOINTS;

export default {
  login: async (credentials) => {
    try {
      const response = await api.post(`${AUTH_ENDPOINT}/login`, credentials);
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);
      return true;
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      /* empty */
    }
  },

  logout: async () => {
    await api.post(`${AUTH_ENDPOINT}/logout`);
    localStorage.removeItem("accessToken");
  },

  registerDriver: async (driverData) => {
    return api.post(`${AUTH_ENDPOINT}/driver/register`, driverData);
  },

  registerPassenger: async (passengerData) => {
    return api.post(`${AUTH_ENDPOINT}/passenger/register`, passengerData);
  },
};
