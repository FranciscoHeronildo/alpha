import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(null); // Inicialize com null

  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = localStorage.getItem("user");
      const storageToken = localStorage.getItem("token");

      if (storageUser && storageToken) {
        setUsers(JSON.parse(storageUser)); // Parse JSON string to object
        api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
      }
    };
    loadingStoreData();
  }, []);

  const signin = async (user, token) => {
    if (user === undefined) {
      toast.error("Usuário não encontrado!");
      return;
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
