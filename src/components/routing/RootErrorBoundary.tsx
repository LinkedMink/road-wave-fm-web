import { Container, Typography } from "@mui/material";
import { FunctionComponent, useContext } from "react";
import { useRouteError } from "react-router";
import { PagePaper } from "../styled/PagePaper";
import { ConfigContext } from "../../environments/ConfigContext";

const GENERIC_ERROR_MESSAGE = "Sorry, an unexpected error has occurred.";

export const RootErrorBoundary: FunctionComponent = () => {
  const config = useContext(ConfigContext);
  const error = useRouteError();

  return (
    <Container maxWidth="lg">
      <PagePaper>
        <Typography variant="h3">Error</Typography>
        <Typography>
          {config.DEBUG && error instanceof Error ? error.stack : (error as string)}
          {!config.DEBUG && GENERIC_ERROR_MESSAGE}
        </Typography>
      </PagePaper>
    </Container>
  );
};
