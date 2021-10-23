import Alert, { Color } from '@material-ui/lab/Alert';
import { Grow, Snackbar } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AlertSeverity } from '../reducers/AlertReducer';
import { TransitionProps } from '@material-ui/core/transitions';
import { useEffect } from 'react';

const GROW_TIMEOUT = 300;

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
  const [state, setState] = React.useState({
    text: undefined as string | undefined,
    severity: undefined as Color | undefined,
  });

  useEffect(() => {
    if (props.isActive && !state.text) {
      setState({ text: props.text as string, severity: props.severity?.toLowerCase() as Color });
    } else if (!props.isActive && state.text) {
      setTimeout(() => {
        setState({ text: undefined, severity: undefined });
      }, GROW_TIMEOUT);
    }
  });

  return (
    <Snackbar
      open={props.isActive}
      autoHideDuration={props.closeInMs}
      TransitionComponent={GrowTransition}
      onClose={props.close}
    >
      <Alert severity={state.severity} elevation={4} variant="filled">
        {state.text}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
