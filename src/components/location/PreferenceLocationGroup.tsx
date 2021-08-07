/* eslint-disable react/prop-types */
import {
  Box,
  Chip,
  Collapse,
  FormControlLabel,
  FormGroup,
  Switch,
  Tooltip,
  Typography,
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { Coordinates } from '../../types/Map';

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
  const [isTrackingEnabled, setIsTrackingEnabled] = React.useState(props.isLocationWatchEnabled);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsTrackingEnabled(event.target.checked);
    if (event.target.checked) {
      props.enableLocationWatch();
    } else {
      props.disableLocationWatch();
    }
  };

  const location = props.currentLocation;
  const latLng = location ? `${location?.lat.toFixed(6)}, ${location?.lng.toFixed(6)}` : '';

  return (
    <Box className={props.classes?.columnBox}>
      <Typography variant="h6">Location</Typography>
      <FormGroup row>
        <Tooltip
          title="Enable location tracking to automatically update nearby stations"
          placement="right"
        >
          <FormControlLabel
            control={<Switch checked={isTrackingEnabled} onChange={handleChange} />}
            color="primary"
            label="Tracking"
          />
        </Tooltip>
      </FormGroup>
      <Collapse in={!!location}>
        <Box>
          <Chip label={latLng} color="primary" icon={<LocationOnIcon />} />
        </Box>
      </Collapse>
    </Box>
  );
};

export default withSharedStyles()(PreferenceLocationGroup);
