import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PagePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  overflow: "auto",
  flexDirection: "column",
  "& a": {
    color: theme.palette.mode === "dark" ? theme.palette.secondary.light : undefined,
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(4),
  },
}));
