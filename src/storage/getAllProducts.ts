import { api } from "../services/api";

export async function getAllProducts() {
  const id = "7f3227d7-be3f-47a6-81ab-ad742a546ade";
  try {
    const products = await api.get(`/products/${id}`);
    console.log(products, "<-- All products");
  } catch (error) {
    console.log(error);
  }
}
