import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// MUI Icons
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  // const [ setIsLoggedIn] = useState(false);
  const { isLoggedIn, logout } = useAuth(); // use context
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    // setIsLoggedIn(!!token);
  }, []);

  

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout(); // update context
    navigate('/login');
  };

  return (
    <AppBar position="sticky" color="default" elevation={3}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 4 },
          py: 1,
          backgroundColor: '#f9f9f9',
          boxShadow: '0 2px 8px rgb(0 0 0 / 0.1)',
        }}
      >
        {/* Left side - Brand and Links */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* Brand */}
          <Button
            component={RouterLink}
            to="/"
            startIcon={<MenuBookIcon />}
            sx={{
              fontWeight: 'bold',
              fontSize: '1.3rem',
              color: '#1976d2',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#115293',
              },
            }}
          >
            BookReview
          </Button>

          {/* All Books */}
          <Button
            component={RouterLink}
            to="/"
            startIcon={<HomeIcon />}
            color="inherit"
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              color: '#555',
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#1976d2',
              },
            }}
          >
            All Books
          </Button>

          {/* Add Book - only for logged in users */}
          {isLoggedIn && (
            <Button
              component={RouterLink}
              to="/add-book"
              startIcon={<AddCircleOutlineIcon />}
              color="inherit"
              sx={{
                textTransform: 'none',
                fontSize: '1rem',
                color: '#555',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#1976d2',
                },
              }}
            >
              Add Book
            </Button>
          )}
        </Box>

        {/* Right side - Auth Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {!isLoggedIn ? (
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              color="primary"
              startIcon={<LoginIcon />}
              sx={{
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': { boxShadow: 'none', backgroundColor: '#1565c0' },
              }}
            >
              Login
            </Button>
          ) : (
            <Button
              onClick={handleLogout}
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              sx={{
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': { boxShadow: 'none', backgroundColor: '#b71c1c' },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
