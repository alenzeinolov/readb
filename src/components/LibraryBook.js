import {
  Badge,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

const STATUS_COLORS = {
  WANT_TO_READ: "blue",
  READING: "purple",
  READ: "success",
};

function LibraryBook({ userBook }) {
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
          <MenuItem>Want to read</MenuItem>
          <MenuItem>Reading</MenuItem>
          <MenuItem>Read</MenuItem>
          <MenuItem>Delete</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default LibraryBook;
