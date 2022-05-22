import React from 'react';
import {
  StyledComponentProps,
  StyleRulesCallback,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Backdrop, Box } from '@material-ui/core';

type StyleClass = 'overlay' | 'animationContainer' | 'progress';

const styles: StyleRulesCallback<Theme, LoadingOverlayStateProps, StyleClass> = (theme: Theme) => ({
  overlay: {
    zIndex: theme.zIndex.drawer + 1,
  },
  animationContainer: {
    display: 'flex',
    maxWidth: theme.breakpoints.values.sm,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    width: '80%',
  },
});

export interface LoadingOverlayStateProps {
  isLoading: boolean;
  percentComplete?: number;
  message?: string;
}

type LoadingOverlayProps = LoadingOverlayStateProps & StyledComponentProps<StyleClass>;

class LoadingOverlay extends React.Component<LoadingOverlayProps> {
  renderLoadingAnimation() {
    if (Number.isInteger(this.props.percentComplete)) {
      return (
        <LinearProgress
          className={this.props.classes?.progress}
          variant="determinate"
          value={this.props.percentComplete}
        />
      );
    } else {
      return <LinearProgress className={this.props.classes?.progress} />;
    }
  }

  render() {
    return (
      <Backdrop className={this.props.classes?.overlay} open={this.props.isLoading}>
        <Box className={this.props.classes?.animationContainer}>
          {this.renderLoadingAnimation()}
        </Box>
      </Backdrop>
    );
  }
}

export default withStyles(styles)(LoadingOverlay);
