import { Alert, Grow, Snackbar } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { FunctionComponent, useContext } from "react";
import { AlertActionType } from "../../definitions/actionConstants";
import { AlertContext } from "../../providers/AlertProvider";

const GROW_TIMEOUT = 300;

const GrowTransition: React.JSXElementConstructor<
  TransitionProps & { children: React.ReactElement }
> = (props: TransitionProps & { children: React.ReactElement }) => {
  return <Grow timeout={GROW_TIMEOUT}>{props.children}</Grow>;
};

export const AlertSnackbar: FunctionComponent = () => {
  const [state, dispatch] = useContext(AlertContext);

  // useEffect(() => {
  //   if (props.isActive && !state.text) {
  //     setState({
  //       text: props.text as string,
  //       severity: props.severity?.toLowerCase() as AlertColor,
  //     });
  //   } else if (!props.isActive && state.text) {
  //     setTimeout(() => {
  //       setState({ text: undefined, severity: undefined });
  //     }, GROW_TIMEOUT);
  //   }
  // });

  return (
    <Snackbar
      open={!!state.severity}
      autoHideDuration={state.closeInMs}
      TransitionComponent={GrowTransition}
      onClose={() => dispatch({ type: AlertActionType.CLEAR })}
    >
      <Alert
        severity={state.severity}
        elevation={4}
        variant="filled"
      >
        {state.message}
      </Alert>
    </Snackbar>
  );
};
