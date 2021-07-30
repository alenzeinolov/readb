import { Skeleton, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { USER_BOOKS_URL } from "../constants";
import { useAuth } from "./AuthProvider";
import axios from "axios";
import LibraryBook from "./LibraryBook";

function Library() {
  const auth = useAuth();

  const { isLoading, data } = useQuery("user-books", async () => {
    const res = await axios.get(USER_BOOKS_URL, {
      headers: {
        Authorization: `Token ${auth.data.token}`,
      },
    });
    return res.data;
  });

  return (
    <VStack mt={6}>
      {isLoading ? <Spinner /> : null}
      {data ? (
        data.map((userBook) => (
          <LibraryBook key={userBook.id} userBook={userBook} />
        ))
      ) : (
        <Text>There are no books in the library yet...</Text>
      )}
    </VStack>
  );
}

export default Library;
