import {
  Flex,
  Input,
  Skeleton,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Book from "./Book";
import { useEffect, useState } from "react";
import axios from "axios";
import { BOOKS_URL } from "../constants";
import { useAuth } from "./AuthProvider";
import { useQuery } from "react-query";

function Search() {
  const auth = useAuth();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchBooks = async () => {
    const res = await axios.get(`${BOOKS_URL}?search=${search}`, {
      headers: {
        Authorization: `Token ${auth.data.token}`,
      },
    });
    setBooks(res.data);
  };

  const { isLoading, refetch } = useQuery(["posts", search], fetchBooks, {
    cacheTime: 0,
    enabled: false,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search) {
        refetch().then();
      } else {
        setBooks([]);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search, refetch]);

  return (
    <>
      <Flex mt={6}>
        <Input
          type="text"
          placeholder="Search for a book..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </Flex>
      <VStack mt={6} minH="500px">
        {isLoading ? <Spinner /> : null}
        {search && !isLoading ? (
          books.length > 0 ? (
            books.map((book) => <Book key={book.id} book={book} />)
          ) : (
            <p>Not found</p>
          )
        ) : null}
        {!search && !isLoading ? (
          <Text>Start typing to search for a book.</Text>
        ) : null}
      </VStack>
    </>
  );
}

export default Search;
