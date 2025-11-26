import type { Product, ProductDetail } from "./product";

// Product state
export interface ProductState {
  items: Product[];
  currentProduct: ProductDetail | null;
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
  pagination: PaginationInfo;
}

export interface ProductFilters {
  searchTerm?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface PaginationInfo {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}