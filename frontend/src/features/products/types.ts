export interface Product {
  _id?: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
}
