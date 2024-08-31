import SignalWifi0BarIcon from "@mui/icons-material/SignalWifi0Bar";
import SignalWifi1BarIcon from "@mui/icons-material/SignalWifi1Bar";
import SignalWifi2BarIcon from "@mui/icons-material/SignalWifi2Bar";
import SignalWifi3BarIcon from "@mui/icons-material/SignalWifi3Bar";
import SignalWifi4BarIcon from "@mui/icons-material/SignalWifi4Bar";
import SignalWifiOffIcon from "@mui/icons-material/SignalWifiOff";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { FunctionComponent, useContext } from "react";
import { StationsActionType } from "../../definitions/dashboardConstants";
import { indexToChar } from "../../functions/collection";
import { StationLocationViewModel } from "../../types/responseModels";
import { StationsContext } from "./providers/StationsProvider";

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

export type StationListItemProps = {
  index: number;
  model: StationLocationViewModel;
};

export const StationListItem: FunctionComponent<StationListItemProps> = props => {
  const [stationsState, stationsDispatch] = useContext(StationsContext);

  return (
    <ListItem
      dense={true}
      disablePadding
      onClick={() => {
        stationsDispatch({ type: StationsActionType.SELECT, payload: props.model });
      }}
    >
      <ListItemButton selected={props.model === stationsState.selected}>
        <ListItemAvatar>
          <Avatar
            sx={theme => ({
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
            })}
          >
            {indexToChar(props.index)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${props.model.callSign} ${props.model.protocol} ${props.model.frequency}`}
          secondary={`Format: ${props.model.format}${
            props.model.distance ? `, ${(props.model.distance / 1000).toFixed(1)} km` : ""
          }`}
        />
        <ListItemSecondaryAction>
          {iconBySignalStrength(props.model.signalStrength)}
        </ListItemSecondaryAction>
      </ListItemButton>
    </ListItem>
  );
};
