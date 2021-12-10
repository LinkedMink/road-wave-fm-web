import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';

class AboutPage extends React.Component<SharedStyleProps> {
  render() {
    return (
      <Container maxWidth="lg">
        <Paper className={this.props.classes?.paper}>
          <Typography variant="h3">About</Typography>
          <Typography variant="body1">
            Development on this project has stalled in favor of focusing on a mobile app front-end.
            We wanted a UI that would be convenient to use while driving, but web apps lack tight
            integration on mobile devices. If someone&apos;s interested in picking this project up
            feel free to reach out on our Github page.
          </Typography>
          <br />
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
        </Paper>
      </Container>
    );
  }
}

export default withSharedStyles()(AboutPage);
