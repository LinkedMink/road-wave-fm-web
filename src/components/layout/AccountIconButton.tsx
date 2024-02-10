import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, Tooltip } from "@mui/material";
import { FunctionComponent, useContext } from "react";
import { NavLink } from "react-router-dom";
import { SessionContext } from "../../providers/SessionProvider";

export const AccountIconButton: FunctionComponent = () => {
  const [session] = useContext(SessionContext);

  return session.jwtToken ? (
    <Tooltip title="Manage your account">
      <IconButton
        aria-label="Manage your account"
        component={NavLink}
        to={"/account"}
        sx={theme => ({
          color: theme.palette.common.white,
        })}
      >
        <AccountCircleIcon />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Login to your account">
      <IconButton
        aria-label="Login to your account"
        component={NavLink}
        to={"/login"}
        sx={theme => ({
          color: theme.palette.common.white,
        })}
      >
        <AccountCircleIcon />
      </IconButton>
    </Tooltip>
  );
};
