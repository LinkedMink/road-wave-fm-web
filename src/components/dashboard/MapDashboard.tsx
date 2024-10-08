import { Container } from "@mui/material";
import { FunctionComponent } from "react";
import { Outlet } from "react-router";
import { FormatsProvider } from "./providers/FormatsProvider";
import { StationsProvider } from "./providers/StationsProvider";
import { MapCard } from "./MapCard";

export const MapDashboard: FunctionComponent = () => {
  return (
    <Container
      maxWidth="xl"
      sx={theme => ({
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "stretch",
        [theme.breakpoints.up("md")]: {
          flexDirection: "row",
        },
      })}
    >
      <FormatsProvider>
        <StationsProvider>
          <MapCard />
          <Outlet />
        </StationsProvider>
      </FormatsProvider>
    </Container>
  );
};
