import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import { IconButton, Tooltip, useColorScheme } from "@mui/material";
import { FunctionComponent } from "react";

export const ColorSchemeIconButton: FunctionComponent = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode) return null;

  const handleToggleMode = () => {
    if (mode === "dark") {
      setMode("light");
    } else if (mode === "light") {
      setMode("system");
    } else {
      setMode("dark");
    }
  };

  const icon =
    mode === "dark" ? (
      <Brightness4Icon />
    ) : mode === "light" ? (
      <Brightness7Icon />
    ) : (
      <BrightnessAutoIcon />
    );

  return (
    <Tooltip title="Toggle light/dark mode">
      <IconButton
        aria-label="Toggle light/dark mode"
        onClick={handleToggleMode}
        sx={theme => ({
          color: theme.palette.common.white,
        })}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};
