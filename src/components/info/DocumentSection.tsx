import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { HasChildrenProps } from "../../types/reactUtilityTypes";

export interface DocumentSectionOwnProps {
  title?: string;
  level?: 3 | 4 | 5 | 6;
}

export const DocumentSection: FunctionComponent<
  DocumentSectionOwnProps & HasChildrenProps
> = props => {
  return (
    <Box
      component="section"
      sx={{ marginBottom: 2, "> *": { marginBottom: 2 } }}
    >
      {props.title && <Typography variant={`h${props.level ?? 3}`}>{props.title}</Typography>}
      {props.children}
    </Box>
  );
};
