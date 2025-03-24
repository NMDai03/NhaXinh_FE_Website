/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Cart {
  /** @format int32 */
  cartId?: number;
  /** @format int32 */
  userId?: number;
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  variationId?: number;
  /** @format int32 */
  quantity?: number;
  /** @format double */
  price?: number;
  /** @format date-time */
  createdAt?: string | null;
  product?: Product;
  user?: User;
  variation?: ProductVariation;
}

export interface CartDTO {
  /** @format int32 */
  cartId?: number;
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  variationId?: number;
  /** @format int32 */
  quantity?: number;
  productName?: string | null;
  variationColor?: string | null;
  /** @format double */
  price?: number;
}

export interface Category {
  /** @format int32 */
  categoryId?: number;
  name?: string | null;
  description?: string | null;
  /** @format date-time */
  createdAt?: string | null;
  /** @format date-time */
  updatedAt?: string | null;
  active?: boolean | null;
  products?: Product[] | null;
  subCategories?: SubCategory[] | null;
}

export interface CategoryAddDTO {
  name?: string | null;
  description?: string | null;
}

export interface Collection {
  /** @format int32 */
  collectionId?: number;
  name?: string | null;
  description?: string | null;
  active?: boolean | null;
  /** @format date-time */
  createdAt?: string | null;
  /** @format date-time */
  updatedAt?: string | null;
  products?: Product[] | null;
}

export interface CollectionAddDTO {
  name?: string | null;
  description?: string | null;
}

export interface LoginDTO {
  email?: string | null;
  password?: string | null;
}

export interface Material {
  /** @format int32 */
  materialId?: number;
  name?: string | null;
  description?: string | null;
  /** @format date-time */
  createdAt?: string | null;
  /** @format date-time */
  updatedAt?: string | null;
  active?: boolean | null;
  products?: Product[] | null;
}

export interface MaterialAddDTO {
  name?: string | null;
  description?: string | null;
}

export interface Message {
  /** @format int32 */
  messageId?: number;
  /** @format int32 */
  senderId?: number;
  /** @format int32 */
  receiverId?: number;
  messageContent?: string | null;
  /** @format date-time */
  sentDate?: string | null;
  receiver?: User;
  sender?: User;
}

export interface Notification {
  /** @format int32 */
  notificationId?: number;
  /** @format int32 */
  userId?: number;
  message?: string | null;
  /** @format date-time */
  createdDate?: string | null;
  isRead?: boolean;
  title?: string | null;
  user?: User;
}

export interface Order {
  orderId?: string | null;
  /** @format int32 */
  userId?: number;
  /** @format double */
  totalPrice?: number;
  shippingAddress?: string | null;
  deliveryInstructions?: string | null;
  status?: string | null;
  /** @format date-time */
  createdAt?: string | null;
  user?: User;
  orderDetails?: OrderDetail[] | null;
  payments?: Payment[] | null;
}

export interface OrderDetail {
  /** @format int32 */
  orderDetailId?: number;
  orderId?: string | null;
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  variationId?: number;
  /** @format int32 */
  quantity?: number;
  /** @format double */
  price?: number;
  order?: Order;
  product?: Product;
  variation?: ProductVariation;
}

export interface Payment {
  /** @format int32 */
  paymentId?: number;
  orderId?: string | null;
  paymentMethod?: string | null;
  status?: string | null;
  transactionId?: string | null;
  /** @format date-time */
  createdAt?: string | null;
  /** @format int64 */
  vnpTransactionNo?: number | null;
  bankCode?: string | null;
  /** @format int64 */
  amount?: number | null;
  vnpayTransactionStatus?: string | null;
  secureHash?: string | null;
  order?: Order;
}

export interface Product {
  /** @format int32 */
  productId?: number;
  name?: string | null;
  description?: string | null;
  /** @format double */
  price?: number;
  /** @format int32 */
  sold?: number;
  /** @format int32 */
  categoryId?: number;
  /** @format int32 */
  subCategoryId?: number;
  /** @format double */
  dimensionsLength?: number | null;
  /** @format double */
  dimensionsWidth?: number | null;
  /** @format double */
  dimensionsHeight?: number | null;
  /** @format double */
  weight?: number | null;
  assemblyRequired?: boolean | null;
  /** @format date-time */
  createdAt?: string | null;
  /** @format int32 */
  materialId?: number;
  /** @format int32 */
  collectionId?: number;
  active?: boolean;
  /** @format date-time */
  updatedAt?: string | null;
  model3DUrl?: string | null;
  category?: Category;
  collection?: Collection;
  material?: Material;
  subCategory?: SubCategory;
  carts?: Cart[] | null;
  orderDetails?: OrderDetail[] | null;
  productImages?: ProductImage[] | null;
  productVariations?: ProductVariation[] | null;
  reviews?: Review[] | null;
  wishlists?: Wishlist[] | null;
}

export interface ProductImage {
  /** @format int32 */
  imageId?: number;
  /** @format int32 */
  productId?: number;
  imageUrl?: string | null;
  isPrimary?: boolean | null;
  product?: Product;
}

export interface ProductSearchDTO {
  name?: string | null;
  /** @format int32 */
  categoryId?: number | null;
  /** @format int32 */
  subCategoryId?: number | null;
  /** @format int32 */
  materialId?: number | null;
  /** @format int32 */
  collectionId?: number | null;
}

export interface ProductVariation {
  /** @format int32 */
  variationId?: number;
  /** @format int32 */
  productId?: number;
  color?: string | null;
  imageUrl?: string | null;
  product?: Product;
  carts?: Cart[] | null;
  orderDetails?: OrderDetail[] | null;
}

export interface RegisterDTO {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  password?: string | null;
  rePassword?: string | null;
  phone?: string | null;
  address?: string | null;
}

export interface Review {
  /** @format int32 */
  reviewId?: number;
  /** @format int32 */
  userId?: number;
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  rating?: number | null;
  comment?: string | null;
  verifiedPurchase?: boolean | null;
  /** @format date-time */
  createdAt?: string | null;
  product?: Product;
  user?: User;
}

export interface SubCategory {
  /** @format int32 */
  subCategoryId?: number;
  /** @format int32 */
  categoryId?: number;
  name?: string | null;
  description?: string | null;
  /** @format date-time */
  createdAt?: string | null;
  /** @format date-time */
  updatedAt?: string | null;
  active?: boolean | null;
  category?: Category;
  products?: Product[] | null;
}

export interface SubCategoryAddDTO {
  /** @format int32 */
  categoryId?: number;
  name?: string | null;
  description?: string | null;
}

export interface User {
  /** @format int32 */
  userId?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  passwordHash?: string | null;
  phone?: string | null;
  address?: string | null;
  role?: string | null;
  /** @format date-time */
  createdAt?: string | null;
  active?: boolean;
  avatarUrl?: string | null;
  carts?: Cart[] | null;
  messageReceivers?: Message[] | null;
  messageSenders?: Message[] | null;
  notifications?: Notification[] | null;
  orders?: Order[] | null;
  reviews?: Review[] | null;
  wishlists?: Wishlist[] | null;
}

export interface VerifyOTPDTO {
  email?: string | null;
  userOtp?: string | null;
}

export interface Wishlist {
  /** @format int32 */
  wishlistId?: number;
  /** @format int32 */
  userId?: number;
  /** @format int32 */
  productId?: number;
  /** @format date-time */
  addedDate?: string | null;
  product?: Product;
  user?: User;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:5217",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem)
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title NhaXinh_Backend
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  api = {
    /**
     * No description
     *
     * @tags Cart
     * @name CartAddToCartCreate
     * @request POST:/api/Cart/AddToCart
     * @secure
     */
    cartAddToCartCreate: (
      query?: {
        /** @format int32 */
        ProductId?: number;
        /** @format int32 */
        VariationId?: number;
        /** @format int32 */
        Quantity?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CartDTO, any>({
        path: `/api/Cart/AddToCart`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cart
     * @name CartUpdateCartUpdate
     * @request PUT:/api/Cart/UpdateCart
     * @secure
     */
    cartUpdateCartUpdate: (
      query?: {
        /** @format int32 */
        cartId?: number;
        /** @format int32 */
        quantity?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CartDTO, any>({
        path: `/api/Cart/UpdateCart`,
        method: "PUT",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cart
     * @name CartGetCartByUserIdList
     * @request GET:/api/Cart/GetCartByUserId
     * @secure
     */
    cartGetCartByUserIdList: (params: RequestParams = {}) =>
      this.http.request<CartDTO[], any>({
        path: `/api/Cart/GetCartByUserId`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cart
     * @name CartDeleteCartItemDelete
     * @request DELETE:/api/Cart/DeleteCartItem/{cartId}
     * @secure
     */
    cartDeleteCartItemDelete: (cartId: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/Cart/DeleteCartItem/${cartId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesGetAllCategoryList
     * @request GET:/api/Categories/GetAllCategory
     * @secure
     */
    categoriesGetAllCategoryList: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/Categories/GetAllCategory`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesGetCategoryByIdList
     * @request GET:/api/Categories/GetCategoryById
     * @secure
     */
    categoriesGetCategoryByIdList: (
      query?: {
        /** @format int32 */
        id?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request({
        path: `/api/Categories/GetCategoryById`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesCreateCategoryCreate
     * @request POST:/api/Categories/CreateCategory
     * @secure
     */
    categoriesCreateCategoryCreate: (
      data: CategoryAddDTO,
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Categories/CreateCategory`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesUpdateCategoryUpdate
     * @request PUT:/api/Categories/UpdateCategory
     * @secure
     */
    categoriesUpdateCategoryUpdate: (
      data: CategoryAddDTO,
      query?: {
        /** @format int32 */
        id?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Categories/UpdateCategory`,
        method: "PUT",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collections
     * @name CollectionsGetAllCollectionsList
     * @request GET:/api/Collections/GetAllCollections
     * @secure
     */
    collectionsGetAllCollectionsList: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/Collections/GetAllCollections`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collections
     * @name CollectionsGetCollectionByIdDetail
     * @request GET:/api/Collections/GetCollectionById/{id}
     * @secure
     */
    collectionsGetCollectionByIdDetail: (
      id: number,
      params: RequestParams = {}
    ) =>
      this.http.request({
        path: `/api/Collections/GetCollectionById/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collections
     * @name CollectionsCreateCollectionCreate
     * @request POST:/api/Collections/CreateCollection
     * @secure
     */
    collectionsCreateCollectionCreate: (
      data: CollectionAddDTO,
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Collections/CreateCollection`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collections
     * @name CollectionsUpdateCollectionUpdate
     * @request PUT:/api/Collections/UpdateCollection/{id}
     * @secure
     */
    collectionsUpdateCollectionUpdate: (
      id: number,
      data: CollectionAddDTO,
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Collections/UpdateCollection/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collections
     * @name CollectionsUpdateCollectionActiveUpdate
     * @request PUT:/api/Collections/UpdateCollectionActive
     * @secure
     */
    collectionsUpdateCollectionActiveUpdate: (
      query?: {
        /** @format int32 */
        id?: number;
        active?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.http.request({
        path: `/api/Collections/UpdateCollectionActive`,
        method: "PUT",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Login
     * @name LoginLoginCreate
     * @request POST:/api/Login/Login
     * @secure
     */
    loginLoginCreate: (data: LoginDTO, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/Login/Login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Login
     * @name LoginRegisterForCustomerCreate
     * @request POST:/api/Login/RegisterForCustomer
     * @secure
     */
    loginRegisterForCustomerCreate: (
      data: RegisterDTO,
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Login/RegisterForCustomer`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Login
     * @name LoginVerifyOtpForCustomerCreate
     * @request POST:/api/Login/VerifyOTPForCustomer
     * @secure
     */
    loginVerifyOtpForCustomerCreate: (
      data: VerifyOTPDTO,
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Login/VerifyOTPForCustomer`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Login
     * @name LoginResetPasswordCreate
     * @request POST:/api/Login/ResetPassword
     * @secure
     */
    loginResetPasswordCreate: (
      query?: {
        email?: string;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Login/ResetPassword`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Material
     * @name MaterialGetAllMaterialsList
     * @request GET:/api/Material/GetAllMaterials
     * @secure
     */
    materialGetAllMaterialsList: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/Material/GetAllMaterials`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Material
     * @name MaterialGetMaterialByIdDetail
     * @request GET:/api/Material/GetMaterialById/{id}
     * @secure
     */
    materialGetMaterialByIdDetail: (id: number, params: RequestParams = {}) =>
      this.http.request({
        path: `/api/Material/GetMaterialById/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Material
     * @name MaterialCreateMaterialCreate
     * @request POST:/api/Material/CreateMaterial
     * @secure
     */
    materialCreateMaterialCreate: (
      data: MaterialAddDTO,
      params: RequestParams = {}
    ) =>
      this.http.request<Material, any>({
        path: `/api/Material/CreateMaterial`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Material
     * @name MaterialUpdateMaterialUpdate
     * @request PUT:/api/Material/UpdateMaterial/{id}
     * @secure
     */
    materialUpdateMaterialUpdate: (
      id: number,
      data: MaterialAddDTO,
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Material/UpdateMaterial/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderCreateOrderFromCartCreate
     * @request POST:/api/Order/CreateOrderFromCart
     * @secure
     */
    orderCreateOrderFromCartCreate: (
      query?: {
        Address?: string;
        Note?: string;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Order/CreateOrderFromCart`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderUpdateOrderStatusCreate
     * @request POST:/api/Order/UpdateOrderStatus
     * @secure
     */
    orderUpdateOrderStatusCreate: (
      query?: {
        orderId?: string;
        status?: string;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Order/UpdateOrderStatus`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderGetOrderByUserIdList
     * @request GET:/api/Order/GetOrderByUserId
     * @secure
     */
    orderGetOrderByUserIdList: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/Order/GetOrderByUserId`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductAddProductCreate
     * @request POST:/api/Product/AddProduct
     * @secure
     */
    productAddProductCreate: (
      data: {
        Name?: string;
        Description?: string;
        /** @format double */
        Price?: number;
        /** @format int32 */
        Sold?: number;
        /** @format int32 */
        CategoryId?: number;
        /** @format int32 */
        SubCategoryId?: number;
        /** @format double */
        DimensionsLength?: number;
        /** @format double */
        DimensionsWidth?: number;
        /** @format double */
        DimensionsHeight?: number;
        /** @format int32 */
        MaterialId?: number;
        /** @format int32 */
        CollectionId?: number;
        /** @format double */
        Weight?: number;
        AssemblyRequired?: boolean;
        Active?: boolean;
        /** @format binary */
        Model3DUrl?: File;
        Images?: File[];
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Product/AddProduct`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductGetProductByIdDetail
     * @request GET:/api/Product/GetProductById/{id}
     * @secure
     */
    productGetProductByIdDetail: (id: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/Product/GetProductById/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductGetAllProductsList
     * @request GET:/api/Product/GetAllProducts
     * @secure
     */
    productGetAllProductsList: (
      query?: {
        /** @format int32 */
        pageNumber?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Product/GetAllProducts`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductUpdateProductUpdate
     * @request PUT:/api/Product/UpdateProduct
     * @secure
     */
    productUpdateProductUpdate: (
      data: {
        Name?: string;
        Description?: string;
        /** @format double */
        Price?: number;
        /** @format int32 */
        Sold?: number;
        /** @format int32 */
        CategoryId?: number;
        /** @format int32 */
        SubCategoryId?: number;
        /** @format double */
        DimensionsLength?: number;
        /** @format double */
        DimensionsWidth?: number;
        /** @format double */
        DimensionsHeight?: number;
        /** @format int32 */
        MaterialId?: number;
        /** @format int32 */
        CollectionId?: number;
        /** @format double */
        Weight?: number;
        AssemblyRequired?: boolean;
        Active?: boolean;
        /** @format binary */
        Model3DUrl?: File;
        Images?: File[];
      },
      query?: {
        /** @format int32 */
        id?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Product/UpdateProduct`,
        method: "PUT",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductUpdateProductActivePartialUpdate
     * @request PATCH:/api/Product/UpdateProductActive/{id}
     * @secure
     */
    productUpdateProductActivePartialUpdate: (
      id: number,
      data: boolean,
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Product/UpdateProductActive/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductSearchProductCreate
     * @request POST:/api/Product/SearchProduct
     * @secure
     */
    productSearchProductCreate: (
      data: ProductSearchDTO,
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Product/SearchProduct`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductFilterProductWithPriceAndMaterialList
     * @request GET:/api/Product/FilterProductWithPriceAndMaterial
     * @secure
     */
    productFilterProductWithPriceAndMaterialList: (
      query?: {
        /** @format int32 */
        pageNumber?: number;
        /** @format int32 */
        pageSize?: number;
        /** @format double */
        minPrice?: number;
        /** @format double */
        maxPrice?: number;
        /** @format int32 */
        materialId?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Product/FilterProductWithPriceAndMaterial`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductGetTop6ProductByTimeDesList
     * @request GET:/api/Product/GetTop6ProductByTimeDes
     * @secure
     */
    productGetTop6ProductByTimeDesList: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/Product/GetTop6ProductByTimeDes`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductUploadModel3DFileUpdate
     * @request PUT:/api/Product/UploadModel3DFile
     * @secure
     */
    productUploadModel3DFileUpdate: (
      data: {
        /** @format binary */
        model3D?: File;
      },
      query?: {
        /** @format int32 */
        productId?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Product/UploadModel3DFile`,
        method: "PUT",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProductVariation
     * @name ProductVariationGetProductVariationsByProductIdDetail
     * @request GET:/api/ProductVariation/GetProductVariationsByProductId/{productId}
     * @secure
     */
    productVariationGetProductVariationsByProductIdDetail: (
      productId: number,
      params: RequestParams = {}
    ) =>
      this.http.request<ProductVariation[], any>({
        path: `/api/ProductVariation/GetProductVariationsByProductId/${productId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProductVariation
     * @name ProductVariationAddProductVariationCreate
     * @request POST:/api/ProductVariation/AddProductVariation
     * @secure
     */
    productVariationAddProductVariationCreate: (
      data: {
        /** @format int32 */
        ProductId?: number;
        Color?: string;
        /** @format binary */
        ImageUrl?: File;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<ProductVariation, any>({
        path: `/api/ProductVariation/AddProductVariation`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProductVariation
     * @name ProductVariationUpdateProductVariationCreate
     * @request POST:/api/ProductVariation/UpdateProductVariation
     * @secure
     */
    productVariationUpdateProductVariationCreate: (
      data: {
        /** @format int32 */
        ProductId?: number;
        Color?: string;
        /** @format binary */
        ImageUrl?: File;
      },
      query?: {
        /** @format int32 */
        id?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<ProductVariation, any>({
        path: `/api/ProductVariation/UpdateProductVariation`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfileUpdateProfileCreate
     * @request POST:/api/Profile/UpdateProfile
     * @secure
     */
    profileUpdateProfileCreate: (
      data: {
        FirstName?: string;
        LastName?: string;
        Phone?: string;
        Address?: string;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Profile/UpdateProfile`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfileUpdateProfileImageCreate
     * @request POST:/api/Profile/UpdateProfileImage
     * @secure
     */
    profileUpdateProfileImageCreate: (
      data: {
        /** @format binary */
        image?: File;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Profile/UpdateProfileImage`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfileGetCurrentUserProfileList
     * @request GET:/api/Profile/GetCurrentUserProfile
     * @secure
     */
    profileGetCurrentUserProfileList: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/Profile/GetCurrentUserProfile`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfileUpdateProfilePasswordCreate
     * @request POST:/api/Profile/UpdateProfilePassword
     * @secure
     */
    profileUpdateProfilePasswordCreate: (
      query?: {
        oldPass?: string;
        newPass?: string;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/Profile/UpdateProfilePassword`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags SubCategory
     * @name SubCategoryGetAllCategoryList
     * @request GET:/api/SubCategory/GetAllCategory
     * @secure
     */
    subCategoryGetAllCategoryList: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/SubCategory/GetAllCategory`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags SubCategory
     * @name SubCategoryGetCategoryByIdList
     * @request GET:/api/SubCategory/GetCategoryById
     * @secure
     */
    subCategoryGetCategoryByIdList: (
      query?: {
        /** @format int32 */
        id?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/SubCategory/GetCategoryById`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags SubCategory
     * @name SubCategoryCreateCategoryCreate
     * @request POST:/api/SubCategory/CreateCategory
     * @secure
     */
    subCategoryCreateCategoryCreate: (
      data: SubCategoryAddDTO,
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/SubCategory/CreateCategory`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags SubCategory
     * @name SubCategoryUpdateCategoryUpdate
     * @request PUT:/api/SubCategory/UpdateCategory
     * @secure
     */
    subCategoryUpdateCategoryUpdate: (
      data: SubCategoryAddDTO,
      query?: {
        /** @format int32 */
        id?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/SubCategory/UpdateCategory`,
        method: "PUT",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags SubCategory
     * @name SubCategoryGetSubCategoryByCategoryIdList
     * @request GET:/api/SubCategory/GetSubCategoryByCategoryId
     * @secure
     */
    subCategoryGetSubCategoryByCategoryIdList: (
      query?: {
        /** @format int32 */
        id?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/SubCategory/GetSubCategoryByCategoryId`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserGetAllUserList
     * @request GET:/api/User/GetAllUser
     * @secure
     */
    userGetAllUserList: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/User/GetAllUser`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserGetUserByIdList
     * @request GET:/api/User/GetUserById
     * @secure
     */
    userGetUserByIdList: (
      query?: {
        /** @format int32 */
        id?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/User/GetUserById`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserDeleteUserByIdDelete
     * @request DELETE:/api/User/DeleteUserById
     * @secure
     */
    userDeleteUserByIdDelete: (
      query?: {
        /** @format int32 */
        id?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/User/DeleteUserById`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserCurrentUserList
     * @request GET:/api/User/CurrentUser
     * @secure
     */
    userCurrentUserList: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/User/CurrentUser`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserAssignRoleCreate
     * @request POST:/api/User/AssignRole
     * @secure
     */
    userAssignRoleCreate: (
      query?: {
        /** @format int32 */
        id?: number;
        role?: string;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/User/AssignRole`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),
  };
  createPayment = {
    /**
     * No description
     *
     * @tags Payment
     * @name CreatePaymentList
     * @request GET:/create-payment
     * @secure
     */
    createPaymentList: (
      query?: {
        IdOrder?: string;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/create-payment`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  payment = {
    /**
     * No description
     *
     * @tags Payment
     * @name Payment
     * @request GET:/payment
     * @secure
     */
    payment: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/payment`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}
