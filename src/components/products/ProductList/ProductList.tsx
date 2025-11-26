import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Pagination,
  Skeleton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useProducts } from "../../../hooks/useProducts";
import { useDispatch } from "react-redux";
import { deleteProduct } from "@/store/slices/productsSlice";

interface ProductListProps {
  onEdit?: (productId: number) => void;
  onCreateProduct?: () => void;
  onCreateCategory?: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ onEdit, onCreateProduct: onCreateNew, onCreateCategory }) => {
  const { products, loading, error, filters, pagination, refetch } =
    useProducts();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const handleSearch = () => {
    refetch({ ...filters, searchTerm}, { ...pagination});
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, pageNumber: number) => {
    refetch({ ...filters}, { ...pagination, pageNumber: pageNumber});
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = async () => {
    if (deleteConfirm !== null) {
      await dispatch(deleteProduct(deleteConfirm) as any);
      setDeleteConfirm(null);
      refetch(filters, pagination);
    }
  };

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography color="error">Error loading products: {error}</Typography>
        <Button onClick={() => refetch()} variant="contained" sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">
          Products
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={onCreateNew}>
            Create Product
          </Button>
          <Button variant="outlined" onClick={() => onCreateCategory?.()}>
            Create Category
          </Button>
        </Box>
      </Box>

      {/* Search Box */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <Button variant="outlined" onClick={handleSearch} disabled={loading}>
          Search
        </Button>
      </Box>

      {/* Products Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 3,
          mb: 4,
        }}
      >
        {loading ? (
          Array.from(new Array(8)).map((_, index) => (
            <Card key={index}>
              <Skeleton variant="rectangular" height={200} />
              <CardContent>
                <Skeleton height={24} sx={{ mb: 1 }} />
                <Skeleton height={20} width="60%" />
              </CardContent>
            </Card>
          ))
        ) : products.length === 0 ? (
          <Box sx={{ gridColumn: "1 / -1", textAlign: "center", py: 4 }}>
            <Typography color="textSecondary">No products found</Typography>
          </Box>
        ) : (
          products.map((product: any) => (
            <Card
              key={product.id}
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              {product.imageBase64 ? (
                <CardMedia
                  component="img"
                  height="200"
                  image={`data:image/jpeg;base64,${product.imageBase64}`}
                  alt={product.name}
                />
              ) : (
                <Box
                  sx={{
                    height: 200,
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#999",
                  }}
                >
                  No Image
                </Box>
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 2, minHeight: "2.5em" }}
                >
                  {product.description?.substring(0, 80)}
                  {product.description?.length &&
                  product.description.length > 80
                    ? "..."
                    : ""}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${product.basePrice.toFixed(2)}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", gap: 1, p: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => onEdit?.(product.id)}
                  sx={{ flex: 1 }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(product.id)}
                  sx={{ flex: 1 }}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          ))
        )}
      </Box>

      {/* Pagination */}
      {!loading && products.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={pagination.totalPages}
            page={pagination.pageNumber}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
      >
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
