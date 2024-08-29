import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { FunctionComponent } from "react";
import { BackdropProvider } from "../../providers/BackdropProvider";
import { HasChildrenProps } from "../../types/reactUtilityTypes";

export const BootstrapStyles: FunctionComponent<HasChildrenProps> = props => {
  const theme = createTheme({ colorSchemes: { dark: true } });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <BackdropProvider>{props.children}</BackdropProvider>
    </ThemeProvider>
  );
};
