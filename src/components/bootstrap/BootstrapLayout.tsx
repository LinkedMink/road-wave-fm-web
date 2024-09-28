import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Fragment, FunctionComponent } from "react";
import { HasChildrenProps } from "../../types/reactUtilityTypes";

export const BootstrapLayout: FunctionComponent<HasChildrenProps> = props => {
  return (
    <Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Box
            aria-label="menu"
            sx={theme => ({
              color: theme.palette.common.white,
              height: "40px",
              width: "40px",
              marginRight: theme.spacing(2),
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            })}
          >
            <MenuIcon />
          </Box>

          <Typography
            variant="h6"
            color="inherit"
            sx={{
              flexGrow: 1,
            }}
          >
            Road Wave FM
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={theme => ({
          position: "relative",
          whiteSpace: "nowrap",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          width: 0,
          [theme.breakpoints.up("sm")]: {
            width: theme.spacing(7),
          },
          [theme.breakpoints.up("md")]: {
            width: theme.spacing(8),
          },
          borderRight: `1px solid ${theme.palette.divider}`,
        })}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box sx={theme => theme.mixins.toolbar} />
        <Box
          component={"main"}
          sx={{ flex: "1 1 auto" }}
        >
          {props.children}
        </Box>
      </Box>
    </Fragment>
  );
};
