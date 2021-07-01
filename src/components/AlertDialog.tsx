import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { RouteComponentProps } from 'react-router-dom';

export interface AlertDialogStateProps {
  isActive: boolean;
  title: string;
  text?: string;
  redirect?: string;
}

export interface AlertDialogDispatchProps {
  close: () => void;
}

type AlertDialogProps = RouteComponentProps & AlertDialogStateProps & AlertDialogDispatchProps;

class AlertDialog extends React.Component<AlertDialogProps> {
  handleClose = (): void => {
    if (this.props.redirect && this.props.history) {
      this.props.history.push(this.props.redirect);
    }

    if (this.props.close) {
      this.props.close();
    }
  };

  render = (): JSX.Element => {
    return (
      <Dialog
        open={this.props.isActive}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{this.props.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default AlertDialog;
