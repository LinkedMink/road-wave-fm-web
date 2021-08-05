import {
  StyledComponentProps,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { PropInjector } from '@material-ui/types';

export type SharedStyleClass =
  | 'paper'
  | 'accordionDetails'
  | 'form'
  | 'submit'
  | 'vSpace2'
  | 'columnBox';
export type SharedStyleProps = StyledComponentProps<SharedStyleClass>;

export const sharedStyleCallback: StyleRulesCallback<
  Theme,
  Record<string, unknown>,
  SharedStyleClass
> = (theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  accordionDetails: {
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(2),
  },
  vSpace2: {
    marginBottom: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  columnBox: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const withSharedStyles = <
  TProps extends Record<string, unknown> = Record<string, unknown>,
  TStyleClass extends string = SharedStyleClass,
>(
  styleCallback?: StyleRulesCallback<Theme, TProps, TStyleClass>,
): PropInjector<
  WithStyles<TStyleClass & SharedStyleClass, false>,
  StyledComponentProps<TStyleClass & SharedStyleClass> & TProps
> => {
  const combinedCallback = (theme: Theme) =>
    styleCallback
      ? {
          ...sharedStyleCallback(theme),
          ...styleCallback(theme),
        }
      : sharedStyleCallback(theme);
  return withStyles(combinedCallback);
};
