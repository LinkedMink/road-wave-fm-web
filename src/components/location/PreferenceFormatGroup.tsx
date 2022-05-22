import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { FunctionComponent } from 'react';
import { FormatViewModel } from '../../definitions/ResponseModels';
import { ColumnBox } from '../../shared/Style';

const LABEL_PREFIX = 'format-label-';

export interface PreferenceFormatGroupStateProps {
  formats: FormatViewModel[];
  selected: string[];
}

export interface PreferenceFormatGroupDispatchProps {
  selectFormats: (ids: string[]) => void;
}

type PreferenceFormatGroupProps = PreferenceFormatGroupStateProps &
  PreferenceFormatGroupDispatchProps;

const PreferenceFormatGroup: FunctionComponent<PreferenceFormatGroupProps> = (props) => {
  const selected = new Set(props.selected);

  const handleChange = (formatId: string) => {
    if (selected.has(formatId)) {
      selected.delete(formatId);
    } else {
      selected.add(formatId);
    }

    props.selectFormats(Array.from(selected));
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
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={format.name} />
      </ListItem>
    );
  };

  return (
    <ColumnBox>
      <Tooltip title="Find stations by the selected formats. If none are selected, the closest will be found.">
        <Typography variant="h6">Filter by Format</Typography>
      </Tooltip>
      <List
        sx={(theme) => ({
          maxHeight: theme.spacing(42),
          overflow: 'auto',
        })}
      >
        {props.formats.map(renderFormat)}
      </List>
    </ColumnBox>
  );
};

export default PreferenceFormatGroup;
