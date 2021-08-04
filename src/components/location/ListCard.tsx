/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SignalWifi0BarIcon from '@material-ui/icons/SignalWifi0Bar';
import SignalWifi1BarIcon from '@material-ui/icons/SignalWifi1Bar';
import SignalWifi2BarIcon from '@material-ui/icons/SignalWifi2Bar';
import SignalWifi3BarIcon from '@material-ui/icons/SignalWifi3Bar';
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar';
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import React, { FunctionComponent } from 'react';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { StationViewModel } from '../../types/Station';

export interface ListCardOwnProps {
  onStationSelect: (station: StationViewModel) => void;
}

export interface ListCardStateProps {
  stations: StationViewModel[];
}

type ListCardProps = ListCardOwnProps & ListCardStateProps & SharedStyleProps;

const ListCard: FunctionComponent<ListCardProps> = (props) => {
  const iconBySignalStrength = (signal?: number) => {
    if (!signal) {
      return <SignalWifiOffIcon />;
    } else if (signal < 0.2) {
      return <SignalWifi0BarIcon />;
    } else if (signal < 0.4) {
      return <SignalWifi1BarIcon />;
    } else if (signal < 0.6) {
      return <SignalWifi2BarIcon />;
    } else if (signal < 0.8) {
      return <SignalWifi3BarIcon />;
    } else {
      return <SignalWifi4BarIcon />;
    }
  };

  const renderStation = (station: StationViewModel, index: number) => {
    return (
      <ListItem key={index} button onClick={() => props.onStationSelect(station)}>
        <ListItemAvatar>
          <Avatar>{iconBySignalStrength(station.signalStrength)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${station.callSign} ${station.protocol} ${station.frequency}`}
          secondary={station.format}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <ZoomInIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">Station List</Typography>
      </AccordionSummary>
      <AccordionDetails className={props.classes?.accordionDetails}>
        <List>
          {props.stations.length > 0 ? (
            props.stations.map(renderStation)
          ) : (
            <ListItem>
              <ListItemText primary="No Stations Founds" />
            </ListItem>
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default withSharedStyles()(ListCard);
