import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import PreferenceFormatGroupContainer from '../../containers/location/PreferenceFormatGroupContainer';
import PreferenceLocationGroupContainer from '../../containers/location/PreferenceLocationGroupContainer';
import { DividedAccordianDetails } from '../../shared/Style';

const PreferenceCard: FunctionComponent = (_props) => {
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">Preferences</Typography>
      </AccordionSummary>
      <DividedAccordianDetails
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          '& > div': {
            marginBottom: theme.spacing(2),
          },
        })}
      >
        <PreferenceLocationGroupContainer />
        <PreferenceFormatGroupContainer />
      </DividedAccordianDetails>
    </Accordion>
  );
};

export default PreferenceCard;
