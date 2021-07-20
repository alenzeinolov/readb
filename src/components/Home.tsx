import useAuth from "../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { Button, Input, Select, useToast } from "@chakra-ui/react";
import { useState } from "react";

const Home = () => {
  const queryClient = useQueryClient();

  const toast = useToast();

  const auth = useAuth();

  const { data, isLoading, isError } = useQuery("books", async () => {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/v1/books/",
      {
        headers: {
          Authorization: `Token ${auth?.accessToken}`,
        },
      }
    );
    return res.data;
  });

  const addBookMutation = useMutation(
    (newBook: { name: string; status: string }) => {
      return axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/v1/books/",
        {
          ...newBook,
        },
        {
          headers: {
            Authorization: `Token ${auth?.accessToken}`,
          },
        }
      );
    },
    {
      onSuccess: (data, variables, context) => {
        toast({
          description: `Successfully added a book named ${variables.name}`,
          status: "success",
          duration: 5000,
        });
        queryClient.invalidateQueries("books");
      },
      onError: (error, variables, context) => {
        toast({
          description: (error as any).message,
          status: "error",
          duration: 5000,
        });
      },
    }
  );

  const [name, setName] = useState("");
  const [status, setStatus] = useState("WANT_TO_READ");

  if (isError) return <div>Error fetching books</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const payload = {
            name,
            status,
          };

          addBookMutation.mutate(payload);
        }}
      >
        <label>
          Name
          <Input onChange={(e) => setName(e.target.value)} value={name} />
        </label>
        <label>
          Status
          <Select onChange={(e) => setStatus(e.target.value)} value={status}>
            <option value="WANT_TO_READ">Want to read</option>
            <option value="READING">Reading</option>
            <option value="READ">Read</option>
          </Select>
        </label>
        <Button colorScheme="blue" type="submit">
          Add
        </Button>
      </form>

      <hr />

      <div>
        {data.map((book: any) => (
          <div>
            {book.name} - {book.status}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
