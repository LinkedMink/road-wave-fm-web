import { Backdrop, Box, LinearProgress } from "@mui/material";
import { FunctionComponent } from "react";

export interface LoadingOverlayProps {
  isLoading: boolean;
  percentComplete?: number;
  message?: string;
}

export const LoadingOverlay: FunctionComponent<LoadingOverlayProps> = props => {
  return (
    <Backdrop
      open={props.isLoading}
      sx={theme => ({
        zIndex: theme.zIndex.drawer + 1,
      })}
    >
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LinearProgress
          sx={theme => ({
            width: "90%",
            [theme.breakpoints.up("md")]: {
              width: "80%",
            },
            [theme.breakpoints.up("xl")]: {
              width: "75%",
            },
          })}
          variant={props.percentComplete ? "determinate" : "indeterminate"}
          value={props.percentComplete}
        />
      </Box>
    </Backdrop>
  );
};
