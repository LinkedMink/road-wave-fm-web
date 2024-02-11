import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FunctionComponent, useContext } from "react";
import { FormatViewModel } from "../../types/responseModels";
import { FormatsContext } from "../../providers/FormatsProvider";
import { FormatsActionType } from "../../definitions/dashboardConstants";

const LABEL_PREFIX = "format-label-";

export const FormatsListCard: FunctionComponent = () => {
  const [formatsState, formatsDispatch] = useContext(FormatsContext);
  const selected = new Set(formatsState.selected);

  const handleChange = (formatId: string) => {
    if (selected.has(formatId)) {
      selected.delete(formatId);
    } else {
      selected.add(formatId);
    }

    formatsDispatch({ type: FormatsActionType.SELECT, payload: Array.from(selected) });
  };

  const renderFormat = (format: FormatViewModel, index: number) => {
    const labelId = LABEL_PREFIX + format.id;
    const checked = selected.has(format.id);
    return (
      <ListItem
        key={index}
        role={undefined}
        dense={true}
        button
        onClick={() => handleChange(format.id)}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText
          id={labelId}
          primary={format.name}
        />
      </ListItem>
    );
  };

  return (
    <Stack>
      <Tooltip title="Find stations by the selected formats. If none are selected, the closest will be found.">
        <Typography variant="h6">Filter by Format</Typography>
      </Tooltip>
      <List
        sx={theme => ({
          maxHeight: theme.spacing(42),
          overflow: "auto",
        })}
      >
        {Array.from(formatsState.map.values()).map(renderFormat)}
      </List>
    </Stack>
  );
};
