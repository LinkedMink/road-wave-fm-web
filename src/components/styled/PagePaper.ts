import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PagePaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  overflow: "auto",
  flexDirection: "column",
  "& a": {
    color: theme.palette.mode === "dark" ? theme.palette.secondary.light : undefined,
  },
  margin: theme.spacing(2, 0),

  padding: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    margin: theme.spacing(4, 0),
    padding: theme.spacing(4),
  },
}));
