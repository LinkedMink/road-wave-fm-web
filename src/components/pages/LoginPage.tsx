/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Stack, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { FunctionComponent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PagePaper } from "../styled/PagePaper";

type FormInput = {
  email: string;
  password: string;
};

export const LoginPage: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = data => console.log(data);

  return (
    <Container maxWidth="sm">
      <PagePaper>
        <Typography variant="h3">Login</Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Stack sx={{ marginBottom: 8 }}>
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              autoComplete="email"
              margin="normal"
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email?.message ?? " "}
              autoFocus
              {...register("email", { required: "Email is required", maxLength: 320 })}
            />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              fullWidth
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
          {/* <Stack
            spacing={2}
            sx={{ alignItems: "flex-end" }}
          >
            <Link
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
            </Link>
          </Stack> */}
        </form>
      </PagePaper>
    </Container>
  );
};
