import { ListItem, ListItemIcon, Checkbox, ListItemText, ListItemButton } from "@mui/material";
import { FunctionComponent, useCallback, useContext } from "react";
import { FormatViewModel } from "../../types/responseModels";
import { FormatsContext } from "../../providers/FormatsProvider";
import { FormatsActionType } from "../../definitions/dashboardConstants";

const LABEL_PREFIX = "format-";

const FormatCheckbox: FunctionComponent<{ id: string; labelId: string }> = props => {
  const [formatsState] = useContext(FormatsContext);
  return (
    <Checkbox
      edge="start"
      checked={formatsState.selected.has(props.id)}
      tabIndex={-1}
      disableRipple
      inputProps={{ "aria-labelledby": props.labelId }}
    />
  );
};

export type FormatListItemProps = {
  model: FormatViewModel;
};

export const FormatListItem: FunctionComponent<FormatListItemProps> = props => {
  const [_, formatsDispatch] = useContext(FormatsContext);
  const handleChange = useCallback(() => {
    formatsDispatch({ type: FormatsActionType.SELECT, payload: props.model.id });
  }, [formatsDispatch, props.model.id]);

  const labelId = LABEL_PREFIX + props.model.id;
  return (
    <ListItem
      dense={true}
      onClick={handleChange}
    >
      <ListItemButton>
        <ListItemIcon>
          <FormatCheckbox
            id={props.model.id}
            labelId={labelId}
          />
        </ListItemIcon>
        <ListItemText
          id={labelId}
          primary={props.model.name}
        />
      </ListItemButton>
    </ListItem>
  );
};
