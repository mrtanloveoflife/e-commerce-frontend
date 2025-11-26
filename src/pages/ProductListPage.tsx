import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import ProductList from '@/components/products/ProductList/ProductList';

const ProductListPage: React.FC = () => {
  const navigate = useNavigate();

  const handleEdit = (productId: number) => {
    navigate(`/products/${productId}/edit`);
  };

  const handleCreateProduct = () => {
    navigate('/products/create');
  };

  const handleCreateCategory = () => {
    navigate('/categories/create');
  };

  return (
    <Container sx={{ py: 4 }}>
      <ProductList onEdit={handleEdit} onCreateProduct={handleCreateProduct} onCreateCategory={handleCreateCategory} />
    </Container>
  );
};

export default ProductListPage;
