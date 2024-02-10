import { Container, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { useRouteError } from "react-router";
import { PagePaper } from "../styled/PagePaper";

export const RootErrorBoundary: FunctionComponent = () => {
  const error = useRouteError();
  const errorDescription = error instanceof Error ? error.stack : (error as string);

  return (
    <Container maxWidth="lg">
      <PagePaper>
        <Typography variant="h3">Error</Typography>
        <Typography>{errorDescription}</Typography>
      </PagePaper>
    </Container>
  );
};
