import { useState, useCallback } from "react";
import { apiClient } from "../../apis/apiClient";
import { ApiResponse, User } from "@/common/types";

// useAuth — custom hook for login, logout and fetching the current user

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<ApiResponse<User>>("/auth/login", {
        email,
        password,
      });
      setUser(response.data);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return { user, loading, error, login, logout };
};
