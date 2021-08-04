/* eslint-disable react/prop-types */
import { IconButton, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { FunctionComponent } from 'react';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';

export interface SearchBarOwnProps {
  mapApiRef?: google.maps.Map;
}

type SearchBarProps = SearchBarOwnProps & SharedStyleProps;

const SearchBar: FunctionComponent<SearchBarProps> = (_props) => {
  const inputRef = React.createRef<HTMLInputElement>();

  return (
    <form noValidate>
      <TextField inputRef={inputRef} label="Search" />
      <IconButton aria-label="Search">
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default withSharedStyles()(SearchBar);
