import { createContext } from "react";

interface AuthContextProps {
  accessToken: string;
  setAccessToken: Function;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export default AuthContext;
