import { createContext, useEffect, useState } from "react";

interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  isVerified: boolean;
}

interface AppContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
export { AppContext };

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : undefined;
  });

  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem("isLogin") === "true";
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("isLogin", isLogin ? "true" : "false");
  }, [isLogin]);

  return (
    <AppContext.Provider value={{ user, setUser, isLogin, setIsLogin }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
