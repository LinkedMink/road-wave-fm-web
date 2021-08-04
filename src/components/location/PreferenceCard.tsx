/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { FormatSelection } from '../../types/Format';

const CHECKBOX_PREFIX = 'format';

export interface PreferenceCardStateProps {
  formats: FormatSelection[];
}

export interface PreferenceCardDispatchProps {
  selectFormats: (ids: string[]) => void;
}

type PreferenceCardProps = PreferenceCardStateProps &
  PreferenceCardDispatchProps &
  SharedStyleProps;

const PreferenceCard: FunctionComponent<PreferenceCardProps> = (props) => {
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

  const renderFormat = (format: FormatSelection) => {
    const name = checkboxName(format);
    return (
      <FormControlLabel
        control={
          <Checkbox checked={state[name]} onChange={handleChange} name={name} color="primary" />
        }
        label={format.name}
      />
    );
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">Preferences</Typography>
      </AccordionSummary>
      <AccordionDetails className={props.classes?.accordionDetails}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Formats</FormLabel>
          {props.formats.map(renderFormat)}
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};

export default withSharedStyles()(PreferenceCard);
