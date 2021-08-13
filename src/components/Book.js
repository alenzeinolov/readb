import {
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { USER_BOOKS_URL } from "../constants";
import { useAuth } from "./AuthProvider";

function Book({ book }) {
  const queryClient = useQueryClient();

  const toast = useToast();

  const auth = useAuth();

  const mutation = useMutation(
    (book) =>
      axios.post(USER_BOOKS_URL, book, {
        headers: {
          Authorization: `Token ${auth.data.token}`,
        },
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("books"),
      onError: (e) =>
        toast({
          description: e.message,
          status: "error",
        }),
    }
  );

  function addBookToLibrary(bookId, status) {
    mutation.mutate({
      book: bookId,
      status,
    });
  }

  return (
    <Flex
      p={4}
      borderRadius={8}
      justify="space-between"
      align="center"
      bgColor="gray.50"
      minW="100%"
    >
      <Flex direction="column">
        <Heading size="md">{book.title}</Heading>
        <Text size="sm" color="gray.500">
          {book.authors.map((author) => author.full_name).join(", ")}
        </Text>
        <Text>{book.isbn}</Text>
      </Flex>
      {book.in_library ? (
        <Button isDisabled>In library</Button>
      ) : (
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="blue"
            isLoading={mutation.isLoading}
            rightIcon={<FiChevronDown />}
          >
            Add to library
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => addBookToLibrary(book.id, "WANT_TO_READ")}>
              Want to read
            </MenuItem>
            <MenuItem onClick={() => addBookToLibrary(book.id, "READING")}>
              Reading
            </MenuItem>
            <MenuItem onClick={() => addBookToLibrary(book.id, "READ")}>
              Read
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
}

export default Book;
