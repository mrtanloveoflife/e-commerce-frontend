import axios from 'axios';
import type { Product, ProductDetail } from '@/types/product';
import type { CreateProductRequest, UpdateProductRequest, GetProductsRequest, PagedList } from '@/types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7296';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 30000,
});

export const productService = {
  // Get paginated list of products with search
  getProducts: (params?: GetProductsRequest) =>
    apiClient.get<PagedList<Product>>('/products', {
      params: {
        searchTerm: params?.searchTerm || '',
        pageNumber: params?.pageNumber || 1,
        pageSize: params?.pageSize || 10,
      },
    }),

  // Get single product with details and image
  getProduct: (id: number) =>
    apiClient.get<ProductDetail>(`/products/${id}`),

  // Create product with image (multipart/form-data)
  createProduct: (data: CreateProductRequest) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('basePrice', data.basePrice.toString());
    formData.append('categoryId', data.categoryId.toString());
    if (data.image) {
      formData.append('image', data.image);
    }

    return apiClient.post<ProductDetail>('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Update product with image (multipart/form-data)
  updateProduct: (id: number, data: UpdateProductRequest) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('basePrice', data.basePrice.toString());
    formData.append('categoryId', data.categoryId.toString());
    if (data.image) {
      formData.append('image', data.image);
    }

    return apiClient.put<ProductDetail>(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Delete product (soft delete - sets IsActive to false)
  deleteProduct: (id: number) =>
    apiClient.delete(`/products/${id}`),
};