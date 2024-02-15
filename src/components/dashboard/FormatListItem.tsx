import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { FunctionComponent, useContext } from "react";
import { FormatsContext } from "../../providers/FormatsProvider";
import { FormatViewModel } from "../../types/responseModels";

const LABEL_PREFIX = "format-";

const FormatCheckbox: FunctionComponent<{ id: string; labelId: string }> = props => {
  const [formatsState] = useContext(FormatsContext);
  return (
    <Checkbox
      edge="start"
      checked={formatsState.selectedPending.has(props.id)}
      tabIndex={-1}
      disableRipple
      inputProps={{ "aria-labelledby": props.labelId }}
    />
  );
};

export type FormatListItemProps = {
  model: FormatViewModel;
  onFormatSelect: (formatId: string) => void;
};

export const FormatListItem: FunctionComponent<FormatListItemProps> = props => {
  const labelId = LABEL_PREFIX + props.model.id;
  return (
    <ListItem
      dense={true}
      disablePadding
      onClick={() => props.onFormatSelect(props.model.id)}
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
