import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { RouteComponentProps } from 'react-router';

interface ClaimsParams {
  claims: string;
}

type UnauthorizedPageProps = RouteComponentProps<ClaimsParams> & SharedStyleProps

class UnauthorizedPage extends React.Component<UnauthorizedPageProps> {
  render() {
    return (
      <Container maxWidth="lg">
        <Paper className={this.props.classes?.paper}>
          <Typography variant="h3">Unauthorized</Typography>
          <Typography variant="body1">
            The requested page requires a user claim: {this.props.match.params.claims}
          </Typography>
        </Paper>
      </Container>
    );
  }
}

export default withSharedStyles()(UnauthorizedPage);
