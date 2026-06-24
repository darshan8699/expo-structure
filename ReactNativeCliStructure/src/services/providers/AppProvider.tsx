import React from 'react';
import { AuthProvider } from '../context/AuthContext';

// AppProvider — wraps the app with all context providers
// Add more providers here (ThemeProvider, QueryClientProvider, etc.)

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default AppProvider;
