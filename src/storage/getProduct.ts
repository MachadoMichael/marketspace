import { api } from "../services/api";

 export async function getProduct(name: string) {
  const product = await api.get(`/product/${name}`);
  console.log(product, "<-- product");
//   return product
}
