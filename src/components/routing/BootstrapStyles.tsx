import { CssBaseline } from "@mui/material";
import { FunctionComponent } from "react";
import { PaletteModeProvider } from "../../providers/PaletteModeProvider";
import { HasChildrenProps } from "../../types/reactUtilityTypes";
import { BackdropProvider } from "../../providers/BackdropProvider";

export const BootstrapStyles: FunctionComponent<HasChildrenProps> = props => {
  return (
    <PaletteModeProvider>
      <CssBaseline enableColorScheme />
      <BackdropProvider>{props.children}</BackdropProvider>
    </PaletteModeProvider>
  );
};
