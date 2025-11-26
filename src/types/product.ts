import type { Category } from "./category";

export interface Product {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  categoryId: number;
  imageBase64?: string | null;
}

export interface ProductDetail extends Product {
  createdAt: string;
  updatedAt: string;
  category: Category | null;
}