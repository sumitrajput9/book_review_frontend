import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddBookModal from '../components/AddBookModal';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setShowModal(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Box className="p-6 flex flex-col items-center justify-center min-h-screen">
      {isLoggedIn ? (
        <AddBookModal
          open={showModal}
          onClose={() => navigate('/')} // after closing, navigate back to home or books list
          onSuccess={() => navigate('/')} // after success, navigate back
        />
      ) : (
        <Box textAlign="center">
          <Typography variant="h6" gutterBottom>
            Please login to add a new book.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/login')}
          >
            Click to Login
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddBook;
