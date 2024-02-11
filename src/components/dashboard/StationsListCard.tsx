import SignalWifi0BarIcon from "@mui/icons-material/SignalWifi0Bar";
import SignalWifi1BarIcon from "@mui/icons-material/SignalWifi1Bar";
import SignalWifi2BarIcon from "@mui/icons-material/SignalWifi2Bar";
import SignalWifi3BarIcon from "@mui/icons-material/SignalWifi3Bar";
import SignalWifi4BarIcon from "@mui/icons-material/SignalWifi4Bar";
import SignalWifiOffIcon from "@mui/icons-material/SignalWifiOff";
import {
  Avatar,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { FunctionComponent, useContext } from "react";
import { StationsActionType } from "../../definitions/dashboardConstants";
import { indexToChar } from "../../functions/collection";
import { StationsContext } from "../../providers/StationsProvider";
import { StationViewModel } from "../../types/responseModels";
import { LoadingSpinner } from "../styled/LoadingSpinner";
import { PagePaper } from "../styled/PagePaper";

export const StationsListCard: FunctionComponent = () => {
  const [stationsState, stationsDispatch] = useContext(StationsContext);

  // useEffect(() => {
  //   if (!stationsState.isLoading && props.searchCriteria) {

  //     props.retrieveStations(props.searchCriteria);
  //   }
  // }, [props]);

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
        selected={station === stationsState.selected}
        onClick={_ => stationsDispatch({ type: StationsActionType.Select, payload: station })}
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
    <PagePaper
      sx={{
        display: "flex",
        flex: "1 1 auto",
      }}
    >
      <LoadingSpinner
        isLoading={stationsState.isLoading}
        message="Refreshing..."
      />
      <Collapse
        sx={{
          width: "100%",
          alignItems: "stretch",
        }}
        in={!stationsState.isLoading}
      >
        <List
          subheader={<ListSubheader>Station List</ListSubheader>}
          sx={theme => ({
            width: "100%",
            alignItems: "stretch",
            maxHeight: theme.spacing(50),
            overflow: "auto",
          })}
        >
          {stationsState.list && stationsState.list.length > 0 ? (
            stationsState.list.map(renderStation)
          ) : (
            <ListItem>
              <ListItemText primary="No stations results" />
            </ListItem>
          )}
        </List>
      </Collapse>
    </PagePaper>
  );
};
