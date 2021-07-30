import {
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

function Book({ book }) {
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
            rightIcon={<FiChevronDown />}
          >
            Add to library
          </MenuButton>
          <MenuList>
            <MenuItem>Want to read</MenuItem>
            <MenuItem>Reading</MenuItem>
            <MenuItem>Read</MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
}

export default Book;
