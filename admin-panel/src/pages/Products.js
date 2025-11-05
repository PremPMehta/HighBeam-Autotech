import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import ImageUpload from '../components/ImageUpload';

const Products = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    image: '',
    price: '',
    description: '',
    servicePoints: ['', '', '', '', '', ''],
    timeTaken: '',
    category: '',
    warranty: '',
    isActive: true,
    displayOrder: 0,
  });

  const queryClient = useQueryClient();

  // Fetch categories for dropdown
  const { data: categoriesData } = useQuery(
    'categories',
    async () => {
      try {
        const response = await axios.get('/api/categories', {
          timeout: 10000,
        });
        console.log('Categories API response:', response.data);
        const categories = response.data?.data?.categories || response.data?.categories || [];
        return categories;
      } catch (error) {
        console.error('Error fetching categories:', error);
        console.error('Error response:', error.response);
        // Don't show error toast for categories dropdown, just log it
        return [];
      }
    },
    {
      retry: 1,
      staleTime: 60000,
    }
  );

  // Fetch products
  const { data, isLoading, error } = useQuery(
    'products',
    async () => {
      try {
        const response = await axios.get('/api/products', {
          timeout: 10000, // Increased timeout
        });
        console.log('Products API full response:', response);
        console.log('Products API response data:', response.data);

        // Handle different response formats
        let products = [];
        if (response.data?.data?.products) {
          products = response.data.data.products;
        } else if (response.data?.products) {
          products = response.data.products;
        } else if (Array.isArray(response.data)) {
          products = response.data;
        }

        console.log('Products extracted:', products);
        console.log('Number of products:', products.length);

        if (products.length === 0) {
          console.log('No products found in database');
        }

        return products;
      } catch (error) {
        console.error('Error fetching products:', error);
        console.error('Error response:', error.response);
        console.error('Error status:', error.response?.status);
        console.error('Error data:', error.response?.data);

        // Re-throw error so react-query can handle it properly
        const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
        const status = error.response?.status;

        if (status === 401) {
          toast.error('Authentication failed. Please log in again.');
        } else if (status === 403) {
          toast.error('You do not have permission to view products.');
        } else if (error.code === 'ECONNABORTED') {
          toast.error('Request timed out. Please check your connection.');
        } else {
          toast.error('Failed to load products: ' + errorMsg);
        }

        throw error; // Re-throw to let react-query handle the error state
      }
    },
    {
      retry: 1,
      staleTime: 60000,
    }
  );

  // Create/Update mutation
  const saveMutation = useMutation(
    async (data) => {
      const payload = {
        ...data,
        price: parseFloat(data.price),
        displayOrder: parseInt(data.displayOrder) || 0,
      };

      if (selectedProduct) {
        const response = await axios.put(`/api/products/${selectedProduct._id}`, payload, {
          timeout: 10000,
        });
        return response.data;
      } else {
        const response = await axios.post('/api/products', payload, {
          timeout: 10000,
        });
        return response.data;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
        toast.success(selectedProduct ? 'Product updated successfully!' : 'Product created successfully!');
        handleCloseDialog();
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to save product';
        toast.error(errorMessage);
      },
    }
  );

  // Delete mutation
  const deleteMutation = useMutation(
    async (id) => {
      const response = await axios.delete(`/api/products/${id}`, {
        timeout: 10000,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
        toast.success('Product deleted successfully!');
        handleCloseDeleteDialog();
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete product';
        toast.error(errorMessage);
      },
    }
  );

  const handleOpenDialog = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setFormData({
        name: product.name || '',
        title: product.title || '',
        image: product.image || '',
        price: product.price?.toString() || '',
        description: product.description || '',
        servicePoints: product.servicePoints && product.servicePoints.length === 6
          ? [...product.servicePoints]
          : ['', '', '', '', '', ''],
        timeTaken: product.timeTaken || '',
        category: product.category?._id || product.category || '',
        warranty: product.warranty || '',
        isActive: product.isActive !== undefined ? product.isActive : true,
        displayOrder: product.displayOrder || 0,
      });
    } else {
      setSelectedProduct(null);
      setFormData({
        name: '',
        title: '',
        image: '',
        price: '',
        description: '',
        servicePoints: ['', '', '', '', '', ''],
        timeTaken: '',
        category: '',
        warranty: '',
        isActive: true,
        displayOrder: 0,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
    setFormData({
      name: '',
      title: '',
      image: '',
      price: '',
      description: '',
      servicePoints: ['', '', '', '', '', ''],
      timeTaken: '',
      category: '',
      warranty: '',
      isActive: true,
      displayOrder: 0,
    });
  };

  const handleOpenDeleteDialog = (product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleServicePointChange = (index, value) => {
    const newServicePoints = [...formData.servicePoints];
    newServicePoints[index] = value;
    setFormData({ ...formData, servicePoints: newServicePoints });
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast.error('Product name is required');
      return;
    }
    if (!formData.title.trim()) {
      toast.error('Product title is required');
      return;
    }
    if (!formData.image) {
      toast.error('Product image is required');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error('Valid price is required');
      return;
    }
    if (!formData.category) {
      toast.error('Category is required');
      return;
    }
    if (formData.servicePoints.some(point => !point.trim())) {
      toast.error('All 6 service points are required');
      return;
    }
    if (!formData.timeTaken.trim()) {
      toast.error('Time taken is required');
      return;
    }
    saveMutation.mutate(formData);
  };

  const handleDelete = () => {
    if (selectedProduct) {
      deleteMutation.mutate(selectedProduct._id);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Products</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ backgroundColor: '#ffca00', color: '#000', '&:hover': { backgroundColor: '#e6b800' }, boxShadow: 'none', borderRadius: '8px', paddingBlock: '10px', paddingInline: '16px' }}
        >
          Add Product
        </Button>
      </Box>
      <Box sx={{
        borderRadius: '15px',
        overflow: 'hidden',
      }}>
        <Box sx={{ overflow: "auto" }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <TableContainer component={Paper} className="card" sx={{ overflowX: 'auto', }}>
              <Table sx={{ minWidth: 650 }} aria-label="users table">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Time Taken</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {error ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="error" gutterBottom>
                          Error loading products
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {error.response?.data?.message || error.message || 'An unknown error occurred'}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => queryClient.refetchQueries('products')}
                          sx={{ mt: 2 }}
                        >
                          Retry
                        </Button>
                      </TableCell>
                    </TableRow>
                  ) : !data || data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                          No products found
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Click "Add Product" to create your first product
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>
                          {product.image ? (
                            <img
                              src={product.image.startsWith('http') ? product.image : `http://localhost:5001${product.image}`}
                              alt={product.name}
                              style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                            />
                          ) : (
                            <Box
                              sx={{
                                width: 50,
                                height: 50,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'grey.200',
                                borderRadius: 1,
                              }}
                            >
                              <ImageIcon color="disabled" />
                            </Box>
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {product.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {product.title}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {product.category?.name || 'N/A'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            ₹{product.price?.toLocaleString('en-IN')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {product.timeTaken}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={product.isActive ? 'Active' : 'Inactive'}
                            color={product.isActive ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog(product)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDeleteDialog(product)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ borderBottom: '1px solid #e0e0e0', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>{selectedProduct ? 'Edit Product' : 'Add Product'}
          <IconButton
            onClick={handleCloseDialog}
            className="ml-auto text-gray-400 hover:text-gray-200"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <ImageUpload
                label="Product Image"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Price (₹)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  label="Category"
                >
                  {categoriesData?.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Time Taken"
                value={formData.timeTaken}
                onChange={(e) => setFormData({ ...formData, timeTaken: e.target.value })}
                placeholder="e.g., 4 Hrs Taken"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="One Line Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g., 1000 Kms or 1 Month Warranty • Every 5000 Kms or 3 Months (Recommended)"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Warranty"
                value={formData.warranty}
                onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                placeholder="e.g., 1000 Kms or 1 Month Warranty"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>
                Service Points (6 required)
              </Typography>

              {/* Wrap fields in a Grid container */}
              <Grid container spacing={2}>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <TextField
                      fullWidth
                      size="small"
                      label={`Service Point ${index + 1}`}
                      value={formData.servicePoints[index] || ""}
                      onChange={(e) => handleServicePointChange(index, e.target.value)}
                      required
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={10} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                type="number"
                label="Display Order"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
              />
            </Grid>
            <Grid item xs={2} sx={{ mt: 2 }}>
              <Box display="flex" alignItems="center" height="100%">
                <Chip
                  label={formData.isActive ? 'Active' : 'Inactive'}
                  color={formData.isActive ? 'success' : 'default'}
                  onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                  sx={{ cursor: 'pointer', width: '100%', height: '100%', borderRadius: '5px', fontSize: '14px' }}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid #e0e0e0', padding: '16px' }}>
          <Button onClick={handleCloseDialog} sx={{ backgroundColor: '#f5f5f5', color: '#000', '&:hover': { backgroundColor: '#e0e0e0' }, boxShadow: 'none', borderRadius: '8px', paddingBlock: '10px', paddingInline: '16px' }}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={saveMutation.isLoading}
            sx={{ backgroundColor: '#ffca00', color: '#000', '&:hover': { backgroundColor: '#e6b800' }, boxShadow: 'none', borderRadius: '8px', paddingBlock: '10px', paddingInline: '16px' }}
          >
            {saveMutation.isLoading ? 'Saving...' : selectedProduct ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            disabled={deleteMutation.isLoading}
          >
            {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products;

