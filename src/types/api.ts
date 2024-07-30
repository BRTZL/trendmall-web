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

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios"
import axios from "axios"

export interface LoginDto {
  email: string
  password: string
}

export interface AuthEntity {
  accessToken: string
  expiresIn: number
}

export interface RegisterDto {
  email: string
  password: string
}

export interface UserEntity {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
}

export interface UpdateUserDto {
  fullName: string
  phoneNumber: string
}

export interface CreateCategoryDto {
  name: string
  parentId: string
}

export interface CategoryEntity {
  id: string
  name: string
  parentId: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
}

export interface UpdateCategoryDto {
  name?: string
  parentId?: string
}

export interface CreateProductDto {
  name: string
  description: string
  price: number
  stock: number
  categoryId: string
  images: string[]
}

export interface ProductImageEntity {
  id: string
  url: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
}

export interface ProductEntity {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: CategoryEntity
  images: ProductImageEntity[]
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
}

export interface PaginationProductEntity {
  page: number
  limit: number
  skip: number
  total: number
  data: ProductEntity[]
}

export interface UpdateProductDto {
  name?: string
  description?: string
  price?: number
  stock?: number
  categoryId?: string
  images?: string[]
}

export interface CreateAddressDto {
  fullName: string
  address: string
  city: string
  state: string
  zipCode: string
}

export interface AddressEntity {
  id: string
  fullName: string
  address: string
  city: string
  state: string
  zipCode: string
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
}

export interface UpdateAddressDto {
  fullName?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
}

export interface AddItemToCartDto {
  quantity: number
  productId: string
}

export interface CartItemEntity {
  id: string
  quantity: number
  product: ProductEntity
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
}

export interface RemoveItemFromCartDto {
  quantity: number
  productId: string
}

export interface CreateOrderDto {
  addressId: string
}

export interface OrderItemEntity {
  id: string
  quantity: number
  price: number
  product: ProductEntity
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
}

export interface OrderEntity {
  id: string
  total: number
  status: "PENDING" | "COMPLETED" | "CANCELLED"
  items: OrderItemEntity[]
  address: AddressEntity
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
}

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"]
  private secure?: boolean
  private format?: ResponseType

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

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
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] =
        property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem)
        )
      }

      return formData
    }, new FormData())
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
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body)
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
    })
  }
}

/**
 * @title Trendmall API
 * @version 1.0
 * @contact
 *
 * The Trendmall API description
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  v1 = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @request POST:/v1/auth/login
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<AuthEntity, any>({
        path: `/v1/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRegister
     * @request POST:/v1/auth/register
     */
    authControllerRegister: (data: RegisterDto, params: RequestParams = {}) =>
      this.request<AuthEntity, any>({
        path: `/v1/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetMe
     * @request GET:/v1/users/me
     * @secure
     */
    usersControllerGetMe: (params: RequestParams = {}) =>
      this.request<UserEntity, any>({
        path: `/v1/users/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUpdateMe
     * @request PATCH:/v1/users/me
     * @secure
     */
    usersControllerUpdateMe: (
      data: UpdateUserDto,
      params: RequestParams = {}
    ) =>
      this.request<UserEntity, any>({
        path: `/v1/users/me`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerFindOne
     * @request GET:/v1/users/{id}
     * @secure
     */
    usersControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<UserEntity, any>({
        path: `/v1/users/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUpdate
     * @request PATCH:/v1/users/{id}
     * @secure
     */
    usersControllerUpdate: (
      id: string,
      data: UpdateUserDto,
      params: RequestParams = {}
    ) =>
      this.request<UserEntity, any>({
        path: `/v1/users/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerRemove
     * @request DELETE:/v1/users/{id}
     * @secure
     */
    usersControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<UserEntity, any>({
        path: `/v1/users/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesControllerCreate
     * @request POST:/v1/categories
     * @secure
     */
    categoriesControllerCreate: (
      data: CreateCategoryDto,
      params: RequestParams = {}
    ) =>
      this.request<CategoryEntity, any>({
        path: `/v1/categories`,
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
     * @tags Categories
     * @name CategoriesControllerFindAll
     * @request GET:/v1/categories
     */
    categoriesControllerFindAll: (params: RequestParams = {}) =>
      this.request<CategoryEntity[], any>({
        path: `/v1/categories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesControllerFindOne
     * @request GET:/v1/categories/{id}
     */
    categoriesControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<CategoryEntity, any>({
        path: `/v1/categories/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesControllerUpdate
     * @request PATCH:/v1/categories/{id}
     * @secure
     */
    categoriesControllerUpdate: (
      id: string,
      data: UpdateCategoryDto,
      params: RequestParams = {}
    ) =>
      this.request<CategoryEntity, any>({
        path: `/v1/categories/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesControllerRemove
     * @request DELETE:/v1/categories/{id}
     * @secure
     */
    categoriesControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<CategoryEntity, any>({
        path: `/v1/categories/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerCreate
     * @request POST:/v1/products
     * @secure
     */
    productsControllerCreate: (
      data: CreateProductDto,
      params: RequestParams = {}
    ) =>
      this.request<ProductEntity, any>({
        path: `/v1/products`,
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
     * @tags Products
     * @name ProductsControllerFindAll
     * @request GET:/v1/products
     */
    productsControllerFindAll: (
      query: {
        /** @default 1 */
        page: number
        /** @default 20 */
        limit: number
        query?: string
        inStock?: boolean
        categoryId?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginationProductEntity, any>({
        path: `/v1/products`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerFindOne
     * @request GET:/v1/products/{id}
     */
    productsControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<ProductEntity, any>({
        path: `/v1/products/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerUpdate
     * @request PATCH:/v1/products/{id}
     * @secure
     */
    productsControllerUpdate: (
      id: string,
      data: UpdateProductDto,
      params: RequestParams = {}
    ) =>
      this.request<ProductEntity, any>({
        path: `/v1/products/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerRemove
     * @request DELETE:/v1/products/{id}
     * @secure
     */
    productsControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<ProductEntity, any>({
        path: `/v1/products/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Addresses
     * @name AddressesControllerCreate
     * @request POST:/v1/addresses
     * @secure
     */
    addressesControllerCreate: (
      data: CreateAddressDto,
      params: RequestParams = {}
    ) =>
      this.request<AddressEntity, any>({
        path: `/v1/addresses`,
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
     * @tags Addresses
     * @name AddressesControllerFindAll
     * @request GET:/v1/addresses
     * @secure
     */
    addressesControllerFindAll: (params: RequestParams = {}) =>
      this.request<AddressEntity[], any>({
        path: `/v1/addresses`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Addresses
     * @name AddressesControllerFindOne
     * @request GET:/v1/addresses/{id}
     * @secure
     */
    addressesControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<AddressEntity, any>({
        path: `/v1/addresses/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Addresses
     * @name AddressesControllerUpdate
     * @request PATCH:/v1/addresses/{id}
     * @secure
     */
    addressesControllerUpdate: (
      id: string,
      data: UpdateAddressDto,
      params: RequestParams = {}
    ) =>
      this.request<AddressEntity, any>({
        path: `/v1/addresses/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Addresses
     * @name AddressesControllerRemove
     * @request DELETE:/v1/addresses/{id}
     * @secure
     */
    addressesControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<AddressEntity, any>({
        path: `/v1/addresses/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cart
     * @name CartControllerAddItemToCart
     * @request POST:/v1/cart/add
     * @secure
     */
    cartControllerAddItemToCart: (
      data: AddItemToCartDto,
      params: RequestParams = {}
    ) =>
      this.request<CartItemEntity[], any>({
        path: `/v1/cart/add`,
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
     * @tags Cart
     * @name CartControllerRemoveItemFromCart
     * @request POST:/v1/cart/remove
     * @secure
     */
    cartControllerRemoveItemFromCart: (
      data: RemoveItemFromCartDto,
      params: RequestParams = {}
    ) =>
      this.request<CartItemEntity[], any>({
        path: `/v1/cart/remove`,
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
     * @tags Cart
     * @name CartControllerGetCart
     * @request GET:/v1/cart
     * @secure
     */
    cartControllerGetCart: (params: RequestParams = {}) =>
      this.request<CartItemEntity[], any>({
        path: `/v1/cart`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersControllerCheckout
     * @request POST:/v1/orders
     * @secure
     */
    ordersControllerCheckout: (
      data: CreateOrderDto,
      params: RequestParams = {}
    ) =>
      this.request<OrderEntity, any>({
        path: `/v1/orders`,
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
     * @tags Orders
     * @name OrdersControllerFindAll
     * @request GET:/v1/orders
     * @secure
     */
    ordersControllerFindAll: (params: RequestParams = {}) =>
      this.request<OrderEntity[], any>({
        path: `/v1/orders`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersControllerFindOne
     * @request GET:/v1/orders/{id}
     * @secure
     */
    ordersControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<OrderEntity, any>({
        path: `/v1/orders/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  }
}
