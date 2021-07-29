import FullPageSpinner from "./FullPageSpinner";
import { useContext, useEffect } from "react";
import axios from "axios";
import { USER_INFO_URL } from "../constants";

const { useState } = require("react");
const { createContext } = require("react");

const AuthContext = createContext();

const INITIAL_STATE = {
  token: "",
  user: null,
};

function AuthProvider(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(INITIAL_STATE);

  const updateUser = async (token) => {
    try {
      const res = await axios.get(USER_INFO_URL, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setData({ token, user: res.data });
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    updateUser(token).then();
  }, []);

  if (loading) {
    return <FullPageSpinner />;
  }

  const login = (token) => {
    localStorage.setItem("token", token);
    updateUser(token).then();
  };
  const logout = () => {
    localStorage.removeItem("token");
    setData(INITIAL_STATE);
  };

  return <AuthContext.Provider value={{ data, login, logout }} {...props} />;
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
