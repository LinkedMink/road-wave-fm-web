/* eslint-disable react/prop-types */
import { Box, FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { Coordinates } from '../../types/Location';

export interface PreferenceLocationGroupStateProps {
  isLocationWatchEnabled: boolean;
  hasFailedGetLocation: boolean;
  currentLocation?: Coordinates;
}

export interface PreferenceLocationGroupDispatchProps {
  enableLocationWatch: () => void;
  disableLocationWatch: () => void;
}

type PreferenceLocationGroupProps = PreferenceLocationGroupStateProps &
  PreferenceLocationGroupDispatchProps &
  SharedStyleProps;

const PreferenceLocationGroup: FunctionComponent<PreferenceLocationGroupProps> = (props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      props.enableLocationWatch();
    } else {
      props.disableLocationWatch();
    }
  };

  return (
    <Box className={props.classes?.columnBox}>
      <FormGroup row>
        <FormControlLabel
          control={<Switch checked={props.isLocationWatchEnabled} onChange={handleChange} />}
          color="primary"
          label="Tracking"
        />
      </FormGroup>
    </Box>
  );
};

export default withSharedStyles()(PreferenceLocationGroup);
