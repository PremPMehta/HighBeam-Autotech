import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Article as ArticleIcon,
  Category as CategoryIcon,
  ShoppingBag as ShoppingBagIcon,
  AccountCircle,
  Logout,
} from '@mui/icons-material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from "../assets/images/highbeam_logo.png";

const drawerWidth = 255;

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Detect screen width
  const isMobile = useMediaQuery('(max-width:991px)');

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    handleProfileMenuClose();
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Leads', icon: <PeopleIcon />, path: '/leads' },
    { text: 'Content', icon: <ArticleIcon />, path: '/content' },
    { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
    { text: 'Products', icon: <ShoppingBagIcon />, path: '/products' },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Link to="/dashboard">
          <img src={logo} alt="HighBeam Autotech" style={{ maxWidth: '100%' }} />
        </Link>
      </Toolbar>
      <List sx={{ paddingBlock: '20px' }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ marginInline: '10px', width: 'auto' }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false); // close drawer on mobile
              }}
              sx={{
                gap: 2,
                borderRadius: '8px',
                mb: 1,
                '&:hover': { backgroundColor: '#f5f5f5' },
                '&.Mui-selected': { backgroundColor: '#ffca00', color: '#000' },
                '&.Mui-selected:hover': { backgroundColor: '#ffca00' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 'fit-content', color: '#000' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ width: 'fit-content' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Sidebar (desktop and mobile) */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          open={sidebarOpen}
          sx={{
            width: sidebarOpen ? drawerWidth : 0,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            transition: 'width 0.3s ease',
            '& .MuiDrawer-paper': {
              width: sidebarOpen ? drawerWidth : 0,
              transition: 'width 0.3s ease',
              overflowX: 'hidden',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: '#fff',
            color: '#000',
            boxShadow: 'none',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Toolbar sx={{ marginBlock: "7px" }}>
            <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Admin Panel
            </Typography>

            <IconButton onClick={handleProfileMenuOpen} color="inherit">
              <Avatar sx={{ width: 32, height: 32 }}>
                <AccountCircle />
              </Avatar>
            </IconButton>

            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem disabled>
                <Typography variant="body2" sx={{ color: '#000' }}>
                  {user?.email}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
