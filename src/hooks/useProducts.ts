import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setFilters, setPagination } from '@/store/slices/productsSlice';
import type { RootState } from '@/store';
import type { PaginationInfo, ProductFilters } from '@/types/state';

export const useProducts = () => {
  const dispatch = useDispatch();
  const { items, loading, error, filters, pagination } = useSelector((state: RootState) => state.products);

  const loadProducts = (newFilters?: Partial<ProductFilters>, newPagination?: Partial<PaginationInfo>) => {
    const filtersToUse = newFilters ? { ...filters, ...newFilters } : filters;
    const paginationToUse = newPagination ? { ...pagination, ...newPagination } : pagination;
    dispatch(setFilters(filtersToUse));
    dispatch(setPagination(paginationToUse));
    dispatch(fetchProducts({filters: filtersToUse, pagination: paginationToUse}) as any);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products: items,
    loading,
    error,
    filters,
    pagination,
    refetch: loadProducts,
  };
};