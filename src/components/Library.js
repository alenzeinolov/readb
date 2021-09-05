import {
  Button,
  ButtonGroup,
  Flex,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { USER_BOOKS_URL } from "../constants";
import { useAuth } from "./AuthProvider";
import axios from "axios";
import LibraryBook from "./LibraryBook";
import { useState } from "react";

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

  const [filterStatus, setFilterStatus] = useState("");

  const toggleFilterStatus = (status) => {
    if (filterStatus === status) {
      setFilterStatus("");
    } else {
      setFilterStatus(status);
    }
  };

  return (
    <>
      <Flex mt={6} justifyContent="center">
        <ButtonGroup isAttached>
          <Button
            isActive={filterStatus === "WANT_TO_READ"}
            onClick={() => toggleFilterStatus("WANT_TO_READ")}
          >
            Want to read
          </Button>
          <Button
            isActive={filterStatus === "READING"}
            onClick={() => toggleFilterStatus("READING")}
          >
            Reading
          </Button>
          <Button
            onClick={() => toggleFilterStatus("READ")}
            isActive={filterStatus === "READ"}
          >
            Read
          </Button>
        </ButtonGroup>
      </Flex>
      <VStack mt={6}>
        {isLoading ? <Spinner /> : null}
        {data && data.length > 0 ? (
          data
            .filter((userBook) => {
              if (!filterStatus) return true;
              return userBook.status === filterStatus;
            })
            .map((userBook) => (
              <LibraryBook key={userBook.id} userBook={userBook} />
            ))
        ) : (
          <Text>There are no books in the library yet...</Text>
        )}
      </VStack>
    </>
  );
}

export default Library;
