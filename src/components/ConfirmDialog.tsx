import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  render = () => {
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
          <Button onClick={this.props.confirmNo} color="secondary">
            No
          </Button>
          <Button onClick={this.props.confirmYes} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default ConfirmDialog;
