import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import {
  Chip,
  CircularProgress,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FunctionComponent } from "react";
import { Coordinates } from "../../types/responseModels";
import { getEarthDistance } from "../../functions/math";

const UPDATE_DISTANCE_KM = 10;

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
  PreferenceLocationGroupDispatchProps;

const PreferenceLocationGroup: FunctionComponent<PreferenceLocationGroupProps> = props => {
  const [isTrackingEnabled, setIsTrackingEnabled] = React.useState(props.isLocationWatchEnabled);

  React.useEffect(() => {
    if (
      props.userLocation &&
      (!props.searchLocation ||
        getEarthDistance(props.userLocation, props.searchLocation) > UPDATE_DISTANCE_KM)
    ) {
      props.selectLocation(props.userLocation.lat, props.userLocation.lng);
    }
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsTrackingEnabled(event.target.checked);
    if (event.target.checked) {
      props.enableLocationWatch();
    } else {
      props.disableLocationWatch();
    }
  };

  const location = props.userLocation;
  const latLng = location ? `${location?.lat.toFixed(5)}, ${location?.lng.toFixed(5)}` : "";

  return (
    <Stack>
      <Typography variant="h6">Location</Typography>
      <List
        dense={true}
        sx={theme => ({
          maxWidth: theme.spacing(50),
        })}
      >
        <Tooltip title="Enable tracking to automatically update nearby stations based on your location">
          <ListItem component="li">
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText>Tracking</ListItemText>
            <ListItemSecondaryAction>
              <Switch
                checked={isTrackingEnabled}
                onChange={handleChange}
              />
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
                {location && (
                  <Chip
                    label={latLng}
                    color="primary"
                  />
                )}
                {!location && <CircularProgress />}
              </ListItemText>
            </ListItem>
          </Tooltip>
        </Collapse>
      </List>
    </Stack>
  );
};

export default PreferenceLocationGroup;
