import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';
import { useProductForm } from '../../../hooks/useProductForm';
import type { ProductDetail } from '@/types/product';

interface ProductFormProps {
  product?: ProductDetail;
  categories?: Array<{ id: number; name: string }>;
  onSuccess?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSuccess }) => {
  const { methods, onSubmit, isSubmitting, submitError, selectedFile, setSelectedFile } =
    useProductForm(product, onSuccess);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [previewImage, setPreviewImage] = useState<string | null>(
    product?.imageBase64 ? `data:image/jpeg;base64,${product.imageBase64}` : null
  );
  
  useEffect(() => {
    setPreviewImage(product?.imageBase64 ? `data:image/jpeg;base64,${product.imageBase64}` : null);
  }, [product, selectedFile]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
        {product ? 'Edit Product' : 'Create Product'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {submitError && <Alert severity="error">{submitError}</Alert>}

        <TextField
          fullWidth
          label="Product Name"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          disabled={isSubmitting}
          sx={{ pb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
          disabled={isSubmitting}
          sx={{ pb: 2 }}
        />

        <TextField
          fullWidth
          type="number"
          label="Base Price"
          {...register('basePrice')}
          error={!!errors.basePrice}
          helperText={errors.basePrice?.message}
          disabled={isSubmitting}
          slotProps={{ htmlInput: {step: '0.01', min: '0'} }}
          sx={{ pb: 2 }}
        />

        <TextField
          fullWidth
          type="number"
          label="Category ID"
          {...register('categoryId')}
          error={!!errors.categoryId}
          helperText={errors.categoryId?.message}
          disabled={isSubmitting}
          sx={{ pb: 2 }}
        />

        {/* Image Upload */}
        <Box sx={{ border: '2px dashed #ccc', p: 2, borderRadius: 1, textAlign: 'center' }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={isSubmitting}
            style={{ display: 'none' }}
            id="image-input"
          />
          <label htmlFor="image-input" style={{ cursor: 'pointer', display: 'block' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Typography variant="h4" sx={{ color: '#999' }}>📷</Typography>
              <Typography variant="body2" color="textSecondary">
                Click to upload image
              </Typography>
              {selectedFile && <Typography variant="caption">{selectedFile.name}</Typography>}
            </Box>
          </label>
        </Box>

        {previewImage && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <img
              src={previewImage}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: 4 }}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {product ? 'Update' : 'Create'}
          </Button>

          <Button type="button" variant="outlined" onClick={onSuccess} disabled={isSubmitting}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductForm;