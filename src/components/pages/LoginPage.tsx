import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import {
  FormComponentState,
  ValidationRules,
  ValidationRuleType,
  Validator,
} from '../../shared/Validator';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { getLinkReference } from '../../shared/Element';
import { handleDefaultFormSubmit, handleFieldChange } from '../../shared/Form';

export interface LoginPageStateProps {
  isLoggedIn: boolean;
}

export interface LoginPageDispatchProps {
  login: (email: string, password: string, rememberMe: boolean) => void;
}

type LoginPageProps = LoginPageStateProps & LoginPageDispatchProps & SharedStyleProps;

interface LoginPageFields {
  email: string;
  password: string;
  rememberMe: boolean;
}
type LoginPageField = keyof LoginPageFields;

type LoginPageState = FormComponentState<LoginPageField>;

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  private readonly rules: ValidationRules<LoginPageField> = {
    email: {
      label: 'Email Address',
      rules: [[ValidationRuleType.Required]],
    },
    password: {
      label: 'Password',
      rules: [[ValidationRuleType.Required]],
    },
    rememberMe: {
      label: 'Remember Me',
      rules: [],
    },
  };

  private readonly validator = new Validator(this.rules);

  state = {
    fields: {
      email: '',
      password: '',
      rememberMe: false,
    },
    errors: this.validator.getDefaultErrorState(),
  };

  handleChange = handleFieldChange.bind(this);

  handleSubmit = handleDefaultFormSubmit(this, this.validator, () =>
    this.props.login(
      this.state.fields.email,
      this.state.fields.password,
      this.state.fields.rememberMe,
    ),
  );

  render = () => {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Container maxWidth="md">
        <Paper className={this.props.classes?.paper}>
          <Typography variant="h3">Login</Typography>
          <form className={this.props.classes?.form} onSubmit={this.handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={this.rules.email.label}
              name="email"
              autoComplete="email"
              type="email"
              value={this.state.fields.email}
              error={this.state.errors.email.isInvalid}
              helperText={this.state.errors.email.message}
              onChange={this.handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={this.rules.password.label}
              type="password"
              id="password"
              value={this.state.fields.password}
              error={this.state.errors.password.isInvalid}
              helperText={this.state.errors.password.message}
              onChange={this.handleChange}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="rememberMe"
                  value={this.state.fields.rememberMe}
                  color="primary"
                  onChange={this.handleChange}
                />
              }
              label={this.rules.rememberMe.label}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes?.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={getLinkReference('/password-reset')} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={getLinkReference('/register')} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    );
  };
}

export default withSharedStyles()(LoginPage);
