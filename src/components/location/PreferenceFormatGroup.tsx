import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  StyledComponentProps,
  StyleRulesCallback,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { FormatViewModel } from '../../types/Format';

const LABEL_PREFIX = 'format-label-';

type StyleClass = 'list';
type StyleProps = StyledComponentProps<StyleClass>;

const styles: StyleRulesCallback<Theme, Record<string, unknown>, StyleClass> = (theme: Theme) => ({
  list: {
    maxHeight: theme.spacing(45),
    overflow: 'auto',
  },
});

export interface PreferenceFormatGroupStateProps {
  formats: FormatViewModel[];
  selected: string[];
}

export interface PreferenceFormatGroupDispatchProps {
  selectFormats: (ids: string[]) => void;
}

type PreferenceFormatGroupProps = PreferenceFormatGroupStateProps &
  PreferenceFormatGroupDispatchProps &
  SharedStyleProps &
  StyleProps;

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
    <Box className={props.classes?.columnBox}>
      <Tooltip title="Find stations by the selected formats. If none are selected, the closest will be found.">
        <Typography variant="h6">Filter by Format</Typography>
      </Tooltip>
      <List className={props.classes?.list}>{props.formats.map(renderFormat)}</List>
    </Box>
  );
};

export default withSharedStyles(styles)(PreferenceFormatGroup);
