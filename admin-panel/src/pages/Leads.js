import React, { useState } from 'react';
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
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  TextareaAutosize,
  Tabs,
  Tab,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const Leads = () => {
  const [activeTab, setActiveTab] = useState(0); // 0 = Contact Us, 1 = Book Consultation
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editForm, setEditForm] = useState({});

  const queryClient = useQueryClient();

  // Determine source filter based on active tab
  const sourceFilter = activeTab === 0 ? 'contact_form' : 'book_consultation';

  // Fetch leads
  const { data: leadsData, isLoading } = useQuery(
    ['leads', searchTerm, statusFilter, priorityFilter, sourceFilter],
    async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter) params.append('status', statusFilter);
      if (priorityFilter) params.append('priority', priorityFilter);
      params.append('source', sourceFilter);
      
      const response = await axios.get(`/api/leads?${params.toString()}`, {
        timeout: 3000, // 3 second timeout
      });
      return response.data.data;
    },
    {
      retry: false,
      staleTime: 30000,
    }
  );

  // Update lead mutation
  const updateLeadMutation = useMutation(
    async ({ id, data }) => {
      const response = await axios.put(`/api/leads/${id}`, data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('leads');
        toast.success('Lead updated successfully');
        setEditDialogOpen(false);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update lead');
      },
    }
  );

  // Delete lead mutation
  const deleteLeadMutation = useMutation(
    async (id) => {
      const response = await axios.delete(`/api/leads/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('leads');
        toast.success('Lead deleted successfully');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to delete lead');
      },
    }
  );

  const handleMenuClick = (event, lead) => {
    setAnchorEl(event.currentTarget);
    setSelectedLead(lead);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedLead(null);
  };

  const handleViewDetails = () => {
    setDetailDialogOpen(true);
    handleMenuClose();
  };

  const handleEdit = () => {
    setEditForm({
      status: selectedLead.status,
      priority: selectedLead.priority,
      notes: selectedLead.notes || '',
    });
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteLeadMutation.mutate(selectedLead._id);
    }
    handleMenuClose();
  };

  const handleEditSubmit = () => {
    updateLeadMutation.mutate({
      id: selectedLead._id,
      data: editForm,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'primary';
      case 'contacted': return 'info';
      case 'qualified': return 'warning';
      case 'converted': return 'success';
      case 'lost': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Clear filters when switching tabs
    setSearchTerm('');
    setStatusFilter('');
    setPriorityFilter('');
  };

  // Helper to get lead name (works for both sources)
  const getLeadName = (lead) => {
    if (lead.source === 'book_consultation') {
      return lead.customerName || `${lead.firstName || ''} ${lead.lastName || ''}`.trim() || 'N/A';
    }
    return `${lead.firstName || ''} ${lead.lastName || ''}`.trim() || 'N/A';
  };

  // Helper to get lead email (works for both sources)
  const getLeadEmail = (lead) => {
    return lead.email || lead.customerEmail || 'N/A';
  };

  // Helper to get lead phone (works for both sources)
  const getLeadPhone = (lead) => {
    return lead.phone || lead.customerPhone || 'N/A';
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Leads Management
      </Typography>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="leads tabs">
          <Tab label="Contact Us - Leads" />
          <Tab label="Book Consultation - Leads" />
        </Tabs>
      </Paper>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search leads"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="contacted">Contacted</MenuItem>
                <MenuItem value="qualified">Qualified</MenuItem>
                <MenuItem value="converted">Converted</MenuItem>
                <MenuItem value="lost">Lost</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                label="Priority"
              >
                <MenuItem value="">All Priority</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('');
                setPriorityFilter('');
              }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Leads Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              {activeTab === 1 && (
                <>
                  <TableCell>Car Brand</TableCell>
                  <TableCell>Car Name</TableCell>
                  <TableCell>Service Required</TableCell>
                </>
              )}
              {activeTab === 0 && (
                <TableCell>Message</TableCell>
              )}
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={activeTab === 1 ? 10 : 8} align="center">
                  <LoadingSpinner />
                </TableCell>
              </TableRow>
            ) : leadsData?.leads?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={activeTab === 1 ? 10 : 8} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No leads found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              leadsData?.leads?.map((lead) => (
                <TableRow key={lead._id}>
                  <TableCell>{getLeadName(lead)}</TableCell>
                  <TableCell>{getLeadEmail(lead)}</TableCell>
                  <TableCell>{getLeadPhone(lead)}</TableCell>
                  {activeTab === 1 && (
                    <>
                      <TableCell>{lead.carBrand || 'N/A'}</TableCell>
                      <TableCell>{lead.carName || 'N/A'}</TableCell>
                      <TableCell>{lead.servicesRequired || 'N/A'}</TableCell>
                    </>
                  )}
                  {activeTab === 0 && (
                    <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lead.message || 'N/A'}
                    </TableCell>
                  )}
                  <TableCell>
                    <Chip
                      label={lead.status}
                      color={getStatusColor(lead.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={lead.priority}
                      color={getPriorityColor(lead.priority)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => handleMenuClick(e, lead)}
                      size="small"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewDetails}>
          <VisibilityIcon sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Lead Details Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Lead Details</DialogTitle>
        <DialogContent>
          {selectedLead && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {getLeadName(selectedLead)}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {getLeadEmail(selectedLead)}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Phone:</strong> {getLeadPhone(selectedLead)}
              </Typography>
              
              {selectedLead.source === 'book_consultation' && (
                <>
                  <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                    <strong>Vehicle Details:</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ pl: 2 }}>
                    <strong>Car Brand:</strong> {selectedLead.carBrand || 'N/A'}
                  </Typography>
                  <Typography variant="body2" sx={{ pl: 2 }}>
                    <strong>Car Name:</strong> {selectedLead.carName || 'N/A'}
                  </Typography>
                  <Typography variant="body2" sx={{ pl: 2 }}>
                    <strong>Service Required:</strong> {selectedLead.servicesRequired || 'N/A'}
                  </Typography>
                  {selectedLead.comments && (
                    <>
                      <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                        <strong>Comments:</strong>
                      </Typography>
                      <Typography variant="body2" sx={{ pl: 2, fontStyle: 'italic' }}>
                        {selectedLead.comments}
                      </Typography>
                    </>
                  )}
                </>
              )}
              
              {selectedLead.source === 'contact_form' && selectedLead.message && (
                <>
                  <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                    <strong>Message:</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ pl: 2, fontStyle: 'italic' }}>
                    {selectedLead.message}
                  </Typography>
                </>
              )}
              
              <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                <strong>Status:</strong> {selectedLead.status}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Priority:</strong> {selectedLead.priority}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Source:</strong> {selectedLead.source}
              </Typography>
              
              {selectedLead.notes && (
                <>
                  <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                    <strong>Admin Notes:</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ pl: 2, fontStyle: 'italic' }}>
                    {selectedLead.notes}
                  </Typography>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Lead Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Lead</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={editForm.status || ''}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                label="Status"
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="contacted">Contacted</MenuItem>
                <MenuItem value="qualified">Qualified</MenuItem>
                <MenuItem value="converted">Converted</MenuItem>
                <MenuItem value="lost">Lost</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={editForm.priority || ''}
                onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                label="Priority"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={4}
              value={editForm.notes || ''}
              onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
              placeholder="Add notes about this lead..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            disabled={updateLeadMutation.isLoading}
          >
            {updateLeadMutation.isLoading ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Leads;
