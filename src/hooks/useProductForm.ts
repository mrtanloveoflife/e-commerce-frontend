import { useForm } from 'react-hook-form';
import { productService } from '@/services/productService';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import type { CreateProductRequest, UpdateProductRequest } from '@/types/api';
import type { ProductDetail } from '@/types/product';

const productSchema = yup.object({
  name: yup.string().required('Product name is required').max(100, 'Name must be less than 100 characters'),
  description: yup.string().max(1000, 'Description must be less than 1000 characters').nullable(),
  basePrice: yup.number().required('Price is required').positive('Price must be positive'),
  categoryId: yup.number().required('Category is required').positive('Category must be valid'),
});

export const useProductForm = (existingProduct?: ProductDetail, onSuccess?: () => void) => {
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const methods = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: existingProduct
      ? {
          name: existingProduct.name,
          description: existingProduct.description,
          basePrice: existingProduct.basePrice,
          categoryId: existingProduct.categoryId,
        }
      : {
          name: '',
          description: '',
          basePrice: 0,
          categoryId: 0,
        },
  });

  // If the existing product is loaded after initialization, reset the form values
  useEffect(() => {
    if (existingProduct) {
      methods.reset({
        name: existingProduct.name,
        description: existingProduct.description,
        basePrice: existingProduct.basePrice,
        categoryId: existingProduct.categoryId,
      });
    }
  }, [existingProduct]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const requestData: CreateProductRequest | UpdateProductRequest = {
        ...data,
        basePrice: parseFloat(data.basePrice),
        categoryId: parseInt(data.categoryId),
        ...(selectedFile && { image: selectedFile }),
      };

      if (existingProduct) {
        const updateData = requestData as UpdateProductRequest;
        updateData.id = existingProduct.id;
        await productService.updateProduct(existingProduct.id, updateData);
      } else {
        await productService.createProduct(requestData as CreateProductRequest);
      }
      onSuccess?.();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.errors?.[Object.keys(error.response.data.errors)[0]]?.[0] ||
        error.response?.data?.message ||
        'Failed to save product';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    methods,
    onSubmit,
    isSubmitting,
    submitError,
    selectedFile,
    setSelectedFile,
  };
};