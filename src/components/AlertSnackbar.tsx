/* eslint-disable react/prop-types */
import Alert, { Color } from '@material-ui/lab/Alert';
import { Grow, Snackbar } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AlertSeverity } from '../reducers/AlertReducer';
import { TransitionProps } from '@material-ui/core/transitions';

const GROW_TIMEOUT = 250;

const GrowTransition: React.FunctionComponent<TransitionProps> = (props: TransitionProps) => {
  return <Grow timeout={GROW_TIMEOUT} {...props} />;
};

export interface AlertSnackbarStateProps {
  isActive: boolean;
  closeInMs?: number;
  severity?: AlertSeverity;
  text?: string;
}

export interface AlertSnackbarDispatchProps {
  close: () => void;
}

type AlertSnackbarProps = RouteComponentProps &
  AlertSnackbarStateProps &
  AlertSnackbarDispatchProps;

const AlertSnackbar: React.FunctionComponent<AlertSnackbarProps> = (props) => {
  const severity = props.severity?.toLowerCase() as Color;

  const handleClose = () => {
    setTimeout(() => props.close(), GROW_TIMEOUT);
  };

  return (
    <Snackbar
      open={props.isActive}
      autoHideDuration={props.closeInMs}
      TransitionComponent={GrowTransition}
      onClose={handleClose}
    >
      <Alert severity={severity} elevation={4} variant="filled">
        {props.text}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
