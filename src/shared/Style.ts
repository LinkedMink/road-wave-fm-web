import { StyledComponentProps, StyleRulesCallback, Theme, withStyles } from "@material-ui/core";

export type SharedStyleClass = 'paper' | 'form' | 'submit';
export type SharedStyleProps = StyledComponentProps<SharedStyleClass>

export const sharedStyleCallback: StyleRulesCallback<Theme, {}, SharedStyleClass> = (theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

export const withSharedStyles = <
  TProps extends object = Record<string, never>,
  TStyleClass extends string = SharedStyleClass
>(
  styleCallback?: StyleRulesCallback<Theme, TProps, TStyleClass>
) => {
  const combinedCallback = (theme: Theme) => (
    styleCallback
      ? {
        ...sharedStyleCallback(theme),
        ...styleCallback(theme)
      }
      : sharedStyleCallback(theme)
  )
  return withStyles(combinedCallback);
}
