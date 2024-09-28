import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PagePaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  overflow: "auto",
  flexDirection: "column",
  ...theme.applyStyles("dark", {
    "& a": {
      color: theme.palette.secondary.light,
    },
  }),
  margin: theme.spacing(2, 0),

  padding: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    margin: theme.spacing(4, 0),
    padding: theme.spacing(4),
  },
}));
