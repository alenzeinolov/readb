import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import Login from "./features/auth/Login";
import AuthContext from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import { Button } from "@chakra-ui/react";

function App() {
  const history = useHistory();

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setAccessToken(token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setAccessToken(token);
  };

  const logout = () => {
    localStorage.setItem("token", "");
    history.push("/login");
  };

  return (
    <div>
      <AuthContext.Provider value={{ accessToken, setAccessToken: login }}>
        <Router>
          {/*Temp links*/}
          <Link to="/">Home</Link>
          <br />
          <Link to="/login">Login</Link>
          <br />
          {accessToken ? (
            <Button colorScheme="blue" onClick={logout}>
              Log Out
            </Button>
          ) : null}
          <hr />

          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
