import React from 'react';
import Container from '@material-ui/core/Container';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
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

type SettingsPageProps = SharedStyleProps & StyleProps;

class SettingsPage extends React.Component<SettingsPageProps> {
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

export default withSharedStyles(styles)(SettingsPage);
