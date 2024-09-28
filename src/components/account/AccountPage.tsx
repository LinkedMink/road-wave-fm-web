import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { FunctionComponent, useContext } from "react";
import { SessionContext } from "../shared/SessionProvider";
import { PagePaper } from "../shared/PagePaper";

export const AccountPage: FunctionComponent = () => {
  const [session] = useContext(SessionContext);

  return (
    <Container maxWidth="md">
      <PagePaper>
        <Typography variant="h3">Account</Typography>
        <Typography>TODO</Typography>
        <code>
          <pre>{JSON.stringify(session.decodedToken, null, 2)}</pre>
        </code>
      </PagePaper>
    </Container>
  );
};
