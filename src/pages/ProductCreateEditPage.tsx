import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import ProductForm from '@/components/products/ProductForm/ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail, resetCurrentProduct } from '@/store/slices/productsSlice';
import type { RootState } from '@/store';

const CreateEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const { currentProduct } = useSelector((state: RootState) => state.products);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(parseInt(id)) as any);
    } else {
      dispatch(resetCurrentProduct());
    }
  }, [id, dispatch]);

  const handleSuccess = () => {
    dispatch(resetCurrentProduct());
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <ProductForm
        product={currentProduct || undefined}
        onSuccess={handleSuccess}
      />
    </Container>
  );
};

export default CreateEditPage;
