import Container from "@mui/material/Container";
import { FunctionComponent, useContext } from "react";
import { PagePaper } from "../styled/PagePaper";
import { Typography } from "@mui/material";
import { SessionContext } from "../../providers/SessionProvider";

export const AccountPage: FunctionComponent = () => {
  const [session] = useContext(SessionContext);

  return (
    <Container maxWidth="lg">
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
