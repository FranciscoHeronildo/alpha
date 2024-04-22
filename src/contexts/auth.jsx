import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const usersStorage = localStorage.getItem("users");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.mail === JSON.parse(userToken).mail
      );

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);

  const signin = (mail, taxNumber) => {
    console.log("TTTTTTTTTTTt", mail, taxNumber);
    const usersStorage = JSON.parse(localStorage.getItem("users"));

    const hasUser = usersStorage?.filter((user) => user.mail === mail);

    if (hasUser?.length) {
      if (hasUser[0].mail === mail && hasUser[0].taxNumber === taxNumber) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("token", JSON.stringify({ mail, token }));
        setUser({ mail, taxNumber });
        return;
      } else {
        return "Usuário ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signup = (mail, taxNumber) => {
    const usersStorage = JSON.parse(localStorage.getItem("users"));

    const hasUser = usersStorage?.filter((user) => user.mail === mail);

    if (hasUser?.length) {
      return "Já tem uma conta com esse Usuário";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { mail, taxNumber }];
    } else {
      newUser = [{ mail, taxNumber }];
    }

    localStorage.setItem("users", JSON.stringify(newUser));

    return;
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
