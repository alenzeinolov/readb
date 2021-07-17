import { FC, useState } from "react";
import { Box, Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const Login: FC = () => {
  const history = useHistory();
  const toast = useToast();

  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (!email || !password) {
            toast({
              description: "You must provide an email and password",
              status: "warning",
              duration: 5000,
            });
            return;
          }

          try {
            const payload = {
              username: email,
              password,
            };
            const res = await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/api/v1/auth-token/`,
              payload
            );
            auth!.setAccessToken(res.data.token);
            toast({
              description: "You have successfully logged in.",
              status: "success",
              duration: 5000,
            });
            history.push("/");
          } catch (err) {
            if (err.response) {
              if (err.response.status < 500) {
                toast({
                  description: String(JSON.stringify(err.response.data)),
                  status: "warning",
                  duration: 5000,
                });
              } else {
                toast({
                  description: "Unknown error",
                  status: "error",
                  duration: 5000,
                });
              }
            }
          }
        }}
      >
        <label>
          Username
          <Input
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          Password
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <Button colorScheme="blue" type="submit">
          Log In
        </Button>
      </form>
    </Box>
  );
};

export default Login;
