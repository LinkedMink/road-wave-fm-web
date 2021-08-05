import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import ListCardContainer from '../../containers/location/ListCardContainer';
import MapCardContainer from '../../containers/location/MapCardContainer';
import { StationViewModel } from '../../types/Station';
import PreferenceCard from '../location/PreferenceCard';
import { StyledComponentProps, StyleRulesCallback, Theme } from '@material-ui/core';

type StyleClass = 'fullscreen';
type StyleProps = StyledComponentProps<StyleClass>;

const styles: StyleRulesCallback<Theme, Record<string, unknown>, StyleClass> = (_theme: Theme) => ({
  fullscreen: {
    height: '100%',
  },
});

type HomePageProps = SharedStyleProps & StyleProps;

class HomePage extends React.Component<HomePageProps> {
  focusStation = (_station: StationViewModel) => {
    // TODO
  };

  render = () => {
    return (
      <Container maxWidth="xl">
        <Grid container spacing={2} className={this.props.classes?.fullscreen}>
          <Grid item xs={12} md={4}>
            <PreferenceCard />
            <ListCardContainer onStationSelect={this.focusStation} />
          </Grid>
          <Grid item xs={12} md={8} className={this.props.classes?.fullscreen}>
            <MapCardContainer />
          </Grid>
        </Grid>
      </Container>
    );
  };
}

export default withSharedStyles(styles)(HomePage);
