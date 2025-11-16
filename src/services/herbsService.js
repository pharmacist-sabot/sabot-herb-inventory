import axios from 'axios';

const API_URL = import.meta.env.VITE_GOOGLE_API_URL;
export default {
  async getHerbSummary(year) {
    try {
      const response = await axios.get(`${API_URL}?path=getHerbSummary&year=${year}`);

      if (response.data.status === "success") {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Failed to fetch herb summary");
      }
    } catch (error) {
      console.error("Error in getHerbSummary:", error);
      throw error;
    }
  }
};
