import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  CircularProgress,
  IconButton,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import axios from 'axios';
import toast from 'react-hot-toast';

const ImageUpload = ({ value, onChange, label = 'Image', showPreview = true }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Get the uploaded image URL - backend returns relative path, prepend backend URL
      const uploadedPath = response.data.data.url;
      const imageUrl = uploadedPath.startsWith('http')
        ? uploadedPath
        : `http://localhost:5001${uploadedPath}`;
      setPreview(imageUrl);
      onChange(imageUrl);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload image');
      setPreview(value || null); // Revert to previous value
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Update preview when value changes
  useEffect(() => {
    if (value) {
      setPreview(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  return (
    <Box>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {showPreview && preview && (
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            mb: 2,
            position: 'relative',
            display: 'inline-block',
            width: '100%',
          }}
        >
          <Box
            component="img"
            src={preview}
            alt="Preview"
            sx={{
              maxWidth: '100%',
              maxHeight: '300px',
              display: 'block',
              borderRadius: 1,
              margin: '0 auto',
            }}
            onError={() => {
              // If image fails to load, show placeholder
              console.error('Failed to load image:', preview);
            }}
          />
          <IconButton
            size="small"
            onClick={handleRemoveImage}
            sx={{
              position: 'absolute',
              top: 14,
              right: 8,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Paper>
      )}

      <Button
        variant="outlined"
        component="label"
        startIcon={uploading ? <CircularProgress size={16} /> : <CloudUploadIcon />}
        disabled={uploading}
        onClick={() => fileInputRef.current?.click()}
        fullWidth
        sx={{ backgroundColor: '#f5f5f5', borderColor: '#e0e0e0', borderRadius: '5px', color: '#000' , padding: '30px', '&:hover': { backgroundColor: '#f5f5f5', borderColor: '#e0e0e0'} }}
      >
        {uploading ? 'Uploading...' : preview ? 'Change Image' : 'Upload Image'}
      </Button>
    </Box>
  );
};

export default ImageUpload;

