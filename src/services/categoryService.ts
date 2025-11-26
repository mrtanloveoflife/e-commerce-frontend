import axios from 'axios';
import type { Category } from '@/types/category';
import type { CreateCategoryRequest } from '@/types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7296';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 30000,
});

export const categoryService = {
  // Create a new category
  createCategory: (data: CreateCategoryRequest) =>
    apiClient.post<Category>('/categories', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
};
