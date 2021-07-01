import React, { FormEvent, MouseEvent } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { AccountModel, MIN_PASSWORD_LENGTH } from '../../types/Account';
import {
  FormComponentState,
  ValidationRules,
  ValidationRuleType,
  Validator,
} from '../../shared/Validator';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { handleFieldChange } from '../../shared/Form';

export interface AccountPageStateProps {
  profile?: AccountModel;
  deleteConfirmResult?: boolean;
}

export interface AccountPageDispatchProps {
  getAccountData: () => void;
  deleteConfirm: () => void;
  deleteAccountData: () => void;
  saveAccountData: (data: Partial<AccountPageFields>) => void;
}

type AccountPageProps = AccountPageStateProps & AccountPageDispatchProps & SharedStyleProps;

interface AccountPageFields {
  email: string;
  password: string;
  confirmPassword: string;
}
type AccountPageField = keyof AccountPageFields;

type AccountPageState = FormComponentState<AccountPageField>;

class AccountPage extends React.Component<AccountPageProps, AccountPageState> {
  private readonly rules: ValidationRules<AccountPageField> = {
    email: {
      label: 'Email Address',
      rules: [[ValidationRuleType.Email]],
    },
    password: {
      label: 'Password',
      rules: [[ValidationRuleType.Length, MIN_PASSWORD_LENGTH]],
    },
    confirmPassword: {
      label: 'Confirm Password',
      rules: [[ValidationRuleType.Compare, 'password']],
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

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!this.isDirty()) {
      return;
    }

    const dirtyProperties: Partial<AccountPageFields> = {};
    if (this.state.fields.email !== this.props.profile?.email) {
      dirtyProperties.email = this.state.fields.email;
    }

    if (this.state.fields.password !== '') {
      dirtyProperties.password = this.state.fields.password;
    }

    const result = this.validator.validate(this.state.fields);
    this.setState({ errors: result.errors });

    if (result.isValid) {
      this.props.saveAccountData(dirtyProperties);
    }
  };

  handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (this.props.deleteConfirm) {
      this.props.deleteConfirm();
    }
  };

  isDirty = () => {
    return (
      this.props.profile &&
      (this.state.fields.email !== this.props.profile.email || this.state.fields.password !== '')
    );
  };

  getProfile = (): AccountModel | Record<string, never> => {
    if (!this.props.profile) {
      this.props.getAccountData();

      return {};
    }

    return this.props.profile;
  };

  componentDidUpdate = (
    prevProps: Readonly<AccountPageProps>,
    _prevState: Readonly<AccountPageState>,
    _snapshot: Record<string, never>,
  ) => {
    if (!prevProps.profile && this.props.profile) {
      this.setState({
        fields: {
          ...this.state.fields,
          email: this.props.profile.email,
        },
      });
    }

    if (this.props.deleteConfirmResult !== undefined) {
      if (this.props.deleteConfirmResult === true) {
        if (this.props.deleteAccountData) {
          this.props.deleteAccountData();
        }
      } else {
        if (this.props.deleteConfirm) {
          this.props.deleteConfirm();
        }
      }
    }
  };

  render = () => {
    return (
      <Container maxWidth="md">
        <Paper className={this.props.classes?.paper}>
          <Typography variant="h3">Account</Typography>
          <Typography variant="body1">Email: {this.getProfile()?.email}</Typography>
          <form className={this.props.classes?.form} onSubmit={this.handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
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
              variant="contained"
              color="primary"
              fullWidth
              disabled={!this.isDirty()}
              className={this.props.classes?.submit}
            >
              Save
            </Button>
          </form>
          <Typography variant="h4">Delete</Typography>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={this.handleDelete}
            className={this.props.classes?.submit}
          >
            Delete Account
          </Button>
        </Paper>
      </Container>
    );
  };
}

export default withSharedStyles()(AccountPage);
