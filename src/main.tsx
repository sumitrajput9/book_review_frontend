import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext'; // ✅ Import your AuthProvider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Wrap your app with AuthProvider */}
      <CssBaseline />
      <App />
    </AuthProvider>
  </React.StrictMode>
);
