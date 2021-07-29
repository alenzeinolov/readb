import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useMutation } from "react-query";
import axios from "axios";
import { LOGIN_URL } from "../constants";
import { useAuth } from "./AuthProvider";

function Login() {
  const { login } = useAuth();
  const toast = useToast();
  const mutation = useMutation((payload) => axios.post(LOGIN_URL, payload));

  return (
    <Center minH="100vh">
      <Box bgColor="gray.50" p={8} borderRadius={8}>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, actions) => {
            try {
              const res = await mutation.mutateAsync(values);
              login(res.data.token);
            } catch (err) {
              if (err.response) {
                if (err.response.data["non_field_errors"]) {
                  toast({
                    description: err.response.data["non_field_errors"],
                    status: "error",
                  });
                } else {
                  for (const [field, error] of Object.entries(
                    err.response.data
                  )) {
                    actions.setFieldError(field, error);
                  }
                }
              }
            } finally {
              actions.setSubmitting(false);
            }
          }}
        >
          {(props) => (
            <Form>
              <VStack spacing={4}>
                <Field name="username">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.username && form.touched.username}
                    >
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <Input {...field} id="name" placeholder="Username" />
                      <FormErrorMessage>
                        {form.errors.username}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel htmlFor="name">Password</FormLabel>
                      <Input {...field} id="name" placeholder="Password" />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  colorScheme="blue"
                  isLoading={props.isSubmitting}
                  isFullWidth
                  type="submit"
                >
                  Submit
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
}

export default Login;
