/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Divider, Stack, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { FunctionComponent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, Link, Outlet, useSubmit } from "react-router-dom";
import { NavigationBackdrop } from "../shared/NavigationBackdrop";
import { PagePaper } from "../shared/PagePaper";

type FormInput = {
  username: string;
  password: string;
};

export const LoginPage: FunctionComponent = () => {
  const submit = useSubmit();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (_data, event) => {
    submit(event?.target as HTMLFormElement);
  };

  return (
    <Container maxWidth="sm">
      <NavigationBackdrop />
      <Outlet />
      <PagePaper>
        <Typography variant="h3">Login</Typography>
        <Form
          action="/login/submit"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Stack sx={{ marginBottom: 8 }}>
            <TextField
              variant="outlined"
              label="Username"
              type="email"
              autoComplete="email"
              margin="normal"
              fullWidth
              required
              error={!!errors.username}
              helperText={errors.username?.message ?? " "}
              autoFocus
              {...register("username", { required: "Username is required", maxLength: 320 })}
            />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              fullWidth
              required
              error={!!errors.password}
              helperText={errors.password?.message ?? " "}
              {...register("password", { required: "Password is required", maxLength: 128 })}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Sign In
            </Button>
          </Stack>
        </Form>
        <Stack
          spacing={2}
          sx={{ alignItems: "flex-end", width: "100%" }}
        >
          {/* <Link
              component={NavLink}
              to={"/password-reset"}
              variant="body2"
            >
              Forgot password?
            </Link>
            <Link
              component={NavLink}
              to={"/register"}
              variant="body2"
            >
              {"Don't have an account? Sign Up"}
            </Link> */}
          <Typography variant="body2">Registration has been temporarily closed</Typography>
          <Divider flexItem={true} />
          <Button
            component={Link}
            to={"/login/ethereum"}
            variant="outlined"
            color="secondary"
            size="large"
            fullWidth
          >
            Sign in with Ethereum
          </Button>
        </Stack>
      </PagePaper>
    </Container>
  );
};
