import { createContext, useState } from "react";

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
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AppContext.Provider value={{ user, setUser, isLogin, setIsLogin }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
