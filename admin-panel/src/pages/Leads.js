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
  const [editingLeadId, setEditingLeadId] = useState(null);
  const [viewingLead, setViewingLead] = useState(null);

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
        setEditingLeadId(null);
        setEditForm({});
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
    if (!selectedLead) {
      toast.error('Unable to view lead details. Please try again.');
      handleMenuClose();
      return;
    }
    // Store the lead data before closing the menu
    setViewingLead(selectedLead);
    setDetailDialogOpen(true);
    handleMenuClose();
  };

  const handleEdit = () => {
    if (!selectedLead || !selectedLead._id) {
      toast.error('Unable to edit lead. Please try again.');
      handleMenuClose();
      return;
    }
    setEditingLeadId(selectedLead._id);
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
    if (!editingLeadId) {
      toast.error('Unable to update lead. Please try again.');
      setEditDialogOpen(false);
      return;
    }
    updateLeadMutation.mutate({
      id: editingLeadId,
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Leads Management
      </Typography>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }} className="card">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="leads tabs"
          // sx={{ paddingInline: "10px" }}
          TabIndicatorProps={{ style: { display: "none" } }} // ✅ Hide indicator
        >
          <Tab
            label="Contact Us - Leads"
            sx={{
              fontSize: "16px",
              textTransform: "capitalize",
              borderRadius: "8px 0 0 8px",
              "&.Mui-selected": { backgroundColor: "#ffca00", color: "#000" },
            }}
          />
          <Tab
            label="Book Consultation - Leads"
            sx={{
              fontSize: "16px",
              textTransform: "capitalize",
              "&.Mui-selected": { backgroundColor: "#ffca00", color: "#000" },
            }}
          />
        </Tabs>
      </Paper>


      {/* Filters */}
      <Paper className="card" sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search leads"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
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

          <Grid item xs={12} md={3}>
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

          <Grid item xs={12} md={2}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("");
                setPriorityFilter("");
              }}
              fullWidth
              sx={{ height: '100%', borderColor: '#ffca00', color: '#000', '&:hover': { borderColor: '#e6b800', backgroundColor: '#fff1bd' } }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>


      {/* Leads Table */}
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
          </Box>
        </Box>
      </Box>

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
        onClose={() => {
          setDetailDialogOpen(false);
          setViewingLead(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Lead Details</DialogTitle>
        <DialogContent>
          {viewingLead ? (
            <Box sx={{ pt: 1 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                {getLeadName(viewingLead)}
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Email:</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {getLeadEmail(viewingLead)}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Phone:</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {getLeadPhone(viewingLead)}
                </Typography>
              </Box>

              {viewingLead.source === 'book_consultation' && (
                <Box sx={{ mb: 2, mt: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
                    Vehicle Details
                  </Typography>
                  <Box sx={{ pl: 2 }}>
                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Car Brand:</strong>
                      </Typography>
                      <Typography variant="body1">
                        {viewingLead.carBrand || 'N/A'}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Car Name:</strong>
                      </Typography>
                      <Typography variant="body1">
                        {viewingLead.carName || 'N/A'}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Service Required:</strong>
                      </Typography>
                      <Typography variant="body1">
                        {viewingLead.servicesRequired || 'N/A'}
                      </Typography>
                    </Box>
                    {viewingLead.comments && (
                      <Box sx={{ mb: 1.5, mt: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          <strong>Comments:</strong>
                        </Typography>
                        <Typography variant="body1" sx={{ fontStyle: 'italic', whiteSpace: 'pre-wrap' }}>
                          {viewingLead.comments}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}

              {viewingLead.source === 'contact_form' && (
                <Box sx={{ mb: 2, mt: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
                    Message
                  </Typography>
                  <Typography variant="body1" sx={{ pl: 2, fontStyle: 'italic', whiteSpace: 'pre-wrap' }}>
                    {viewingLead.message || 'No message provided'}
                  </Typography>
                </Box>
              )}

              <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Status:</strong>
                    </Typography>
                    <Chip
                      label={viewingLead.status}
                      color={getStatusColor(viewingLead.status)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Priority:</strong>
                    </Typography>
                    <Chip
                      label={viewingLead.priority}
                      color={getPriorityColor(viewingLead.priority)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Source:</strong>
                    </Typography>
                    <Typography variant="body1">
                      {viewingLead.source === 'contact_form' ? 'Contact Us' : 'Book Consultation'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Created:</strong>
                    </Typography>
                    <Typography variant="body1">
                      {new Date(viewingLead.createdAt).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {viewingLead.notes && (
                <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
                    Admin Notes
                  </Typography>
                  <Typography variant="body1" sx={{ pl: 2, fontStyle: 'italic', whiteSpace: 'pre-wrap' }}>
                    {viewingLead.notes}
                  </Typography>
                </Box>
              )}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Loading lead details...
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setDetailDialogOpen(false);
            setViewingLead(null);
          }}>Close</Button>
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
          <Button onClick={() => {
            setEditDialogOpen(false);
            setEditingLeadId(null);
            setEditForm({});
          }}>Cancel</Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            disabled={updateLeadMutation.isLoading || !editingLeadId}
          >
            {updateLeadMutation.isLoading ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Leads;
