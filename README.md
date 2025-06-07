
# 📘 Book Review App – Frontend

### 🌐 Live Preview
- **Live URL:** [https://book-review-aamp.onrender.com](https://book-review-aamp.onrender.com)

### 📁 GitHub Repository
- **Frontend Repo:** [https://github.com/sumitrajput9/book_review_frontend](https://github.com/sumitrajput9/book_review_frontend)

### 🖥️ Tech Stack
- React + Vite
- TypeScript
- MUI (Material UI)
- Axios
- React Router DOM

### 🚀 Features

#### 🔐 Authentication
- Login with JWT
- Protected routes using token check
- Axios interceptor adds Authorization header

#### 📚 Book Management
- View all books in a responsive table
- Search books by title/author
- Add book via modal (title, author, genre, image)
- `createdBy` extracted from token

#### 🗣️ Reviews
- View and add reviews for each book
- If not logged in, redirects to login page

### 🧩 Components Overview

| Component        | Description                                |
|------------------|--------------------------------------------|
| `BookCard`       | Displays single book in card layout        |
| `AllBooks.tsx`   | Table-based view of all books              |
| `AddBookModal`   | Modal form to create a new book            |
| `BookDetails.tsx`| Book details with reviews & add-review form|
| `Login.tsx`      | User login page                            |
| `Navbar.tsx`     | Navigation bar                             |

### 🔄 API Integration

All in `services/bookService.ts`:
- `fetchBooks()`
- `searchBooks(query)`
- `createBook(formData)`
- `getBookById(id)`
- `postReview(id, data)`

### ⚙️ Environment Variables

Create a `.env` file:

```
VITE_API_BASE_URL=https://book-review-backend-2-l59z.onrender.com/api
```

Used in `axios.ts`:

```ts
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});
```

### 🧪 How to Run Locally

```bash
git clone https://github.com/sumitrajput9/book_review_frontend.git
cd book_review_frontend
npm install
cp .env.example .env   # Or create manually and update API URL
npm run dev
```
