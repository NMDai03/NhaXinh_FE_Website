import { AxiosInstance } from "axios";
import { error } from "console";
import { toast } from "react-toastify";

export type AttachInterceptorFunction = (axiosInstance: AxiosInstance) => void;

const skipToastForEndpoints = ["/api/Accounts/current"];

export const attachCommonErrorInterceptor: AttachInterceptorFunction = (
  axiosInstance
) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (skipToastForEndpoints.includes(error.config.url!))
        console.log(error?.response?.data);
      toast.error(error?.response?.data);
      return Promise.reject(error);
    }
  );
};

// export const attachStatusCodeErrorInterceptor: AttachInterceptorFunction = (
//   axiosInstance
// ) => {
//   axiosInstance.interceptors.response.use((response) => {
//     if (response?.status && response.status !== 200) {
//       toast.error(response?.data?.message);
//       //l stop the next interceptor (attachCommonErrorInterceptor) from running
//       // And throw the error to the catch block of the caller
//       throw new Error(response?.data?.message);
//     }
//     return response;
//   });
// };
