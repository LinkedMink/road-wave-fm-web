import { Backdrop, Box, LinearProgress } from "@mui/material";
import React from "react";

export interface LoadingOverlayStateProps {
  isLoading: boolean;
  percentComplete?: number;
  message?: string;
}

type LoadingOverlayProps = LoadingOverlayStateProps;

class LoadingOverlay extends React.Component<LoadingOverlayProps> {
  renderLoadingAnimation() {
    if (Number.isInteger(this.props.percentComplete)) {
      return (
        <LinearProgress
          sx={{
            width: "80%",
          }}
          variant="determinate"
          value={this.props.percentComplete}
        />
      );
    } else {
      return (
        <LinearProgress
          sx={{
            width: "80%",
          }}
        />
      );
    }
  }

  render() {
    return (
      <Backdrop
        open={this.props.isLoading}
        sx={theme => ({
          zIndex: theme.zIndex.drawer + 1,
        })}
      >
        <Box
          sx={theme => ({
            display: "flex",
            maxWidth: theme.breakpoints.values.sm,
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          {this.renderLoadingAnimation()}
        </Box>
      </Backdrop>
    );
  }
}

export default LoadingOverlay;
