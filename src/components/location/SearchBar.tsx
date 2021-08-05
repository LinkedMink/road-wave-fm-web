/* eslint-disable react/prop-types */
import {
  Box,
  IconButton,
  StyledComponentProps,
  StyleRulesCallback,
  TextField,
  Theme,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { FunctionComponent } from 'react';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';

type StyleClass = 'search';
type StyleProps = StyledComponentProps<StyleClass>;

const styles: StyleRulesCallback<Theme, Record<string, unknown>, StyleClass> = (_theme: Theme) => ({
  search: {
    display: 'flex',
    '& > :first-child': {
      flex: '1 1',
    },
    '& > :last-child': {
      flex: '0 0 auto',
    },
  },
});

export interface SearchBarOwnProps {
  map?: google.maps.Map;
}

type SearchBarProps = SearchBarOwnProps & SharedStyleProps & StyleProps;

const SearchBar: FunctionComponent<SearchBarProps> = (props) => {
  const inputRef = React.createRef<HTMLInputElement>();

  return (
    <form noValidate>
      <Box className={props.classes?.search}>
        <TextField inputRef={inputRef} label="Search" />
        <IconButton aria-label="Search">
          <SearchIcon />
        </IconButton>
      </Box>
    </form>
  );
};

export default withSharedStyles(styles)(SearchBar);
