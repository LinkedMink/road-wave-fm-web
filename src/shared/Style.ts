import { AccordionDetails, Box, Paper, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PagePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
  '& a': {
    color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : undefined,
  },
}));

export const DividedAccordianDetails = styled(AccordionDetails)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(2),
}));

export const ColumnBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

(theme: Theme) => ({
  vSpace2: {
    marginBottom: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
