import { useAuth } from "./AuthProvider";
import { useContext, createContext } from "react";

const UserContext = createContext(null);

function UserProvider(props) {
  const auth = useAuth();

  return <UserContext.Provider value={auth.data.user} {...props} />;
}

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
