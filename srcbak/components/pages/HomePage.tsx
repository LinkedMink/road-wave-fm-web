import { Container, Grid } from "@mui/material";
import React from "react";
import ListCardContainer from "../../containers/location/ListCardContainer";
import MapCardContainer from "../../containers/location/MapCardContainer";
import { StationViewModel } from "../../definitions/ResponseModels";
import PreferenceCard from "../location/PreferenceCard";

class HomePage extends React.Component {
  state = {
    selectedStation: undefined as StationViewModel | undefined,
  };

  selectStation = (station: StationViewModel) => {
    this.setState({ ...this.state, selectedStation: station });
  };

  render = () => {
    return (
      <Container maxWidth="xl">
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
            md={4}
          >
            <PreferenceCard />
            <ListCardContainer
              onStationClick={this.selectStation}
              selected={this.state.selectedStation}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
          >
            <MapCardContainer
              onMarkerClick={this.selectStation}
              selected={this.state.selectedStation}
            />
          </Grid>
        </Grid>
      </Container>
    );
  };
}

export default HomePage;
