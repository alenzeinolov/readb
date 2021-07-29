import Home from "./components/Home";
import Login from "./components/Login";
import { useUser } from "./components/UserProvider";

function App() {
  const user = useUser();
  return user ? <Home /> : <Login />;
}

export default App;
