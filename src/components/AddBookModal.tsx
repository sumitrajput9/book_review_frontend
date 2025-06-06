import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { createBook } from '../services/bookService';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddBookModal = ({ open, onClose, onSuccess }: Props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    if (image) formData.append('image', image);

    try {
      await createBook(formData);
      onClose();
      onSuccess(); // Refresh list
    } catch (err) {
      console.error('Error creating book:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Book</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <TextField
          label="Genre"
          select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          {['Fiction', 'Non-fiction', 'Sci-Fi', 'Fantasy', 'Biography'].map((g) => (
            <MenuItem key={g} value={g}>{g}</MenuItem>
          ))}
        </TextField>
        <Button variant="outlined" component="label">
          Upload Cover Image
          <input hidden type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBookModal;
