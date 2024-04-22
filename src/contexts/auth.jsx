import { createContext } from "react";
import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = localStorage.getItem("user");
      const storageToken = localStorage.getItem("token");

      if (storageUser && storageToken) {
        setUsers(storageUser);
      }
    };
    loadingStoreData();
  }, []);

  const signin = async (user, token) => {
    if (!user === undefined) {
      toast.error("Usuário não encontrado!");
    } else {
      setUsers(user);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }
  };

  const signout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    setUsers(null);
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        signin,
        signout,
        signed: !!users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
