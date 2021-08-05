/* eslint-disable react/prop-types */
import {
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  StyledComponentProps,
  StyleRulesCallback,
  Theme,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { FunctionComponent, useEffect } from 'react';
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
  onPlaceChanged: (autocomplete: google.maps.places.Autocomplete) => void;
}

type SearchBarProps = SearchBarOwnProps & SharedStyleProps & StyleProps;

const SearchBar: FunctionComponent<SearchBarProps> = (props) => {
  const inputRef = React.createRef<HTMLInputElement>();

  useEffect(() => {
    if (props.map && inputRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'us' },
        types: ['geocode'],
      });
      autocomplete.bindTo('bounds', props.map);

      const handler = props.onPlaceChanged.bind(undefined, autocomplete);
      autocomplete.addListener('place_changed', handler);
    }
  });

  return (
    <FormControl variant="filled" fullWidth={true}>
      <InputLabel htmlFor="location-search">Search</InputLabel>
      <FilledInput
        id="location-search"
        inputRef={inputRef}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default withSharedStyles(styles)(SearchBar);
