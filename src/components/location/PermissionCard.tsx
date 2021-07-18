/* eslint-disable react/prop-types */
import { Chip, Paper, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LocationOffIcon from '@material-ui/icons/LocationOff';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React, { FunctionComponent } from 'react';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { Coordinates } from '../../types/Location';

export interface PermissionCardStateProps {
  hasPermission: boolean;
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
    <Paper className={props.classes?.paper}>
      <Typography variant="h4">Tracking</Typography>
      {indicator}
    </Paper>
  );
};

export default withSharedStyles()(PermissionCard);
