import { Collapse, List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import { FunctionComponent, useContext, useMemo } from "react";
import { useLoaderData, useNavigation } from "react-router";
import { MessageResponse, StationViewModel } from "../../types/responseModels";
import { LoadingSpinner } from "../styled/LoadingSpinner";
import { PagePaper } from "../styled/PagePaper";
import { StationListItem } from "./StationListItem";
import { AlertContext } from "../../providers/AlertProvider";
import { AlertActionType } from "../../definitions/alertConstants";
import { isMessageResponse } from "../../functions/fetchAuthClient";

export const StationsListCard: FunctionComponent = () => {
  const navigation = useNavigation();
  const [_, alertDispatch] = useContext(AlertContext);
  const loaderData = useLoaderData() as null | MessageResponse | StationViewModel[];
  // const [stationsState] = useContext(StationsContext);

  const stationsListElements = useMemo(() => {
    if (!loaderData) {
      return [];
    }

    if (isMessageResponse(loaderData)) {
      alertDispatch({ type: AlertActionType.ERROR, payload: loaderData.message });
      return [];
    }

    return loaderData.map((station, index) => (
      <StationListItem
        key={station.id}
        model={station}
        index={index}
      />
    ));
  }, [alertDispatch, loaderData]);

  const isLoading = navigation.state === "loading";
  return (
    <PagePaper
      sx={{
        display: "flex",
        flex: "1 1 auto",
      }}
    >
      <LoadingSpinner
        isLoading={isLoading}
        message="Refreshing..."
      />
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
    </PagePaper>
  );
};
