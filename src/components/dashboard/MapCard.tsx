import { Box } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { MapsProvider } from "../../providers/MapsProvider";
import { UserLocationProvider } from "../../providers/UserLocationProvider";
import { PagePaper } from "../styled/PagePaper";
import { MapControl } from "./MapControl";
import { SearchControl } from "./SearchControl";

export const MapCard: FunctionComponent = () => {
  const [mapRef, setMapRef] = useState<google.maps.Map>();

  return (
    <PagePaper
      sx={theme => ({
        position: "relative",
        minHeight: "580px",
        display: "flex",
        flex: "3 1 auto",
        alignItems: "stretch",
        flexDirection: "column",
        [theme.breakpoints.up("md")]: {
          marginRight: 2,
        },
        [theme.breakpoints.up("lg")]: {
          marginRight: 4,
        },
      })}
    >
      <MapsProvider>
        <UserLocationProvider>
          <Box
            sx={theme => ({
              flex: "0 0 auto",
              marginBottom: theme.spacing(1),
            })}
          >
            <SearchControl map={mapRef} />
          </Box>
          <MapControl onMapInitialized={setMapRef} />
        </UserLocationProvider>
      </MapsProvider>
    </PagePaper>
  );
};
