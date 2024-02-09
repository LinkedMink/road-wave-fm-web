import { Box, CircularProgress, Typography } from "@mui/material";
import { FunctionComponent } from "react";

export interface LoadingSpinnerProps {
  isLoading: boolean;
  message?: string;
}

export const LoadingSpinner: FunctionComponent<LoadingSpinnerProps> = props => {
  return (
    <Box
      sx={theme => ({
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "0.2s",
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
      <CircularProgress variant="indeterminate" />
      {props.message && <Typography variant="caption">{props.message}</Typography>}
    </Box>
  );
};
