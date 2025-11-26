import React, { useState } from 'react';
import { Box, TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { categoryService } from '@/services/categoryService';

interface CategoryFormProps {
  onSuccess?: (createdId?: number) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = { name, description };
      const res = await categoryService.createCategory(payload as any);
      onSuccess?.(res.data?.id);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Create Category
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Button type="submit" variant="contained" disabled={loading}>
              Create
            </Button>
            <Button variant="outlined" disabled={loading} onClick={() => { onSuccess?.()}}>
              Cancel
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
