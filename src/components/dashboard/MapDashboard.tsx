import { Container } from "@mui/material";
import { FunctionComponent } from "react";
import { AlertProvider } from "../../providers/AlertProvider";
import { MapsProvider } from "../../providers/MapsProvider";
import { PagePaper } from "../styled/PagePaper";

export const MapDashboard: FunctionComponent = () => {
  return (
    <AlertProvider>
      <MapsProvider>
        <Container maxWidth="xl">
          <PagePaper />
        </Container>
      </MapsProvider>
    </AlertProvider>
  );
};
