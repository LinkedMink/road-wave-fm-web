import { List, ListSubheader, Tooltip } from "@mui/material";
import { FunctionComponent, useContext, useMemo } from "react";
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
      }}
    >
      <List
        subheader={
          <Tooltip title="Find stations by the selected formats. If none are selected, the closest will be found.">
            <ListSubheader>Filter by Format</ListSubheader>
          </Tooltip>
        }
        sx={{
          width: "100%",
          alignItems: "stretch",
          overflow: "auto",
        }}
      >
        {formatsListElements}
      </List>
    </PagePaper>
  );
};
