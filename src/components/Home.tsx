import useAuth from "../hooks/useAuth";

const Home = () => {
  const auth = useAuth();

  return (
    <div>
      {auth?.accessToken ? "token: " + auth.accessToken : "unauthorized"}
      This is home page.
    </div>
  );
};

export default Home;
