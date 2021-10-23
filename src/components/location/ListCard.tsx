import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  StyledComponentProps,
  StyleRulesCallback,
  Theme,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SignalWifi0BarIcon from '@material-ui/icons/SignalWifi0Bar';
import SignalWifi1BarIcon from '@material-ui/icons/SignalWifi1Bar';
import SignalWifi2BarIcon from '@material-ui/icons/SignalWifi2Bar';
import SignalWifi3BarIcon from '@material-ui/icons/SignalWifi3Bar';
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar';
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';
import clsx from 'clsx';
import React, { FunctionComponent, useEffect } from 'react';
import { indexToChar } from '../../shared/Collection';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { StationRequest, StationViewModel } from '../../types/Station';
import LoadingSpinner from '../LoadingSpinner';

type StyleClass = 'avatar' | 'container' | 'list';
type StyleProps = StyledComponentProps<StyleClass>;

const styles: StyleRulesCallback<Theme, Record<string, unknown>, StyleClass> = (theme: Theme) => ({
  container: {
    width: '100%',
    alignItems: 'stretch',
  },
  list: {
    maxHeight: theme.spacing(50),
    overflow: 'auto',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
});

export interface ListCardOwnProps {
  selected?: StationViewModel;
  onStationClick: (station: StationViewModel, event: React.MouseEvent) => void;
}

export interface ListCardStateProps {
  searchCriteria?: StationRequest;
  isLoading: boolean;
  stations?: StationViewModel[];
}

export interface ListCardDispatchProps {
  retrieveStations(criteria: StationRequest): void;
}

type ListCardProps = ListCardOwnProps &
  ListCardStateProps &
  ListCardDispatchProps &
  SharedStyleProps &
  StyleProps;

const ListCard: FunctionComponent<ListCardProps> = (props) => {
  useEffect(() => {
    if (!props.isLoading && props.searchCriteria) {
      props.retrieveStations(props.searchCriteria);
    }
  });

  const iconBySignalStrength = (signal?: number) => {
    if (!signal) {
      return <SignalWifiOffIcon />;
    } else if (signal < 0.15) {
      return <SignalWifi0BarIcon />;
    } else if (signal < 0.35) {
      return <SignalWifi1BarIcon />;
    } else if (signal < 0.55) {
      return <SignalWifi2BarIcon />;
    } else if (signal < 0.75) {
      return <SignalWifi3BarIcon />;
    } else {
      return <SignalWifi4BarIcon />;
    }
  };

  const renderStation = (station: StationViewModel, index: number) => {
    return (
      <ListItem
        key={index}
        button
        dense={true}
        selected={station === props.selected}
        onClick={(event) => props.onStationClick(station, event)}
      >
        <ListItemAvatar>
          <Avatar className={props.classes?.avatar}>{indexToChar(index)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${station.callSign} ${station.protocol} ${station.frequency}`}
          secondary={`Format: ${station.format}${
            station.distance ? `, ${(station.distance / 1000).toFixed(1)} km` : ''
          }`}
        />
        <ListItemSecondaryAction>
          {iconBySignalStrength(station.signalStrength)}
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">Station List</Typography>
      </AccordionSummary>
      <AccordionDetails className={clsx(props.classes?.accordionDetails, props.classes?.container)}>
        <LoadingSpinner isLoading={props.isLoading} message="Refreshing..." />
        <Collapse className={props.classes?.container} in={!props.isLoading}>
          <List className={clsx(props.classes?.container, props.classes?.list)}>
            {props.stations && props.stations.length > 0 ? (
              props.stations.map(renderStation)
            ) : (
              <ListItem>
                <ListItemText primary="No stations results" />
              </ListItem>
            )}
          </List>
        </Collapse>
      </AccordionDetails>
    </Accordion>
  );
};

export default withSharedStyles(styles)(ListCard);
