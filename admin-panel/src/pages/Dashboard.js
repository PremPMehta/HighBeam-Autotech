import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import '../style.css';
const StatCard = ({ title, value, icon, color = 'primary' }) => (
  <Card className="card">
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography color="textSecondary" gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="h4" component="h2">
            {value}
          </Typography>
        </Box>
        <Box color={`${color}.main`}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery(
    'leadStats',
    async () => {
      const response = await axios.get('/api/leads/stats', {
        timeout: 3000, // 3 second timeout
      });
      return response.data.data;
    },
    {
      refetchInterval: 60000, // Refetch every 60 seconds (reduced frequency)
      retry: false, // Don't retry on failure
      staleTime: 30000, // Consider data fresh for 30 seconds
    }
  );

  const { data: recentLeads, isLoading: leadsLoading } = useQuery(
    'recentLeads',
    async () => {
      const response = await axios.get('/api/leads?limit=5&sortBy=createdAt&sortOrder=desc', {
        timeout: 3000, // 3 second timeout
      });
      return response.data.data.leads;
    },
    {
      retry: false, // Don't retry on failure
      staleTime: 30000, // Consider data fresh for 30 seconds
    }
  );

  if (isLoading || leadsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{mb:3}}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} sm={6} xl={3}>
          <StatCard className="card"
            title="Total Leads"
            value={stats?.totalLeads || 0}
            icon={<PeopleIcon sx={{ fontSize: 40 , color:'#ffca00'}} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <StatCard className="card"
            title="Recent Leads"
            value={stats?.recentLeads || 0}
            icon={<TrendingUpIcon sx={{ fontSize: 40 }} />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <StatCard className="card"
            title="New This Week"
            value={stats?.recentLeads || 0}
            icon={<EmailIcon sx={{ fontSize: 40 }} />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <StatCard className="card"
            title="Converted"
            value={stats?.statusBreakdown?.find(s => s._id === 'converted')?.count || 0}
            icon={<CheckCircleIcon sx={{ fontSize: 40 }} />}
            color="warning"
          />
        </Grid>

        {/* Recent Leads */}
        <Grid item xs={12}>
          <Paper className="card" sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Leads
            </Typography>
            {recentLeads && recentLeads.length > 0 ? (
              <Box>
                {recentLeads.map((lead) => (
                  <Box
                    key={lead._id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1,
                      borderBottom: '1px solid #eee',
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1">
                        {lead.firstName} {lead.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {lead.email} • {lead.phone}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          bgcolor: lead.status === 'new' ? 'primary.light' : 'success.light',
                          color: lead.status === 'new' ? 'primary.contrastText' : 'success.contrastText',
                        }}
                      >
                        {lead.status}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary">
                No recent leads found.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Status Breakdown */}
        <Grid item xs={12}>
          <Paper className="card" sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Lead Status Breakdown
            </Typography>
            {stats?.statusBreakdown && stats.statusBreakdown.length > 0 ? (
              <Grid container spacing={2}>
                {stats.statusBreakdown.map((status) => (
                  <Grid item xs={12} sm={6} md={3} key={status._id}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid #eee',
                        borderRadius: 1,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h4" color="primary">
                        {status.count}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {status._id.charAt(0).toUpperCase() + status._id.slice(1)}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography color="text.secondary">
                No status data available.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
