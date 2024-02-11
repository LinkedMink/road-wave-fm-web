import { Collapse, List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import { FunctionComponent, useContext, useMemo } from "react";
import { StationsContext } from "../../providers/StationsProvider";
import { LoadingSpinner } from "../styled/LoadingSpinner";
import { PagePaper } from "../styled/PagePaper";
import { StationListItem } from "./StationListItem";
import { useNavigation } from "react-router";

export const StationsListCard: FunctionComponent = () => {
  const navigation = useNavigation();
  const [stationsState] = useContext(StationsContext);

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
