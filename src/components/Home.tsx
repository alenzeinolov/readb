import useAuth from "../hooks/useAuth";
import { useQuery } from "react-query";
import axios from "axios";

const Home = () => {
  const auth = useAuth();

  const { data, isLoading, isError } = useQuery("books", async () => {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/v1/books",
      {
        headers: {
          Authorization: `Token ${auth?.accessToken}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  });

  if (isError) return <div>Error fetching books</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data.map((book: any) => (
        <div>book.name</div>
      ))}
    </div>
  );
};

export default Home;
