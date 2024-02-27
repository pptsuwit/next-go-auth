import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { toast } from "react-toastify";

axios.defaults.headers.common["accept"] = "application/json";
// axios.defaults.headers.common["authorization"] = `Bearer ${localStorage.getItem(process.env.TOKEN_NAME as string) || ""}`;
axios.defaults.headers.common["authorization"] = `Bearer ${
  getCookie(process.env.TOKEN_NAME as string) || ""
}`;

const httpService = axios.create({
  baseURL: `${process.env.API_URL}${process.env.API_URL_VERSION}`,
  headers: {
    accept: "application/json",
  },
});
httpService.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    console.log(error);
    if (error.code === "ERR_NETWORK") return Promise.reject(error.message);

    const { response } = error;
    const { data } = response;
    const errorMessage = data?.error || data?.message || data;
    if (response?.status === 401) {
      deleteCookie(process.env.TOKEN_NAME as string);
      localStorage.removeItem(process.env.TOKEN_NAME as string);
      toast.warn(`Redirecting to login` as string, {
        autoClose: 5000,
        onClose: () =>
          (window.location.href = process.env.REDIRECT_TO_LOGIN as string),
      });
    } else {
      if (data.error) {
        if (data.error.message) return Promise.reject(data.error.message);
        return Promise.reject(data.error);
      } else if (data.message) {
        return Promise.reject(data.message);
      }
    }
    return Promise.reject(errorMessage);
  }
);
export default httpService;
