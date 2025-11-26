import React from 'react';
import { Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CategoryForm from '@/components/categories/CategoryForm/CategoryForm';

const CategoryCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // After creating a category, navigate back to products list for now
    navigate('/products');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box>
        <CategoryForm onSuccess={handleSuccess} />
      </Box>
    </Container>
  );
};

export default CategoryCreatePage;
