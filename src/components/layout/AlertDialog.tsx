import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface AlertDialogStateProps {
  isActive: boolean;
  title?: string;
  text?: string;
  redirect?: string;
}

export interface AlertDialogDispatchProps {
  close: () => void;
}

type AlertDialogProps = AlertDialogStateProps & AlertDialogDispatchProps;

const AlertDialog: React.FunctionComponent<AlertDialogProps> = (props) => {
  const navigate = useNavigate();

  const handleClose = (): void => {
    if (props.redirect) {
      navigate(props.redirect);
    }

    if (props.close) {
      props.close();
    }
  };

  return (
    <Dialog
      open={props.isActive}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{props.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
