import axiosInstance from "./axiosInstance";

const apiService = async ({ method = "GET", url, data = null, params = null }) => {
  try {
    console.log({
        "method":method,
        "url":url,
        "data":data,
        "params":params
    });
    const response = await axiosInstance({ method, url, data, params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiService;
