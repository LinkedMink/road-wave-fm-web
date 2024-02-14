import { Collapse, List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import { FunctionComponent, useContext, useEffect, useMemo } from "react";
import { useLoaderData, useNavigation } from "react-router";
import { MessageResponse, StationViewModel } from "../../types/responseModels";
import { LoadingSpinner } from "../styled/LoadingSpinner";
import { PagePaper } from "../styled/PagePaper";
import { StationListItem } from "./StationListItem";
import { AlertContext } from "../../providers/AlertProvider";
import { AlertActionType } from "../../definitions/alertConstants";
import { isMessageResponse } from "../../functions/fetchAuthClient";
import { StationsContext } from "../../providers/StationsProvider";
import { StationsActionType } from "../../definitions/dashboardConstants";

export const StationsListCard: FunctionComponent = () => {
  const navigation = useNavigation();
  const [_1, alertDispatch] = useContext(AlertContext);
  const loaderData = useLoaderData() as null | MessageResponse | StationViewModel[];
  const [stationsState, stationsDispatch] = useContext(StationsContext);

  useEffect(() => {
    if (!loaderData) {
      return;
    }

    if (isMessageResponse(loaderData)) {
      alertDispatch({ type: AlertActionType.ERROR, payload: loaderData.message });
      return;
    }

    stationsDispatch({ type: StationsActionType.STORE, payload: loaderData });
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
      }}
    >
      <Collapse
        sx={{
          width: "100%",
          alignItems: "stretch",
        }}
        in={!isLoading}
      >
        <List
          subheader={<ListSubheader>Station List</ListSubheader>}
          sx={{
            width: "100%",
            alignItems: "stretch",
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