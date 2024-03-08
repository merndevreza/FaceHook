import { useEffect } from "react";
import { api } from "../api";
import { useAuth } from "./useAuth";
import axios from "axios";

const useAxios = () => {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    // add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        } 
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    // add a response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => { 
        return response;
      },
      async (err) => {
        const originalRequest = err.config;
        if (err.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = auth?.refreshToken; 
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            ); 
            const {token} = response.data;
            setAuth({ ...auth, authToken:token }); 
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } catch (error) {
            console.error("Error during refresh token:", error);
          }
        }
        return Promise.reject(err);
      }
    );

    //cleanup
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth, setAuth, auth.authToken]);
  return { api };
};
export default useAxios;
