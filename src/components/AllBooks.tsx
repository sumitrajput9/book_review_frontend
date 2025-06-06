import {
    Box,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
    TableContainer,
    Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useEffect, useState } from 'react';
import { fetchBooks, searchBooks } from '../services/bookService';
import AddBookModal from './AddBookModal';
import ReviewModal from './ReviewModal'; 
import { useNavigate } from 'react-router-dom';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [reviewOpen, setReviewOpen] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

    const navigate = useNavigate();

    const loadBooks = async () => {
        const res: any = await fetchBooks();
        setBooks(res.data.data);
    };

    useEffect(() => {
        loadBooks();
    }, []);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const q = e.target.value;
        setSearch(q);
        if (q.trim()) {
            const res: any = await searchBooks(q);
            setBooks(res.data.data);
        } else {
            loadBooks();
        }
    };


    // Handle review click
    const handleAddReview = (bookId: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            setSelectedBookId(bookId);
            setReviewOpen(true);
        }
    };

    const handleAddBook = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            setOpen(true);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <TextField
                    label="Search books..."
                    variant="outlined"
                    value={search}
                    onChange={handleSearch}
                    sx={{ width: '60%' }}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddBook}
                >
                    Add Book
                </Button>
            </Box>

            <Typography variant="h6" gutterBottom>All Books</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell>Cover</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Review</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book: any) => (
                            <TableRow key={book._id}>
                                <TableCell>
                                    <img
                                        src={`${book.image}`}
                                        alt={book.title}
                                        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                                    />
                                </TableCell>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.genre}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleAddReview(book._id)}
                                    >
                                        <RateReviewIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!books.length && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No books found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedBookId && (
                <ReviewModal
                    open={reviewOpen}
                    onClose={() => setReviewOpen(false)}
                    bookId={selectedBookId}
                    onSuccess={loadBooks}
                />
            )}

            <AddBookModal open={open} onClose={() => setOpen(false)} onSuccess={loadBooks} />
        </Box>
    );
};

export default AllBooks;
