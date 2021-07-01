import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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

export interface PasswordResetPageStateProps {
  isLoggedIn: boolean;
}

export interface PasswordResetPageDispatchProps {
  getResetLink: (email: string) => void;
}

type PasswordResetPageProps = PasswordResetPageStateProps &
  PasswordResetPageDispatchProps &
  SharedStyleProps;

interface PasswordResetPageFields {
  email: string;
}
type PasswordResetPageField = keyof PasswordResetPageFields;

type PasswordResetPageState = FormComponentState<PasswordResetPageField>;

class PasswordResetPage extends React.Component<PasswordResetPageProps, PasswordResetPageState> {
  private readonly rules: ValidationRules<PasswordResetPageField> = {
    email: {
      label: 'Email Address',
      rules: [[ValidationRuleType.Required], [ValidationRuleType.Email]],
    },
  };

  private readonly validator = new Validator(this.rules);

  state = {
    fields: {
      email: '',
    },
    errors: this.validator.getDefaultErrorState(),
  };

  handleChange = handleFieldChange.bind(this);

  handleSubmit = handleDefaultFormSubmit(this, this.validator, () =>
    this.props.getResetLink(this.state.fields.email),
  );

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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes?.submit}
            >
              Send Reset Link
            </Button>
            <Grid container>
              <Grid item xs>
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

export default withSharedStyles()(PasswordResetPage);
