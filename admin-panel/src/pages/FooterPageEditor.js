import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const FooterPageEditor = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [footerData, setFooterData] = useState(null);

  // Default footer content
  const defaultFooterContent = {
    aboutUs: {
      title: 'About Us',
      description: 'High Beam Auto Tech Private Limited is a testament to the relentless pursuit of excellence in the automotive industry.',
    },
    saleHours: {
      title: 'Sale Hours',
      mondayFriday: '09:00 AM – 09:00 PM',
      saturday: '09:00 AM – 07:00 PM',
      sunday: 'Closed',
    },
    brands: {
      title: 'Our Brands',
      brandsList: 'Audi, BMW, Honda, Hyundai, KIA, Mahindra, Maruti Suzuki, Mercedes-Benz, MG, Nissan, Skoda, Tata, Toyota, Volkswagen',
    },
    copyright: '© 2025 𝗛𝗶𝗴𝗵 𝗕𝗲𝗮𝗺 𝗔𝘂𝘁𝗼 𝗧𝗲𝗰𝗵 𝗣𝘃𝘁.𝗹𝘁𝗱.',
  };

  // Load footer data
  const { data: fetchedPage, isLoading } = useQuery(
    ['page', pageId],
    async () => {
      try {
        const response = await axios.get(`/api/pages/${pageId}`);
        return response.data.data.page;
      } catch (error) {
        return null;
      }
    }
  );

  useEffect(() => {
    if (fetchedPage && fetchedPage.sections) {
      const footerObj = {};
      fetchedPage.sections.forEach(section => {
        footerObj[section.sectionId] = section.content;
      });
      setFooterData({ ...defaultFooterContent, ...footerObj });
    } else {
      setFooterData(defaultFooterContent);
    }
  }, [fetchedPage]);

  // Save mutation
  const saveMutation = useMutation(
    async (data) => {
      const sections = Object.keys(data).map((key, index) => ({
        sectionId: key,
        sectionType: 'footer',
        content: data[key],
        order: index,
      }));

      const pagePayload = {
        pageId: 'footer',
        pageName: 'Footer',
        sections,
        isActive: true,
      };

      if (fetchedPage) {
        const response = await axios.put(`/api/pages/footer`, pagePayload, {
          timeout: 10000, // 10 second timeout
        });
        return response.data;
      } else {
        const response = await axios.post('/api/pages', pagePayload, {
          timeout: 10000, // 10 second timeout
        });
        return response.data;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['page', pageId]);
        queryClient.invalidateQueries('pages');
        toast.success('Footer saved successfully!');
      },
      onError: (error) => {
        console.error('Save footer error:', error);
        const errorMessage = error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Failed to save footer';
        toast.error(errorMessage);
      },
    }
  );

  const handleSave = () => {
    saveMutation.mutate(footerData);
  };

  if (isLoading || !footerData) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <AppBar position="static" color="default" elevation={1} sx={{
        padding: { xs: '10px', md: '0' },
        backgroundColor: '#fff',
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0',
      }}>
        <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: '10px', flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton edge="start" color="inherit" onClick={() => navigate('/content')}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Editing: Footer (Appears on all pages)
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={saveMutation.isLoading}
            sx={{ backgroundColor: '#ffca00', color: '#000', '&:hover': { backgroundColor: '#e6b800' }, boxShadow: 'none', borderRadius: '8px', paddingBlock: '10px', paddingInline: '16px' }}
          >
            {saveMutation.isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Footer Content Management
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
            Footer content appears on all pages of the website. Changes here will affect the entire site.
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3} justifyContent="center">
            {/* About Us Section */}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  About Us Section
                </Typography>
                <TextField
                  fullWidth
                  label="Title"
                  value={footerData.aboutUs?.title || ''}
                  onChange={(e) => {
                    setFooterData({
                      ...footerData,
                      aboutUs: { ...footerData.aboutUs, title: e.target.value },
                    });
                  }}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={footerData.aboutUs?.description || ''}
                  onChange={(e) => {
                    setFooterData({
                      ...footerData,
                      aboutUs: { ...footerData.aboutUs, description: e.target.value },
                    });
                  }}
                />
              </Paper>
            </Grid>

            {/* Sale Hours Section */}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Sale Hours Section
                </Typography>

                {/* 🔹 Wrap all fields in Grid container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Section Title"
                      value={footerData.saleHours?.title || ""}
                      onChange={(e) => {
                        setFooterData({
                          ...footerData,
                          saleHours: { ...footerData.saleHours, title: e.target.value },
                        });
                      }}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Monday - Friday"
                      value={footerData.saleHours?.mondayFriday || ""}
                      onChange={(e) => {
                        setFooterData({
                          ...footerData,
                          saleHours: { ...footerData.saleHours, mondayFriday: e.target.value },
                        });
                      }}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Saturday"
                      value={footerData.saleHours?.saturday || ""}
                      onChange={(e) => {
                        setFooterData({
                          ...footerData,
                          saleHours: { ...footerData.saleHours, saturday: e.target.value },
                        });
                      }}
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Sunday"
                      value={footerData.saleHours?.sunday || ""}
                      onChange={(e) => {
                        setFooterData({
                          ...footerData,
                          saleHours: { ...footerData.saleHours, sunday: e.target.value },
                        });
                      }}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>


            {/* Brands Section */}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Brands Section
                </Typography>
                <TextField
                  fullWidth
                  label="Section Title"
                  value={footerData.brands?.title || ''}
                  onChange={(e) => {
                    setFooterData({
                      ...footerData,
                      brands: { ...footerData.brands, title: e.target.value },
                    });
                  }}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Brands List (comma separated)"
                  value={footerData.brands?.brandsList || ''}
                  onChange={(e) => {
                    setFooterData({
                      ...footerData,
                      brands: { ...footerData.brands, brandsList: e.target.value },
                    });
                  }}
                  helperText="Enter brand names separated by commas"
                />
              </Paper>
            </Grid>

            {/* Copyright Section */}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Copyright Section
                </Typography>
                <TextField
                  fullWidth
                  label="Copyright Text"
                  value={footerData.copyright || ''}
                  onChange={(e) => {
                    setFooterData({
                      ...footerData,
                      copyright: e.target.value,
                    });
                  }}
                  helperText="Copyright text appears at the bottom of all pages"
                />
              </Paper>
            </Grid>
          </Grid>

          {/* Save Button */}
          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={saveMutation.isLoading}
              sx={{ backgroundColor: '#ffca00', color: '#000', '&:hover': { backgroundColor: '#e6b800' }, boxShadow: 'none', borderRadius: '8px', paddingBlock: '10px', paddingInline: '16px' }}
            >
              {saveMutation.isLoading ? 'Saving Changes...' : 'Save Footer Changes'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box >
  );
};

export default FooterPageEditor;

