import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { ApiProvider } from "../../apis/graphql/api.provider";

// AppProvider — wraps the app with all context providers
// Add more providers here (ThemeProvider, QueryClientProvider, etc.)

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ApiProvider>
      <AuthProvider>{children}</AuthProvider>
    </ApiProvider>
  );
};

export default AppProvider;
