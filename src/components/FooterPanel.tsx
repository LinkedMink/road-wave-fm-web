import React from 'react';
import {
  StyledComponentProps,
  StyleRulesCallback,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

type StyleClass = 'footerBox';

const styles: StyleRulesCallback<Theme, {}, StyleClass> = (theme: Theme) => ({
  footerBox: {
    padding: 0,
  },
});

type FooterPanelProps = StyledComponentProps<StyleClass>;

class FooterPanel extends React.Component<FooterPanelProps> {
  render() {
    return (
      <Box pt={4} className={this.props.classes?.footerBox}>
        <Typography variant="body1" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="#">
            Harlan Sang
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    );
  }
}

export default withStyles(styles)(FooterPanel);
