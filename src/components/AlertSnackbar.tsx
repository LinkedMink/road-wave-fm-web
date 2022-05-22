import { Grow, Snackbar, Alert, AlertColor } from '@mui/material';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TransitionProps } from '@mui/material/transitions';
import { useEffect } from 'react';
import { AlertSeverity } from '../definitions/StateModels';

const GROW_TIMEOUT = 300;

const GrowTransition: React.JSXElementConstructor<
  TransitionProps & { children: React.ReactElement }
> = (props: TransitionProps & { children: React.ReactElement }) => {
  return <Grow timeout={GROW_TIMEOUT}>{props.children}</Grow>;
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
    severity: undefined as AlertColor | undefined,
  });

  useEffect(() => {
    if (props.isActive && !state.text) {
      setState({
        text: props.text as string,
        severity: props.severity?.toLowerCase() as AlertColor,
      });
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
