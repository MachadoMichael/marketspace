import axios, { AxiosInstance } from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.106:3333",
}) as AxiosInstance;
