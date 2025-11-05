import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
} from '@mui/icons-material';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const Content = () => {
  const navigate = useNavigate();

  // Website pages configuration
  const websitePages = [
    {
      pageId: 'home',
      pageName: 'Home Page',
      route: '/home',
      description: 'Main landing page with hero sections, car repair, and core values',
      editableSections: 35, // Hero sections, car repair, core values, about section (services removed - managed in Categories)
    },
    {
      pageId: 'about',
      pageName: 'About Us',
      route: '/about',
      description: 'Company story, mission, vision, and team information',
      editableSections: 35, // Hero sections, Our Story, Gallery, Commitment, Vision, Brands, FAQ
    },
    {
      pageId: 'services',
      pageName: 'Services',
      route: '/service',
      description: 'Detailed services and car repair information',
      editableSections: 28, // Service details, Benefits, Schedule Service, Opening Hours
    },
    {
      pageId: 'contact',
      pageName: 'Contact Us',
      route: '/contact',
      description: 'Contact form, address, and business hours',
      editableSections: 18, // Hero sections, Contact Header, Map, Get In Touch, Contact Details
    },
    {
      pageId: 'footer',
      pageName: 'Footer',
      route: '/footer',
      description: 'Website footer content (appears on all pages)',
      editableSections: 9, // About Us section, Sale Hours, Our Brands, Copyright
    },
  ];

  // Fetch pages from API
  const { data: pagesData, isLoading, refetch } = useQuery(
    'pages',
    async () => {
      try {
        const response = await axios.get('/api/pages', {
          timeout: 3000, // 3 second timeout
        });
        return response.data.data.pages;
      } catch (error) {
        // If no pages exist or timeout, return empty array
        return [];
      }
    },
    {
      retry: false, // Don't retry on failure
      staleTime: 60000, // Consider data fresh for 60 seconds
    }
  );

  const handleEditPage = (pageId) => {
    navigate(`/content/edit/${pageId}`);
  };

  const getPageStatus = (pageId) => {
    if (!pagesData || pagesData.length === 0) return 'Not Created';
    const page = pagesData.find(p => p.pageId === pageId);
    return page ? (page.isActive ? 'Active' : 'Inactive') : 'Not Created';
  };

  const getLastModified = (pageId) => {
    if (!pagesData || pagesData.length === 0) return 'Never';
    const page = pagesData.find(p => p.pageId === pageId);
    if (!page || !page.lastModified) return 'Never';
    return new Date(page.lastModified).toLocaleDateString();
  };

  // Don't wait for API - show table immediately
  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Content Management
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
        Manage all your website pages. Click edit to modify page content.
      </Typography>
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
                    <TableCell sx={{ minWidth: 150 }}><strong>Page Name</strong></TableCell>
                    <TableCell sx={{ minWidth: 250 }}><strong>Description</strong></TableCell>
                    <TableCell sx={{ minWidth: 150 }}><strong>Editable Sections</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell sx={{ minWidth: 130 }}><strong>Last Modified</strong></TableCell>
                    <TableCell align="right"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {websitePages.map((page) => {
                    const pageData = pagesData?.find(p => p.pageId === page.pageId);
                    const status = getPageStatus(page.pageId);
                    const lastModified = getLastModified(page.pageId);

                    return (
                      <TableRow key={page.pageId} hover>
                        <TableCell>
                          <Typography variant="body1" fontWeight="medium">
                            {page.pageName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {page.description}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Chip
                            label={page.editableSections}
                            size="small"
                            variant="outlined"
                            sx={{ color: '#ffca00', borderColor: '#ffca00' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={status}
                            size="small"
                            color={
                              status === 'Active' ? 'success' :
                                status === 'Inactive' ? 'warning' :
                                  'default'
                            }
                          />
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            {lastModified}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="primary"
                            onClick={() => handleEditPage(page.pageId)}
                            title="Edit Page"
                            sx={{ '&:hover': { backgroundColor: 'unset' } }}
                          >
                            <EditIcon sx={{ color: '#ffca00' }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
