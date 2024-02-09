import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export interface ConfirmDialogOwnProps {
  handleClose?: (event: Record<string, unknown>) => void;
}

export interface ConfirmDialogStateProps {
  isActive: boolean;
  text?: string;
}

export interface ConfirmDialogDispatchProps {
  confirmNo: () => void;
  confirmYes: () => void;
}

type ConfirmDialogProps = ConfirmDialogOwnProps &
  ConfirmDialogStateProps &
  ConfirmDialogDispatchProps;

class ConfirmDialog extends React.Component<ConfirmDialogProps> {
  render = (): JSX.Element => {
    return (
      <Dialog
        open={this.props.isActive}
        onClose={this.props.handleClose}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">{this.props.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.confirmNo}
            color="secondary"
          >
            No
          </Button>
          <Button
            onClick={this.props.confirmYes}
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default ConfirmDialog;
