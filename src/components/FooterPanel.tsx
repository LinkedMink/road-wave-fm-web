import { Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { getLinkReference } from '../shared/Element';

const FooterTypography = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  borderLeft: `1px solid ${theme.palette.divider}`,
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 4),
  },
  '&:last-child': {
    borderRight: 'none',
  },
}));

class FooterPanel extends React.Component {
  render() {
    return (
      <Box
        pt={4}
        sx={(theme) => ({
          marginLeft: theme.spacing(4),
          display: 'flex',
          flexDirection: 'column',
          padding: theme.spacing(2, 0),
          [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
          },
          '& a': {
            color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : undefined,
          },
        })}
      >
        <FooterTypography variant="body1" color="textSecondary">
          <Link component={getLinkReference('/document/privacy_policy')}>Privacy Policy</Link>
        </FooterTypography>
        <FooterTypography variant="body1" color="textSecondary">
          <Link component={getLinkReference('/document/LICENSE')}>License</Link>
        </FooterTypography>
        <FooterTypography variant="body1" color="textSecondary">
          {'Copyright © '}
          {new Date().getFullYear()}
          {' Harlan Sang.'}
        </FooterTypography>
      </Box>
    );
  }
}

export default FooterPanel;
