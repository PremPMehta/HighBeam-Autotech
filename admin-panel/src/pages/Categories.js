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

const Categories = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    icon: '',
    description: '',
    isActive: true,
    displayOrder: 0,
  });

  const queryClient = useQueryClient();

  // Fetch categories
  const { data, isLoading, error } = useQuery(
    'categories',
    async () => {
      try {
        const response = await axios.get('/api/categories', {
          timeout: 10000, // Increased timeout
        });
        console.log('Categories API full response:', response);
        console.log('Categories API response data:', response.data);

        // Handle different response formats
        let categories = [];
        if (response.data?.data?.categories) {
          categories = response.data.data.categories;
        } else if (response.data?.categories) {
          categories = response.data.categories;
        } else if (Array.isArray(response.data)) {
          categories = response.data;
        }

        console.log('Categories extracted:', categories);
        console.log('Number of categories:', categories.length);

        if (categories.length === 0) {
          console.log('No categories found in database');
        }

        return categories;
      } catch (error) {
        console.error('Error fetching categories:', error);
        console.error('Error response:', error.response);
        console.error('Error status:', error.response?.status);
        console.error('Error data:', error.response?.data);

        // Re-throw error so react-query can handle it properly
        const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
        const status = error.response?.status;

        if (status === 401) {
          toast.error('Authentication failed. Please log in again.');
        } else if (status === 403) {
          toast.error('You do not have permission to view categories.');
        } else if (error.code === 'ECONNABORTED') {
          toast.error('Request timed out. Please check your connection.');
        } else {
          toast.error('Failed to load categories: ' + errorMsg);
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
      console.log('Saving category:', data);
      try {
        let response;
        if (selectedCategory) {
          console.log('Updating category:', selectedCategory._id);
          response = await axios.put(`/api/categories/${selectedCategory._id}`, data, {
            timeout: 10000,
          });
        } else {
          console.log('Creating new category');
          response = await axios.post('/api/categories', data, {
            timeout: 10000,
          });
        }
        console.log('Category save response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error saving category:', error);
        console.error('Error response:', error.response);
        throw error; // Re-throw to let onError handle it
      }
    },
    {
      onSuccess: (response) => {
        console.log('Category saved successfully:', response);
        queryClient.invalidateQueries('categories');
        toast.success(selectedCategory ? 'Category updated successfully!' : 'Category created successfully!');
        handleCloseDialog();
      },
      onError: (error) => {
        console.error('Save mutation error:', error);
        let errorMessage = 'Failed to save category';

        if (error.response) {
          const status = error.response.status;
          const data = error.response.data;

          if (status === 401) {
            errorMessage = 'Authentication failed. Please log in again.';
          } else if (status === 403) {
            errorMessage = 'You do not have permission to save categories.';
          } else if (status === 400 && data?.errors) {
            // Validation errors
            errorMessage = data.errors.join(', ');
          } else if (data?.message) {
            errorMessage = data.message;
          }
        } else if (error.message) {
          errorMessage = error.message;
        }

        toast.error(errorMessage);
      },
    }
  );

  // Delete mutation
  const deleteMutation = useMutation(
    async (id) => {
      const response = await axios.delete(`/api/categories/${id}`, {
        timeout: 10000,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
        toast.success('Category deleted successfully!');
        handleCloseDeleteDialog();
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete category';
        toast.error(errorMessage);
      },
    }
  );

  const handleOpenDialog = (category = null) => {
    if (category) {
      setSelectedCategory(category);
      setFormData({
        name: category.name || '',
        image: category.image || '',
        icon: category.icon || '',
        description: category.description || '',
        isActive: category.isActive !== undefined ? category.isActive : true,
        displayOrder: category.displayOrder || 0,
      });
    } else {
      setSelectedCategory(null);
      setFormData({
        name: '',
        image: '',
        icon: '',
        description: '',
        isActive: true,
        displayOrder: 0,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCategory(null);
    setFormData({
      name: '',
      image: '',
      icon: '',
      description: '',
      isActive: true,
      displayOrder: 0,
    });
  };

  const handleOpenDeleteDialog = (category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedCategory(null);
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    if (!formData.icon || !formData.icon.trim()) {
      toast.error('Icon is required. Please upload an icon.');
      return;
    }
    saveMutation.mutate(formData);
  };

  const handleDelete = () => {
    if (selectedCategory) {
      deleteMutation.mutate(selectedCategory._id);
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
        <Typography variant="h5">Categories</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ backgroundColor: '#ffca00', color: '#000', '&:hover': { backgroundColor: '#e6b800' }, boxShadow: 'none', borderRadius: '8px', paddingBlock: '10px', paddingInline: '16px' }}
        >
          Add Category
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
                    <TableCell>Icon</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Display Order</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {error ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="error" gutterBottom>
                          Error loading categories
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {error.response?.data?.message || error.message || 'An unknown error occurred'}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => queryClient.refetchQueries('categories')}
                          sx={{ mt: 2 }}
                        >
                          Retry
                        </Button>
                      </TableCell>
                    </TableRow>
                  ) : !data || data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                          No categories found
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Click "Add Category" to create your first category
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((category) => (
                      <TableRow key={category._id}>
                        <TableCell>
                          {category.image ? (
                            <img
                              src={category.image.startsWith('http') ? category.image : `http://localhost:5001${category.image}`}
                              alt={category.name}
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
                            {category.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {category.icon && (category.icon.startsWith('http') || category.icon.startsWith('/')) ? (
                            <img
                              src={category.icon.startsWith('http') ? category.icon : `http://localhost:5001${category.icon}`}
                              alt={category.name}
                              style={{ width: 40, height: 40, objectFit: 'contain' }}
                            />
                          ) : category.icon ? (
                            <Chip
                              label={category.icon}
                              size="small"
                              variant="outlined"
                              color="warning"
                              sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}
                            />
                          ) : (
                            <Typography variant="caption" color="text.secondary">
                              No icon
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {category.description || 'N/A'}
                          </Typography>
                        </TableCell>
                        <TableCell>{category.displayOrder}</TableCell>
                        <TableCell>
                          <Chip
                            label={category.isActive ? 'Active' : 'Inactive'}
                            color={category.isActive ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog(category)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDeleteDialog(category)}
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
        <DialogTitle sx={{ borderBottom: '1px solid #e0e0e0', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>{selectedCategory ? 'Edit Category' : 'Add Category'}
          <IconButton
            onClick={handleCloseDialog}
            className="ml-auto text-gray-400 hover:text-gray-200"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <ImageUpload
                label="Category Image"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" gutterBottom sx={{ fontWeight: 'medium', mb: 1 }}>
                Icon <span style={{ color: 'red' }}>*</span>
              </Typography>
              {formData.icon && (formData.icon.startsWith('http') || formData.icon.startsWith('/')) ? (
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      display: 'inline-block',
                      border: '1px solid #e0e0e0',
                      borderRadius: 1,
                      p: 1,
                      bgcolor: 'grey.50',
                    }}
                  >
                    <img
                      src={formData.icon.startsWith('http') ? formData.icon : `http://localhost:5001${formData.icon}`}
                      alt="Category icon"
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => setFormData({ ...formData, icon: '' })}
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        bgcolor: 'error.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'error.dark',
                        },
                      }}
                      title="Remove icon"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ) : formData.icon ? (
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={`Current: ${formData.icon} (React Icon - upload image to replace)`}
                    size="small"
                    variant="outlined"
                    color="warning"
                    sx={{ fontFamily: 'monospace', fontSize: '0.75rem', mb: 1 }}
                  />
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => setFormData({ ...formData, icon: '' })}
                    sx={{ ml: 1 }}
                  >
                    Remove
                  </Button>
                </Box>
              ) : (
                <Typography variant="caption" color="error" sx={{ mb: 1, display: 'block' }}>
                  Icon is required
                </Typography>
              )}
              <ImageUpload
                label={formData.icon ? "Change Icon" : "Upload Icon"}
                value={formData.icon}
                onChange={(url) => setFormData({ ...formData, icon: url })}
                showPreview={false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                type="number"
                label="Display Order"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
              />
            </Grid>
            <Grid item xs={2}>
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
            {saveMutation.isLoading ? 'Saving...' : selectedCategory ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{selectedCategory?.name}"? This action cannot be undone.
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

export default Categories;

