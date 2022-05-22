import { Container, Link, List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import React from 'react';
import { PagePaper } from '../../shared/Style';

const AboutContentBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

// TODO
// const AboutListItem = styled(ListItem)(({theme})=> ({
//   color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : undefined,
// }))

const AboutPage: React.FunctionComponent = (_props) => {
  return (
    <Container maxWidth="lg">
      <PagePaper>
        <AboutContentBox component="section">
          <Typography variant="h3">About</Typography>
          <Typography variant="body1">
            Development on this project has stalled in favor of focusing on a mobile app front-end.
            We wanted a UI that would be convenient to use while driving, but web apps lack tight
            integration on mobile devices. If someone&apos;s interested in picking this project up
            feel free to reach out on our Github page.
          </Typography>
        </AboutContentBox>
        <AboutContentBox component="section">
          <Typography variant="h4">Related Projects</Typography>
          <List>
            <Link href="https://github.com/LinkedMink/road_wave_fm_ui">
              <ListItem button>Road Wave FM - Mobile UI</ListItem>
            </Link>
            <Link href="https://github.com/LinkedMink/road-wave-fm-web">
              <ListItem button>Road Wave FM - Web App</ListItem>
            </Link>
            <Link href="https://github.com/LinkedMink/road-wave-fm-api">
              <ListItem button>Road Wave FM - API</ListItem>
            </Link>
            <Link href="https://github.com/LinkedMink/node-user-service">
              <ListItem button>Node User Service</ListItem>
            </Link>
          </List>
        </AboutContentBox>
      </PagePaper>
    </Container>
  );
};

export default AboutPage;
