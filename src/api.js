
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
//
// api.interceptors.request.use((config) => {
//       const token = localStorage.getItem(ACCESS_TOKEN);
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) =>{
//         return Promise.reject(error)
//     }
// );
//
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         await store.dispatch(refreshAccessToken());
//         const token = localStorage.getItem(ACCESS_TOKEN);
//         originalRequest.headers.Authorization = `Bearer ${token}`;
//         return api(originalRequest);
//       } catch (err) {
//         store.dispatch({ type: "auth/logout" });
//         return Promise.reject(err);
//       }
//     }
//
//     return Promise.reject(error);
//   }
// );

export default api;