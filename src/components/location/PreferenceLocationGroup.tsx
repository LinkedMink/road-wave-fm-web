import {
  Box,
  Chip,
  CircularProgress,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  StyledComponentProps,
  StyleRulesCallback,
  Switch,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { getEarthDistance } from '../../shared/Math';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { Coordinates } from '../../definitions/Map';

const UPDATE_DISTANCE_KM = 10;

type StyleClass = 'list';
type StyleProps = StyledComponentProps<StyleClass>;

const styles: StyleRulesCallback<Theme, Record<string, unknown>, StyleClass> = (theme: Theme) => ({
  list: {
    maxWidth: theme.spacing(50),
  },
});

export interface PreferenceLocationGroupStateProps {
  isLocationWatchEnabled: boolean;
  hasFailedGetLocation: boolean;
  userLocation?: Coordinates;
  searchLocation?: Coordinates;
}

export interface PreferenceLocationGroupDispatchProps {
  enableLocationWatch: () => void;
  disableLocationWatch: () => void;
  selectLocation(lat: number, lng: number): void;
}

type PreferenceLocationGroupProps = PreferenceLocationGroupStateProps &
  PreferenceLocationGroupDispatchProps &
  SharedStyleProps &
  StyleProps;

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

  const location = props.userLocation;
  const latLng = location ? `${location?.lat.toFixed(5)}, ${location?.lng.toFixed(5)}` : '';

  React.useEffect(() => {
    if (
      props.userLocation &&
      (!props.searchLocation ||
        getEarthDistance(props.userLocation, props.searchLocation) > UPDATE_DISTANCE_KM)
    ) {
      props.selectLocation(props.userLocation.lat, props.userLocation.lng);
    }
  });

  return (
    <Box className={props.classes?.columnBox}>
      <Typography variant="h6">Location</Typography>
      <List className={props.classes?.list} dense={true}>
        <Tooltip title="Enable tracking to automatically update nearby stations based on your location">
          <ListItem>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText>Tracking</ListItemText>
            <ListItemSecondaryAction>
              <Switch checked={isTrackingEnabled} onChange={handleChange} />
            </ListItemSecondaryAction>
          </ListItem>
        </Tooltip>
        <Collapse in={props.isLocationWatchEnabled}>
          <Tooltip title="Your current location">
            <ListItem>
              <ListItemIcon>
                <MyLocationIcon />
              </ListItemIcon>
              <ListItemText>
                {location && <Chip label={latLng} color="primary" />}
                {!location && <CircularProgress />}
              </ListItemText>
            </ListItem>
          </Tooltip>
        </Collapse>
      </List>
    </Box>
  );
};

export default withSharedStyles(styles)(PreferenceLocationGroup);
