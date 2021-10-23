import React from 'react';
import {
  StyledComponentProps,
  StyleRulesCallback,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import clsx from 'clsx';

export interface LoadingSpinnerOwnProps {
  isLoading: boolean;
  message?: string;
}

type StyleClass = 'overlay' | 'overlayOpen';

const styles: StyleRulesCallback<Theme, LoadingSpinnerOwnProps, StyleClass> = (theme: Theme) => ({
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.2s',
    opacity: 0,
    visibility: 'hidden',
    zIndex: -1,
  },
  overlayOpen: {
    opacity: 0.75,
    visibility: 'visible',
    zIndex: theme.zIndex.drawer + 1,
  },
});

type LoadingSpinnerProps = LoadingSpinnerOwnProps & StyledComponentProps<StyleClass>;

const LoadingSpinner: React.FunctionComponent<LoadingSpinnerProps> = (props) => {
  const overlayClass = props.isLoading
    ? clsx(props.classes?.overlay, props.classes?.overlayOpen)
    : props.classes?.overlay;
  return (
    <Box className={overlayClass}>
      <CircularProgress variant="indeterminate" />
      <Typography variant="caption">{props.message}</Typography>
    </Box>
  );
};

export default withStyles(styles)(LoadingSpinner);
