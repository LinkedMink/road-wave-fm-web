import { Box, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

const FooterTypography = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  borderLeft: `1px solid ${theme.palette.divider}`,
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(0, 4),
  },
  "&:last-child": {
    borderRight: "none",
  },
}));

export const FooterPanel: FunctionComponent = () => {
  return (
    <Box
      component={"footer"}
      sx={theme => ({
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2, 0),
        [theme.breakpoints.up("sm")]: {
          flexDirection: "row",
        },
        ...theme.applyStyles("dark", {
          "& a": {
            color: theme.palette.secondary.light,
          },
        }),
      })}
    >
      <FooterTypography color="textSecondary">
        <Link
          component={NavLink}
          to={"/documents/privacy-policy"}
        >
          Privacy Policy
        </Link>
      </FooterTypography>
      <FooterTypography color="textSecondary">
        <Link
          component={NavLink}
          to={"/documents/license"}
        >
          License
        </Link>
      </FooterTypography>
      <FooterTypography color="textSecondary">
        {"Copyright © "}
        {new Date().getFullYear()}
        {" Harlan Sang."}
      </FooterTypography>
    </Box>
  );
};
