// Request types for creating/updating products
export interface CreateProductRequest {
    name: string;
    description: string;
    basePrice: number;
    categoryId: number;
    image?: File;
}

export interface UpdateProductRequest {
    id: number;
    name: string;
    description: string;
    basePrice: number;
    categoryId: number;
    image?: File;
}

export interface GetProductsRequest {
    searchTerm?: string;
    pageNumber?: number;
    pageSize?: number;
}

export interface CreateCategoryRequest {
    name: string;
    description?: string;
}

// Response types
export interface PagedList<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
}