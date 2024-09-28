import { Container } from "@mui/material";
import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { PagePaper } from "../shared/PagePaper";

export const DocumentsPage: FunctionComponent = () => {
  return (
    <Container maxWidth="lg">
      <PagePaper>
        <Outlet />
      </PagePaper>
    </Container>
  );
};
