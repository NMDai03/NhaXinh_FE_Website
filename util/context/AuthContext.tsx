"use client";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { nhaxinhService } from "../services/nhaxinhService";
import { toast } from "react-toastify";

interface AuthContextType {
  currentUser: any;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

interface User {
  userId: string;
  email: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathName = usePathname();

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const response = await nhaxinhService.api.userCurrentUserList();
        if (response.data.role === "customer") {
          toast.error("You are not authorized to access this page");
          router.push("/login");
        }
        setCurrentUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to fetch current user", error);
        setIsAuthenticated(false);
        if (!["/login", "/forgot-password"].includes(pathName)) {
          router.push("/login"); // Redirect to login if the user is not authenticated or token is invalid
        }
      }
    } else {
      setIsAuthenticated(false);
      if (!["/login", "/forgot-password"].includes(pathName)) {
        router.push("/login"); // Redirect to login if the user is not authenticated or token is invalid
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    fetchCurrentUser(); // Fetch the user data after logging in
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setCurrentUser(null);
    setIsAuthenticated(false);
    router.push("/login"); // Redirect to login on logout
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
