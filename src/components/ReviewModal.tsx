import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Box,
} from '@mui/material';
import { useState } from 'react';
import axios from '../services/axios';

interface Props {
  open: boolean;
  onClose: () => void;
  bookId: string;
  onSuccess?: () => void;
}

const ReviewModal = ({ open, onClose, bookId, onSuccess }: Props) => {
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.post(
        `/books/${bookId}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onClose();
      onSuccess?.();
    } catch (err) {
      console.error('Failed to post review', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add Review</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <Rating
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
          />
        </Box>
        <TextField
          label="Comment"
          fullWidth
          multiline
          minRows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewModal;
