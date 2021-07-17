import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./features/auth/Login";
import AuthContext from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import Home from "./components/Home";

function App() {
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

  return (
    <div>
      <AuthContext.Provider value={{ accessToken, setAccessToken: login }}>
        <Router>
          {/*Temp links*/}
          <Link to="/">Home</Link>
          <br />
          <Link to="/login">Login</Link>
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
