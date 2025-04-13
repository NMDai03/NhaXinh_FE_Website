import { Api, HttpClient } from "./Api";
import { attachCommonErrorInterceptor } from "./interceptors";
//   import { ClientApi } from "./clientApi";

const httpClient = new HttpClient({
  timeout: 30 * 1000,
});

httpClient.instance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Order is important here. These interceptors will be executed in reverse order of attachment
attachCommonErrorInterceptor(httpClient.instance);

export const nhaxinhService = new Api(httpClient);
//   export const clientService = new ClientApi(httpClient);
