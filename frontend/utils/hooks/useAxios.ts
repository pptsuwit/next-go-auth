"use client";
import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { toast } from "react-toastify";

const httpService = axios.create({
  baseURL: `${process.env.API_URL}${process.env.API_URL_VERSION}`,
  headers: {
    accept: "application/json",
  },
});
const useAxios = () => {
  const refreshToken = useRefreshToken();

  const requestIntercept = httpService.interceptors.request.use(
    function (config) {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${
          getCookie(process.env.TOKEN_NAME as string) || ""
        }`;
      }
      return config;
    },
    (error) => responseError(error)
  );

  const responseIntercept = httpService.interceptors.response.use(
    (response) => response?.data,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        // console.log("refresh token");
        // await refreshToken();

        try {
          // await httpService.post("/refresh-token", {
          //   token: getCookie(process.env.TOKEN_NAME as string),
          // });

          const abouts = await httpService.get("/abouts");
          console.log(getCookie(process.env.TOKEN_NAME as string));
        } catch (error) {}
        prevRequest.headers["Authorization"] = `Bearer ${
          getCookie(process.env.TOKEN_NAME as string) || ""
        }`;
        return axios(prevRequest);
      }
      return responseError(error);
    }
  );

  // httpService.interceptors.request.eject(requestIntercept);
  // httpService.interceptors.response.eject(responseIntercept);
  return httpService;
};

const useRefreshToken = () => {
  const refreshToken = async () => {
    try {
      const res = await httpService.post("/refresh-token", {
        token: getCookie(process.env.TOKEN_NAME as string),
      });
      setCookie(process.env.TOKEN_NAME as string, res.data.token);
    } catch (error) {
      localStorage.removeItem(process.env.TOKEN_NAME as string);
      localStorage.removeItem("user");
      deleteCookie(process.env.TOKEN_NAME as string, {});
      window.location.replace(process.env.REDIRECT_TO_LOGIN as string);
    }
  };
  return refreshToken;
};

const responseError = (error: any) => {
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
      onClose: () => console.log("close"),
      // (window.location.href = process.env.REDIRECT_TO_LOGIN as string),
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
};
export default useAxios;
