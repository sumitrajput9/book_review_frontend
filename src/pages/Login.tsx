import React from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Link,
} from '@mui/material';

import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext'; // import

interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<IFormInput>();

  const navigate = useNavigate();
   const { login } = useAuth(); 
   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response: any = await loginUser(data);
      localStorage.setItem('token', response.data.data.token);
      login();
      navigate('/');
    } catch (error: any) {
      setError('email', {
        message:
          error?.response?.data?.message || 'Login failed. Please try again.',
      });
    }};

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 4,
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom fontWeight="bold" textAlign="center">
          Login to BookReview
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Enter a valid email address',
              },
            })}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 1, textTransform: 'none' }}
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <Typography textAlign="center" variant="body2" color="text.secondary" mt={2}>
          Don’t have an account?{' '}
          <Link component={RouterLink} to="/signup" underline="hover">
            Signup here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
