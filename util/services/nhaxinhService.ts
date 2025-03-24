import { Api, HttpClient } from "./Api";
import { attachCommonErrorInterceptor } from "./interceptors";
//   import { ClientApi } from "./clientApi";

const httpClient = new HttpClient({
  timeout: 30 * 1000,
});

// Order is important here. These interceptors will be executed in reverse order of attachment
attachCommonErrorInterceptor(httpClient.instance);

export const nhaxinhService = new Api(httpClient);
//   export const clientService = new ClientApi(httpClient);
