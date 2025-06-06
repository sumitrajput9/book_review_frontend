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

import { signupUser } from '../services/authService';

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<IFormInput>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await signupUser(data);
      navigate('/login');
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Signup failed. Please try again.';
      setError('email', { message });
    }
  };

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
        <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
          Create an Account
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
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
            error={!!errors.password}
            helperText={errors.password?.message}
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
            sx={{ mt: 3, mb: 2, textTransform: 'none' }}
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? 'Signing up...' : 'Signup'}
          </Button>
        </form>

        <Typography variant="body2" textAlign="center" color="text.secondary">
          Already have an account?{' '}
          <Link component={RouterLink} to="/login" underline="hover">
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
