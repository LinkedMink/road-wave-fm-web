import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { FunctionComponent, useContext } from "react";
import { PaletteModeContext } from "../../providers/PaletteModeProvider";

export const PaletteModeIconButton: FunctionComponent = () => {
  const { togglePaletteMode } = useContext(PaletteModeContext);
  const theme = useTheme();

  return (
    <Tooltip title="Toggle light/dark mode">
      <IconButton
        aria-label="Toggle light/dark mode"
        onClick={togglePaletteMode}
        sx={theme => ({
          color: theme.palette.common.white,
        })}
      >
        {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};
