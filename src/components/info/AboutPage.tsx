import { Container, Link, List, ListItemButton, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { PagePaper } from "../shared/PagePaper";
import { DocumentSection } from "./DocumentSection";

export const AboutPage: FunctionComponent = () => {
  return (
    <Container maxWidth="md">
      <PagePaper>
        <DocumentSection title="About">
          <Typography>
            Development on this project has stalled in favor of focusing on a mobile app front-end.
            We wanted a UI that would be convenient to use while driving, but web apps lack tight
            integration on mobile devices. If someone&apos;s interested in picking this project up
            feel free to reach out on our Github page.
          </Typography>
        </DocumentSection>
        <DocumentSection
          title="Related Projects"
          level={4}
        >
          <List>
            <Link href="https://github.com/LinkedMink/road_wave_fm_ui">
              <ListItemButton>Road Wave FM - Mobile UI</ListItemButton>
            </Link>
            <Link href="https://github.com/LinkedMink/road-wave-fm-web">
              <ListItemButton>Road Wave FM - Web App</ListItemButton>
            </Link>
            <Link href="https://github.com/LinkedMink/road-wave-fm-api">
              <ListItemButton>Road Wave FM - API</ListItemButton>
            </Link>
            <Link href="https://github.com/LinkedMink/node-user-service">
              <ListItemButton>Node User Service</ListItemButton>
            </Link>
          </List>
        </DocumentSection>
      </PagePaper>
    </Container>
  );
};
