import Container from '@mui/material/Container';
import React from 'react';
import { StationViewModel } from '../../definitions/ResponseModels';
import PreferenceCard from '../location/PreferenceCard';

class SettingsPage extends React.Component {
  state = {
    selectedStation: undefined as StationViewModel | undefined,
  };

  selectStation = (station: StationViewModel) => {
    this.setState({ ...this.state, selectedStation: station });
  };

  render = () => {
    return (
      <Container maxWidth="lg">
        <PreferenceCard />
      </Container>
    );
  };
}

export default SettingsPage;
