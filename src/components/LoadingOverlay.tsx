import clsx from 'clsx';
import React from 'react';
import {
  StyledComponentProps,
  StyleRulesCallback,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

type StyleClass =
  | 'overlay'
  | 'overlayVisible'
  | 'animationContainer'
  | 'animationSurface'
  | 'loadingText';

const styles: StyleRulesCallback<Theme, {}, StyleClass> = (theme: Theme) => ({
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#282d32',
    zIndex: -1,
    opacity: 0,
    transition: '0.2s ease-in-out',
  },
  overlayVisible: {
    zIndex: 100,
    opacity: 0.6,
  },
  animationContainer: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
  animationSurface: {
    width: '100%',
    padding: theme.spacing(2),
    textAlign: 'center',
    lineHeight: '3em',
  },
  loadingText: {
    marginBottom: theme.spacing(2),
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
      return <LinearProgress variant="determinate" value={this.props.percentComplete} />;
    } else {
      return <LinearProgress />;
    }
  }

  render() {
    return (
      <div
        className={clsx(
          this.props.classes?.overlay,
          this.props.isLoading && this.props.classes?.overlayVisible,
        )}
      >
        <Container maxWidth="md" className={this.props.classes?.animationContainer}>
          <Paper className={this.props.classes?.animationSurface}>
            <Typography className={this.props.classes?.loadingText} variant="h4">
              {this.props.message}
            </Typography>
            {this.renderLoadingAnimation()}
          </Paper>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(LoadingOverlay);
