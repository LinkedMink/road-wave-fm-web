import { StyledComponentProps, StyleRulesCallback, Theme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';

type StyleClass = 'contentSection';
type StyleProps = StyledComponentProps<StyleClass>;

const styles: StyleRulesCallback<Theme, Record<string, never>, StyleClass> = (theme: Theme) => ({
  contentSection: {
    marginBottom: theme.spacing(4),
  },
  linkText: {
    color: theme.palette.type === 'dark' ? theme.palette.secondary.light : undefined,
  },
});

type AboutPageProps = StyleProps & SharedStyleProps;

const AboutPage: React.FunctionComponent<AboutPageProps> = (props) => {
  return (
    <Container maxWidth="lg">
      <Paper className={props.classes?.paper}>
        <section className={props.classes?.contentSection}>
          <Typography variant="h3">About</Typography>
          <Typography variant="body1">
            Development on this project has stalled in favor of focusing on a mobile app front-end.
            We wanted a UI that would be convenient to use while driving, but web apps lack tight
            integration on mobile devices. If someone&apos;s interested in picking this project up
            feel free to reach out on our Github page.
          </Typography>
        </section>
        <section className={props.classes?.contentSection}>
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
        </section>
      </Paper>
    </Container>
  );
};

export default withSharedStyles(styles)(AboutPage);
