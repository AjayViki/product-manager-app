import axios from "axios";
import type { Product, ProductResponse } from "./types";

const API = "http://localhost:5000/api/products";

export const fetchProductsAPI = async (
  page: number,
  category: string,
): Promise<ProductResponse> => {
  const params = {
    page,
    limit: 10,
    ...(category !== "All" && { category }),
  };

  const { data } = await axios.get(API, { params });
  return data;
};

export const createProductAPI = async (product: Product) => {
  return axios.post(API, product);
};

export const updateProductAPI = async (id: string, product: Product) => {
  return axios.put(`${API}/${id}`, product);
};

export const deleteProductAPI = async (id: string) => {
  return axios.delete(`${API}/${id}`);
};
