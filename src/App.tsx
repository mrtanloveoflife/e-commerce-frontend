import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LinearProgress, Box } from '@mui/material';

const ProductListPage = lazy(() => import('./pages/ProductListPage'));
const CreateEditPage = lazy(() => import('./pages/ProductCreateEditPage'));
const CategoryCreatePage = lazy(() => import('./pages/CategoryCreatePage'));

const App: React.FC = () => {
  return (
    <Router>
      <Box className="App" sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <main>
          <Suspense fallback={<LinearProgress />}>
            <Routes>
              <Route path="/" element={<ProductListPage />} />
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/products/create" element={<CreateEditPage />} />
              <Route path="/products/:id/edit" element={<CreateEditPage />} />
              <Route path="/categories/create" element={<CategoryCreatePage />} />
            </Routes>
          </Suspense>
        </main>
      </Box>
    </Router>
  );
};

export default App;