import React, { ChangeEvent, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import { MIN_PASSWORD_LENGTH } from '../../types/Account';
import { FormComponentState, ValidationRules, ValidationRuleType, Validator } from '../../shared/Validator';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { getLinkReference } from '../../shared/Element';
import { handleDefaultFormSubmit, handleFieldChange } from '../../shared/Form';

export interface RegisterPageStateProps {
  isLoggedIn: boolean
}

export interface RegisterPageDispatchProps {
  register: (email: string, password: string) => void
}

type RegisterPageProps = RegisterPageStateProps & RegisterPageDispatchProps & SharedStyleProps

interface RegisterPageFields {
  email: string
  password: string
  confirmPassword: string
}

type RegisterPageState = FormComponentState<RegisterPageFields>

class RegisterPage extends React.Component<RegisterPageProps, RegisterPageState> {
  private readonly rules: ValidationRules<RegisterPageFields> = {
    email: {
      label: 'Email Address',
      rules: [[ValidationRuleType.Required], [ValidationRuleType.Email]],
    },
    password: {
      label: 'Password',
      rules: [[ValidationRuleType.Required], [ValidationRuleType.Length, MIN_PASSWORD_LENGTH]],
    },
    confirmPassword: {
      label: 'Confirm Password',
      rules: [[ValidationRuleType.Required], [ValidationRuleType.Compare, 'password']],
    },
  };
  
  private readonly validator = new Validator(this.rules);

  state = {
    fields: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    errors: this.validator.getDefaultErrorState(),
  };

  handleChange = handleFieldChange.bind(this);

  handleSubmit = handleDefaultFormSubmit(
    this,
    this.validator,
    () => this.props.register(this.state.fields.email, this.state.fields.password));

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Container maxWidth="md">
        <Paper className={this.props.classes?.paper}>
          <Typography variant="h3">Register</Typography>
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
              onChange={this.handleChange}
              value={this.state.fields.email}
              error={this.state.errors.email.isInvalid}
              helperText={this.state.errors.email.message}
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
              value={this.state.fields.password}
              error={this.state.errors.password.isInvalid}
              helperText={this.state.errors.password.message}
              onChange={this.handleChange}
              id="password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label={this.rules.confirmPassword.label}
              type="password"
              value={this.state.fields.confirmPassword}
              error={this.state.errors.confirmPassword.isInvalid}
              helperText={this.state.errors.confirmPassword.message}
              onChange={this.handleChange}
              id="confirmPassword"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes?.submit}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link component={getLinkReference('/login')} variant="body2">
                  {'Already have an account? Login'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    );
  }
}

export default withSharedStyles()(RegisterPage);
