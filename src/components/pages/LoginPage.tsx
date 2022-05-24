import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';
import { PagePaper } from '../../shared/Style';

export interface LoginPageStateProps {
  googleOAuthClientId: string | null;
}

type LoginPageProps = LoginPageStateProps;

const LoginPage: React.FunctionComponent<LoginPageProps> = (props) => {
  return (
    <Container maxWidth="sm">
      <PagePaper>
        <Typography variant="h3">Login</Typography>
        <Box
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'center',
            margin: theme.spacing(4, 0),
          })}
        >
          {props.googleOAuthClientId && (
            <Box
              className="g_id_signin"
              data-type="standard"
              data-size="large"
              data-theme="outline"
              data-text="sign_in_with"
              data-shape="rectangular"
              data-logo_alignment="left"
            ></Box>
          )}
        </Box>
      </PagePaper>
    </Container>
  );
};

export default LoginPage;
