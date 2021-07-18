/* eslint-disable react/prop-types */
import { Paper, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { Coordinates } from '../../types/Location';
import { StationModel } from '../../types/Station';

export interface MapCardStateProps {
  currentLocation?: Coordinates;
  stations?: StationModel[];
}

type MapCardProps = MapCardStateProps & SharedStyleProps;

const mapId = 'mapCardElement';

const MapCard: FunctionComponent<MapCardProps> = (props) => {
  return (
    <Paper className={props.classes?.paper}>
      <Typography variant="h4">Map</Typography>
      <div id={mapId}></div>
    </Paper>
  );
};

export default withSharedStyles()(MapCard);
