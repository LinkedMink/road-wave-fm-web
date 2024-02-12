import { Button, List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import { FunctionComponent, useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { FormatsContext } from "../../providers/FormatsProvider";
import { PagePaper } from "../styled/PagePaper";
import { FormatListItem } from "./FormatListItem";

export const FormatsListCard: FunctionComponent = () => {
  const [formatsState] = useContext(FormatsContext);

  const formatsListElements = useMemo(
    () =>
      formatsState.list.map(f => (
        <FormatListItem
          key={f.id}
          model={f}
        />
      )),
    [formatsState.list]
  );

  return (
    <PagePaper
      sx={{
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <List
        subheader={<ListSubheader>Filter by Format</ListSubheader>}
        sx={{
          flex: "1 1 auto",
          width: "100%",
          alignItems: "stretch",
          overflow: "auto",
        }}
      >
        {formatsListElements.length > 0 ? (
          formatsListElements
        ) : (
          <ListItem>
            <ListItemText primary="No format results" />
          </ListItem>
        )}
      </List>
      <Button
        component={NavLink}
        variant="contained"
        fullWidth
        to={"/stations"}
        sx={{ marginTop: 2 }}
      >
        Filter
      </Button>
    </PagePaper>
  );
};
