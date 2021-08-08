/* eslint-disable react/prop-types */
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Typography,
} from '@material-ui/core';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { FormatViewModel } from '../../types/Format';

const CHECKBOX_PREFIX = 'format';

export interface PreferenceFormatGroupStateProps {
  formats: FormatViewModel[];
  selected: string[];
}

export interface PreferenceFormatGroupDispatchProps {
  selectFormats: (ids: string[]) => void;
}

type PreferenceFormatGroupProps = PreferenceFormatGroupStateProps &
  PreferenceFormatGroupDispatchProps &
  SharedStyleProps;

const PreferenceFormatGroup: FunctionComponent<PreferenceFormatGroupProps> = (props) => {
  const selected = new Set(props.selected);

  const checkboxName = (format: FormatViewModel) => CHECKBOX_PREFIX + format.id;

  // const checkboxState = props.formats.reduce((acc, next) => {
  //   acc[next.id] = selected.has(next.id);
  //   return acc;
  // }, {} as Record<string, boolean>);

  // const [state, setState] = React.useState(checkboxState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formatId = event.target.name.substring(CHECKBOX_PREFIX.length);
    if (event.target.checked) {
      selected.add(formatId);
    } else {
      selected.delete(formatId);
    }
    // setState({ ...state, [formatId]: event.target.checked });

    // const selected = Object.keys(state).filter((id) => state[id]);
    props.selectFormats(Array.from(selected));
  };

  const renderFormat = (format: FormatViewModel, index: number) => {
    const name = checkboxName(format);
    const checked = selected.has(format.id);
    return (
      <FormControlLabel
        key={index}
        control={<Checkbox checked={checked} onChange={handleChange} name={name} color="primary" />}
        label={format.name}
      />
    );
  };

  return (
    <Box className={props.classes?.columnBox}>
      <Typography variant="h6">Filter By</Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Formats</FormLabel>
        {props.formats.map(renderFormat)}
      </FormControl>
    </Box>
  );
};

export default withSharedStyles()(PreferenceFormatGroup);
