import {
  Badge,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
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
import { useState } from "react";

const STATUS_COLORS = {
  WANT_TO_READ: "blue",
  READING: "purple",
  READ: "green",
};

function LibraryBook({ userBook }) {
  const auth = useAuth();
  const toast = useToast();
  const client = useQueryClient();

  const changeStatusMutation = useMutation(async ({ userBookId, status }) => {
    try {
      await axios.patch(
        `${USER_BOOKS_URL}${userBookId}/`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Token ${auth.data.token}`,
          },
        }
      );
      toast({
        description: "Book status has been updated successfully.",
        status: "success",
      });
      await client.invalidateQueries("user-books");
    } catch (err) {
      toast({
        description: "There was an error editing the book status.",
        status: "error",
      });
    }
  });
  const deleteMutation = useMutation(async (userBookId) => {
    try {
      await axios.delete(`${USER_BOOKS_URL}${userBookId}/`, {
        headers: {
          Authorization: `Token ${auth.data.token}`,
        },
      });
      toast({
        description: "Book has been deleted successfully.",
        status: "success",
      });
      await client.invalidateQueries("user-books");
    } catch (err) {
      toast({
        description: "There was an error deleting the book.",
        status: "error",
      });
    }
  });

  const handleStatusChange = (statusIdx) => {
    changeStatusMutation.mutate({
      userBookId: userBook.id,
      status: Object.keys(STATUS_COLORS)[statusIdx],
    });
  };

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
        <Heading size="md">{userBook.book.title}</Heading>
        <Text size="sm" color="gray.500">
          {userBook.book.authors.map((author) => author.full_name).join(", ")}
        </Text>
        <Text>
          <code>{userBook.book.isbn}</code>
        </Text>
        <Badge
          textAlign="center"
          colorScheme={STATUS_COLORS[userBook.status]}
          mt={2}
        >
          {userBook.status_display}
        </Badge>
      </Flex>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<FiChevronDown />}
          colorScheme="blue"
        >
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleStatusChange(0)}>
            Want to read
          </MenuItem>
          <MenuItem onClick={() => handleStatusChange(1)}>Reading</MenuItem>
          <MenuItem onClick={() => handleStatusChange(2)}>Read</MenuItem>
          <MenuDivider />
          <MenuItem
            color="red"
            onClick={() => deleteMutation.mutate(userBook.id)}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default LibraryBook;
