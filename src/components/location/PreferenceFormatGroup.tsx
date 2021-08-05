/* eslint-disable react/prop-types */
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel } from '@material-ui/core';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { FormatSelection } from '../../types/Format';

const CHECKBOX_PREFIX = 'format';

export interface PreferenceFormatGroupStateProps {
  formats: FormatSelection[];
}

export interface PreferenceFormatGroupDispatchProps {
  selectFormats: (ids: string[]) => void;
}

type PreferenceFormatGroupProps = PreferenceFormatGroupStateProps &
  PreferenceFormatGroupDispatchProps &
  SharedStyleProps;

const PreferenceFormatGroup: FunctionComponent<PreferenceFormatGroupProps> = (props) => {
  const checkboxName = (format: FormatSelection) => CHECKBOX_PREFIX + format.id;

  const checkboxState = props.formats.reduce((acc, next) => {
    acc[next.id] = next.isSelected;
    return acc;
  }, {} as Record<string, boolean>);

  const [state, setState] = React.useState(checkboxState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formatId = event.target.name.substring(event.target.name.length - CHECKBOX_PREFIX.length);
    setState({ ...state, [formatId]: event.target.checked });

    const selected = Object.keys(state).filter((id) => state[id]);
    props.selectFormats(selected);
  };

  const renderFormat = (format: FormatSelection, index: number) => {
    const name = checkboxName(format);
    return (
      <FormControlLabel
        key={index}
        control={
          <Checkbox checked={state[name]} onChange={handleChange} name={name} color="primary" />
        }
        label={format.name}
      />
    );
  };

  return (
    <Box className={props.classes?.columnBox}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Formats</FormLabel>
        {props.formats.map(renderFormat)}
      </FormControl>
    </Box>
  );
};

export default withSharedStyles()(PreferenceFormatGroup);
