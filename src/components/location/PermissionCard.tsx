/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationOffIcon from '@material-ui/icons/LocationOff';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React, { FunctionComponent } from 'react';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { Coordinates } from '../../types/Location';

export interface PermissionCardStateProps {
  hasPermission: boolean;
  hasFailedGetLocation: boolean;
  currentLocation?: Coordinates;
}

export interface PermissionCardDispatchProps {
  enableLocation: () => void;
  disableLocation: () => void;
}

type PermissionCardProps = PermissionCardStateProps &
  PermissionCardDispatchProps &
  SharedStyleProps;

const PermissionCard: FunctionComponent<PermissionCardProps> = (props) => {
  const indicator = props.hasPermission ? (
    <Chip
      label="Enabled"
      color="secondary"
      icon={<LocationOnIcon />}
      onDelete={props.disableLocation}
    />
  ) : (
    <Chip
      label="Disabled"
      color="primary"
      icon={<LocationOffIcon />}
      deleteIcon={<AddCircleIcon />}
      onDelete={props.enableLocation}
    />
  );

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">Permission</Typography>
      </AccordionSummary>
      <AccordionDetails className={props.classes?.accordionDetails}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {indicator}
          </Grid>
          {props.hasFailedGetLocation && (
            <Grid item xs={12}>
              <Typography variant="body1" color="error">
                You must enable location tracking. If permission was declined, look for a button in
                the address bar to reenable it.
              </Typography>
            </Grid>
          )}
          {props.currentLocation && (
            <Grid item xs={12}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Latitude"
                    secondary={props.currentLocation.lat.toFixed(6)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Longitude"
                    secondary={props.currentLocation.lng.toFixed(6)}
                  />
                </ListItem>
              </List>
            </Grid>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default withSharedStyles()(PermissionCard);
