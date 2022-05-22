import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { default as React, useEffect } from 'react';
import { PagePaper } from '../../shared/Style';

export interface LoginPageStateProps {
  isLoggedIn: boolean;
}

export interface LoginPageDispatchProps {
  login: (email: string, password: string, rememberMe: boolean) => void;
}

type LoginPageProps = LoginPageStateProps & LoginPageDispatchProps;

const LoginPage: React.FunctionComponent<LoginPageProps> = (_props) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {});

  return (
    <Container maxWidth="md">
      <PagePaper>
        <Typography variant="h3">Login</Typography>
        <div
          id="g_id_onload"
          data-client_id="210926201801-nupifpbh3f9bop7mre0192npe6as1kgi.apps.googleusercontent.com"
          data-login_uri={`${window.location.origin}/login`}
          data-auto_prompt="false"
        ></div>
        <div
          className="g_id_signin"
          data-type="standard"
          data-size="large"
          data-theme="outline"
          data-text="sign_in_with"
          data-shape="rectangular"
          data-logo_alignment="left"
        ></div>
      </PagePaper>
    </Container>
  );
};

export default LoginPage;
