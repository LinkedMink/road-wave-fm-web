import Container from "@mui/material/Container";
import { FunctionComponent } from "react";
import { Outlet } from "react-router";

export const DashboardPage: FunctionComponent = () => {
  return (
    <Container maxWidth="xl">
      <Outlet />
    </Container>
  );
};
