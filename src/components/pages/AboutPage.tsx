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
          <Typography variant="body1">TODO. This is a work in progress.</Typography>
          <br />
          <Typography variant="h4">Related Projects</Typography>
          <List>
            <Link href="https://github.com/LinkedMink/road-wave-fm-web">
              <ListItem button>Road Wave FM - Web App</ListItem>
            </Link>
          </List>
        </Paper>
      </Container>
    );
  }
}

export default withSharedStyles()(AboutPage);
