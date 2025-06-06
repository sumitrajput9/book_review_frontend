import axios from './axios';

export const fetchBooks = (params?: any) => axios.get('/books', { params });
export const getBookById = (id: string) => axios.get(`/books/${id}`);
export const searchBooks = (query: string) => axios.get(`/books/search?q=${query}`);
export const createBook = (formData: FormData) =>
  axios.post('/books', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
