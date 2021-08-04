import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import ListCardContainer from '../../containers/location/ListCardContainer';
import MapCardContainer from '../../containers/location/MapCardContainer';
import PermissionCardContainer from '../../containers/location/PermisssionCardContainer';
import { StationViewModel } from '../../types/Station';
import PreferenceCardContainer from '../../containers/location/PreferenceCardContainer';

type HomePageProps = SharedStyleProps;

class HomePage extends React.Component<HomePageProps> {
  focusStation = (_station: StationViewModel) => {
    // TODO
  };

  render = () => {
    return (
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} container>
            <Grid item xs={12} className={this.props.classes?.vSpace2}>
              <PermissionCardContainer />
            </Grid>
            <Grid item xs={12} className={this.props.classes?.vSpace2}>
              <PreferenceCardContainer />
            </Grid>
            <Grid item xs={12}>
              <ListCardContainer onStationSelect={this.focusStation} />
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <MapCardContainer />
          </Grid>
        </Grid>
      </Container>
    );
  };
}

export default withSharedStyles()(HomePage);
