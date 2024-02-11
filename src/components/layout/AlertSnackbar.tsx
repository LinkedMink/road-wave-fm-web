import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { FunctionComponent, SyntheticEvent, useContext } from "react";
import { AlertActionType } from "../../definitions/alertConstants";
import { AlertContext } from "../../providers/AlertProvider";

export const AlertSnackbar: FunctionComponent = () => {
  const [alertState, alertDispatch] = useContext(AlertContext);

  const handleClose = (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    alertDispatch({ type: AlertActionType.CLEAR });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={!!alertState.severity}
      autoHideDuration={alertState.closeInMs}
      onClose={handleClose}
    >
      <Alert
        severity={alertState.severity}
        elevation={4}
        variant="filled"
        onClose={handleClose}
      >
        {alertState.message}
      </Alert>
    </Snackbar>
  );
};
