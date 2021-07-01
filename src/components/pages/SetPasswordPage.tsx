import React, { ChangeEvent, FormEvent } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import { FormComponentState, ValidationRules, ValidationRuleType, Validator } from '../../shared/Validator';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { getLinkReference } from '../../shared/Element';
import { handleDefaultFormSubmit, handleFieldChange } from '../../shared/Form';

export interface SetPasswordPageStateProps {
  isLoggedIn: boolean
}

export interface SetPasswordPageDispatchProps {
  resetPassword: (email: string, resetToken: string, password: string) => void
}

interface SetPasswordParams {
  email: string;
  resetToken: string;
}

type SetPasswordPageProps = SetPasswordPageStateProps & SetPasswordPageDispatchProps & RouteComponentProps<SetPasswordParams> & SharedStyleProps

interface SetPasswordPageFields {
  password: string
  confirmPassword: string
}

type SetPasswordPageState = FormComponentState<SetPasswordPageFields>

class SetPasswordPage extends React.Component<SetPasswordPageProps, SetPasswordPageState> {
  private readonly rules: ValidationRules<SetPasswordPageFields> = {
    password: {
      label: 'Password',
      rules: [[ValidationRuleType.Required], [ValidationRuleType.Length, 8]],
    },
    confirmPassword: {
      label: 'Confirm Password',
      rules: [[ValidationRuleType.Required], [ValidationRuleType.Compare, 'password']],
    },
  };

  private readonly validator = new Validator(this.rules);

  state = {
    fields: {
      password: '',
      confirmPassword: '',
    },
    errors: this.validator.getDefaultErrorState(),
  };

  handleChange = handleFieldChange.bind(this);

  handleSubmit = handleDefaultFormSubmit(
    this,
    this.validator,
    () => {
      const { email, resetToken } = this.props.match.params;
      this.props.resetPassword(email, resetToken, this.state.fields.password);
    });

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Container maxWidth="md">
        <Paper className={this.props.classes?.paper}>
          <Typography variant="h3">Reset Password</Typography>
          <form className={this.props.classes?.form} onSubmit={this.handleSubmit} noValidate>
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
              Reset Password
            </Button>
            <Grid container>
              <Grid item>
                <Link component={getLinkReference('/login')} variant="body2">
                  {'Already know your password? Login'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    );
  }
}

export default withSharedStyles()(SetPasswordPage);
