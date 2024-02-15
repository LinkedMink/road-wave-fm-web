import { Container } from "@mui/material";
import { FunctionComponent } from "react";
import { Outlet } from "react-router";
import { AlertProvider } from "../../providers/AlertProvider";
import { FormatsProvider } from "../../providers/FormatsProvider";
import { StationsProvider } from "../../providers/StationsProvider";
import { MapCard } from "./MapCard";

export const MapDashboard: FunctionComponent = () => {
  return (
    <AlertProvider>
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
    </AlertProvider>
  );
};
