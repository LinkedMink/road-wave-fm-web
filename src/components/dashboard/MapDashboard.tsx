import { Container } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { Outlet } from "react-router";
import { AlertProvider } from "../../providers/AlertProvider";
import { MapsProvider } from "../../providers/MapsProvider";
import { StationViewModel } from "../../types/responseModels";
import { MapCard } from "./MapCard";
import { FormatsProvider } from "../../providers/FormatsProvider";
import { StationsProvider } from "../../providers/StationsProvider";

export const MapDashboard: FunctionComponent = () => {
  const [selectedStation, setSelectedStation] = useState<StationViewModel>();

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
            <MapsProvider>
              <MapCard
                isTrackingUser={false}
                selected={selectedStation}
                onMarkerClick={setSelectedStation}
                selectLocation={() => {}}
              />
            </MapsProvider>
            <Outlet />
          </StationsProvider>
        </FormatsProvider>
      </Container>
    </AlertProvider>
  );
};
