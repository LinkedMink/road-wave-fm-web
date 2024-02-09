import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SignalWifi0BarIcon from "@mui/icons-material/SignalWifi0Bar";
import SignalWifi1BarIcon from "@mui/icons-material/SignalWifi1Bar";
import SignalWifi2BarIcon from "@mui/icons-material/SignalWifi2Bar";
import SignalWifi3BarIcon from "@mui/icons-material/SignalWifi3Bar";
import SignalWifi4BarIcon from "@mui/icons-material/SignalWifi4Bar";
import SignalWifiOffIcon from "@mui/icons-material/SignalWifiOff";
import {
  Accordion,
  AccordionSummary,
  Avatar,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import { StationRequest } from "../../definitions/RequestModels";
import { StationViewModel } from "../../definitions/ResponseModels";
import { indexToChar } from "../../shared/Collection";
import { DividedAccordianDetails } from "../../shared/Style";
import LoadingSpinner from "../LoadingSpinner";

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

type ListCardProps = ListCardOwnProps & ListCardStateProps & ListCardDispatchProps;

const ListCard: FunctionComponent<ListCardProps> = props => {
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
        onClick={event => props.onStationClick(station, event)}
      >
        <ListItemAvatar>
          <Avatar
            sx={theme => ({
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
            })}
          >
            {indexToChar(index)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${station.callSign} ${station.protocol} ${station.frequency}`}
          secondary={`Format: ${station.format}${
            station.distance ? `, ${(station.distance / 1000).toFixed(1)} km` : ""
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
      <DividedAccordianDetails sx={{ width: "100%", alignItems: "stretch" }}>
        <LoadingSpinner
          isLoading={props.isLoading}
          message="Refreshing..."
        />
        <Collapse
          sx={{
            width: "100%",
            alignItems: "stretch",
          }}
          in={!props.isLoading}
        >
          <List
            sx={theme => ({
              width: "100%",
              alignItems: "stretch",
              maxHeight: theme.spacing(50),
              overflow: "auto",
            })}
          >
            {props.stations && props.stations.length > 0 ? (
              props.stations.map(renderStation)
            ) : (
              <ListItem>
                <ListItemText primary="No stations results" />
              </ListItem>
            )}
          </List>
        </Collapse>
      </DividedAccordianDetails>
    </Accordion>
  );
};

export default ListCard;
