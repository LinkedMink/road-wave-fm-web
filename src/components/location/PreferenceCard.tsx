/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  StyledComponentProps,
  StyleRulesCallback,
  Theme,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import React, { FunctionComponent } from 'react';
import PreferenceFormatGroupContainer from '../../containers/location/PreferenceFormatGroupContainer';
import PreferenceLocationGroupContainer from '../../containers/location/PreferenceLocationGroupContainer';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';

type StyleClass = 'sections';
type StyleProps = StyledComponentProps<StyleClass>;

const styles: StyleRulesCallback<Theme, Record<string, unknown>, StyleClass> = (theme: Theme) => ({
  sections: {
    '& > div': {
      marginBottom: theme.spacing(2),
    },
  },
});

type PreferenceCardProps = SharedStyleProps & StyleProps;

const PreferenceCard: FunctionComponent<PreferenceCardProps> = (props) => {
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">Preferences</Typography>
      </AccordionSummary>
      <AccordionDetails
        className={clsx(
          props.classes?.accordionDetails,
          props.classes?.columnBox,
          props.classes?.sections,
        )}
      >
        <PreferenceLocationGroupContainer />
        <PreferenceFormatGroupContainer />
      </AccordionDetails>
    </Accordion>
  );
};

export default withSharedStyles(styles)(PreferenceCard);
