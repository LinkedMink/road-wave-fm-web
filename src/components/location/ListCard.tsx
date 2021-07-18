/* eslint-disable react/prop-types */
import { List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { Coordinates } from '../../types/Location';
import { StationModel } from '../../types/Station';

export interface ListCardOwnProps {
  onStationSelect: (station: StationModel) => void;
}

export interface ListCardStateProps {
  currentLocation?: Coordinates;
  stations?: StationModel[];
}

type ListCardProps = ListCardOwnProps & ListCardStateProps & SharedStyleProps;

const ListCard: FunctionComponent<ListCardProps> = (props) => {
  const renderStation = (station: StationModel, index: number) => {
    return (
      <ListItem key={index} button onClick={() => props.onStationSelect(station)}>
        <ListItemText
          primary={`${station.callSign} ${station.protocol} ${station.frequency}`}
          secondary={station.format}
        />
      </ListItem>
    );
  };

  return (
    <Paper className={props.classes?.paper}>
      <Typography variant="h4">Stations</Typography>
      <List>{props.stations?.map(renderStation)}</List>
    </Paper>
  );
};

export default withSharedStyles()(ListCard);
