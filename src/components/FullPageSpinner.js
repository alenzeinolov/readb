import { Center, Spinner } from "@chakra-ui/react";

function FullPageSpinner() {
  return (
    <Center minH="100vh">
      <Spinner size="xl" />
    </Center>
  );
}

export default FullPageSpinner;
