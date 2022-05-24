import SearchIcon from '@mui/icons-material/Search';
import { FilledInput, FormControl, InputAdornment, InputLabel, Tooltip } from '@mui/material';
import React, { FunctionComponent, useEffect } from 'react';

export interface SearchBarOwnProps {
  map?: google.maps.Map;
  disabled: boolean;
  onPlaceChanged: (autocomplete: google.maps.places.Autocomplete) => void;
}

type SearchBarProps = SearchBarOwnProps;

const SearchBar: FunctionComponent<SearchBarProps> = (props) => {
  useEffect(() => {
    if (props.map && inputRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'us' },
        strictBounds: false,
        types: ['geocode'],
      });
      autocomplete.bindTo('bounds', props.map);

      const handler = props.onPlaceChanged.bind(undefined, autocomplete);
      autocomplete.addListener('place_changed', handler);
    }
  });

  const inputRef = React.createRef<HTMLInputElement>();
  const tooltip = props.disabled
    ? 'Search is disabled when location tracking is enabled'
    : 'Search by nearby landmarks';

  return (
    <Tooltip title={tooltip}>
      <FormControl variant="filled" fullWidth={true}>
        <InputLabel htmlFor="location-search">Search</InputLabel>
        <FilledInput
          id="location-search"
          inputRef={inputRef}
          disabled={props.disabled}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </Tooltip>
  );
};

export default SearchBar;
