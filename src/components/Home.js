import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import {
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import Search from "./Search";
import { useUser } from "./UserProvider";
import { useAuth } from "./AuthProvider";

function Home() {
  const auth = useAuth();
  const user = useUser();

  return (
    <Router>
      <Container>
        <Flex justify="space-between" align="center" mt={4}>
          <HStack>
            <Heading size="md">{user.username}</Heading>
            <IconButton
              icon={<BiLogOut />}
              aria-label="Log Out"
              onClick={auth.logout}
            >
              Log Out
            </IconButton>
          </HStack>
          <HStack>
            <Link as={NavLink} to="/">
              Search
            </Link>
            <Link as={NavLink} to="/my-list">
              My Library
            </Link>
          </HStack>
        </Flex>

        <Switch>
          <Route path="/my-list">
            <Search />
          </Route>
          <Route path="/" exact>
            <Search />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default Home;
