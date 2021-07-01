import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';

type HomePageProps = SharedStyleProps;

class HomePage extends React.Component<HomePageProps> {
  render = () => {
    return (
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}></Grid>
        </Grid>
      </Container>
    );
  };
}

export default withSharedStyles()(HomePage);
