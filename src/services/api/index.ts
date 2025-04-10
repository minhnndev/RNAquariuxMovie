import {API_ACCESS_TOKEN, API_URL} from '../../utils/constants/APIConstants';
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import qs from 'query-string';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'Application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
  },
  paramsSerializer: params => qs.stringify(params),
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('🚀 ~ response:', response);
    return response;
  },
  (error: AxiosError) => {
    console.log('[Axios Error]:', error);
    return Promise.reject(error);
  },
);
