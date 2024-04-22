import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const usersStorage = localStorage.getItem("user");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.mail === JSON.parse(userToken).mail
      );

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);

  const signin = (taxNumber, token) => {
    `Bearer ${token}`;
    localStorage.setItem("token", JSON.stringify({ taxNumber, token }));
  };

  const signup = (taxNumber, token) => {
    `Bearer ${token}`;
    localStorage.setItem("token", JSON.stringify({ taxNumber, token }));
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
