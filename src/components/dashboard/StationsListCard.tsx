import { Collapse, List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import { FunctionComponent, useContext, useEffect, useMemo } from "react";
import { useLoaderData, useNavigation } from "react-router";
import { AlertActionType } from "../../definitions/alertConstants";
import { StationsActionType } from "../../definitions/dashboardConstants";
import {
  getResponseErrorMessage,
  isMessageResponse,
  isRpcErrorResponse,
} from "../../functions/fetchAuthClient";
import {
  MessageResponse,
  RpcErrorResponse,
  StationLocationViewModel,
} from "../../types/responseModels";
import { AlertContext } from "../shared/AlertProvider";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { PagePaper } from "../shared/PagePaper";
import { StationListItem } from "./StationListItem";
import { StationsContext } from "./providers/StationsProvider";

export const StationsListCard: FunctionComponent = () => {
  const navigation = useNavigation();
  const [_1, alertDispatch] = useContext(AlertContext);
  const loaderData = useLoaderData() as
    | null
    | MessageResponse
    | RpcErrorResponse
    | { result: { data: StationLocationViewModel[] } };
  const [stationsState, stationsDispatch] = useContext(StationsContext);
  useEffect(() => {
    if (!loaderData) {
      return;
    }

    if (isMessageResponse(loaderData) || isRpcErrorResponse(loaderData)) {
      alertDispatch({ type: AlertActionType.ERROR, payload: getResponseErrorMessage(loaderData) });
      return;
    }

    stationsDispatch({ type: StationsActionType.STORE, payload: loaderData.result.data });
  }, [alertDispatch, stationsDispatch, loaderData]);

  const stationsListElements = useMemo(
    () =>
      stationsState.list.map((station, index) => (
        <StationListItem
          key={station.id}
          model={station}
          index={index}
        />
      )),
    [stationsState.list]
  );

  const isLoading = navigation.state === "loading";
  return (
    <PagePaper
      sx={{
        position: "relative",
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <Collapse
        sx={{
          flex: "1",
          display: "flex",
          width: "100%",
          alignItems: "stretch",
        }}
        in={!isLoading}
      >
        <List
          subheader={<ListSubheader>Station List</ListSubheader>}
          sx={{
            height: "100%",
            overflow: "auto",
          }}
        >
          {stationsListElements.length > 0 ? (
            stationsListElements
          ) : (
            <ListItem>
              <ListItemText primary="No stations results" />
            </ListItem>
          )}
        </List>
      </Collapse>
      <LoadingSpinner
        isLoading={isLoading}
        message="Refreshing..."
      />
    </PagePaper>
  );
};
