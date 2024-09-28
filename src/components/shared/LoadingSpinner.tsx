import { Box, CircularProgress, Typography } from "@mui/material";
import { FunctionComponent } from "react";

export interface LoadingSpinnerProps {
  isLoading: boolean;
  percentComplete?: number;
  message?: string;
  size?: number | string;
}

export const LoadingSpinner: FunctionComponent<LoadingSpinnerProps> = props => {
  return (
    <Box
      sx={theme => ({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: theme.transitions.create("opacity", {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.standard,
        }),
        opacity: 0,
        visibility: "hidden",
        zIndex: -1,
        ...(props.isLoading
          ? {
              opacity: 0.75,
              visibility: "visible",
              zIndex: theme.zIndex.drawer + 1,
            }
          : undefined),
      })}
    >
      <CircularProgress
        size={props.size}
        variant={props.percentComplete ? "determinate" : "indeterminate"}
        value={props.percentComplete}
      />
      {props.message && <Typography variant="caption">{props.message}</Typography>}
    </Box>
  );
};
