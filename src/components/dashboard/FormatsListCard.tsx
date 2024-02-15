import { Box, Button, List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import { FunctionComponent, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FormatsActionType } from "../../definitions/dashboardConstants";
import { FormatsContext } from "../../providers/FormatsProvider";
import { PagePaper } from "../styled/PagePaper";
import { FormatListItem } from "./FormatListItem";

export const FormatsListCard: FunctionComponent = () => {
  const [formatsState, formatsDispatch] = useContext(FormatsContext);
  const navigate = useNavigate();

  const confirmSelect = useCallback(() => {
    formatsDispatch({ type: FormatsActionType.SELECT_CONFIRM });
    navigate(-1);
  }, [formatsDispatch, navigate]);

  const cancelSelect = useCallback(() => {
    formatsDispatch({ type: FormatsActionType.SELECT_CANCEL });
    navigate(-1);
  }, [formatsDispatch, navigate]);

  const selectFormat = useCallback(
    (formatId: string) => {
      formatsDispatch({ type: FormatsActionType.SELECT, payload: formatId });
    },
    [formatsDispatch]
  );

  const formatsListElements = useMemo(
    () =>
      formatsState.list.map(f => (
        <FormatListItem
          key={f.id}
          model={f}
          onFormatSelect={selectFormat}
        />
      )),
    [formatsState.list, selectFormat]
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
          flex: "1",
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
      <Box sx={{ mt: 2, display: "flex" }}>
        <Button
          variant="outlined"
          onClick={cancelSelect}
          sx={{ mr: 2, flex: "1" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={confirmSelect}
          sx={{ flex: "1" }}
        >
          Filter
        </Button>
      </Box>
    </PagePaper>
  );
};
