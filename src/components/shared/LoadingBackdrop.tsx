import { Backdrop, Theme, useMediaQuery } from "@mui/material";
import { FunctionComponent } from "react";
import { LoadingSpinner, LoadingSpinnerProps } from "./LoadingSpinner";

export type LoadingBackdropProps = Omit<LoadingSpinnerProps, "size" | "message">;

export const LoadingBackdrop: FunctionComponent<LoadingBackdropProps> = props => {
  const isSmViewport = useMediaQuery<Theme>(theme => theme.breakpoints.up("sm"));

  return (
    <Backdrop
      open={props.isLoading}
      sx={theme => ({
        zIndex: theme.zIndex.drawer + 1,
      })}
    >
      <LoadingSpinner
        {...props}
        size={isSmViewport ? "20vmin" : "30vmin"}
      />
    </Backdrop>
  );
};
