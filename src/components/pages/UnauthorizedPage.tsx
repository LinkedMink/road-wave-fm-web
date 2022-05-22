import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { PagePaper } from '../../shared/Style';

interface ClaimsParams {
  claims: string;
}

type UnauthorizedPageProps = RouteComponentProps<ClaimsParams>;

class UnauthorizedPage extends React.Component<UnauthorizedPageProps> {
  render() {
    return (
      <Container maxWidth="lg">
        <PagePaper>
          <Typography variant="h3">Unauthorized</Typography>
          <Typography variant="body1">
            The requested page requires a user claim: {this.props.match.params.claims}
          </Typography>
        </PagePaper>
      </Container>
    );
  }
}

export default UnauthorizedPage;
