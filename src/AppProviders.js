import { AuthProvider } from "./components/AuthProvider";
import { UserProvider } from "./components/UserProvider";

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
}

export default AppProviders;
