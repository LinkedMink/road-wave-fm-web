import SearchIcon from "@mui/icons-material/Search";
import { FilledInput, FormControl, InputAdornment, InputLabel, Tooltip } from "@mui/material";
import { FunctionComponent, createRef, useContext, useEffect } from "react";
import { MapsContext } from "../../providers/MapsProvider";

export interface SearchBarProps {
  map?: google.maps.Map;
  disabled: boolean;
  onPlaceChanged: (autocomplete: google.maps.places.Autocomplete) => void;
}

export const SearchBar: FunctionComponent<SearchBarProps> = props => {
  const mapsApi = useContext(MapsContext);
  const inputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    if (!props.map || !mapsApi || !inputRef.current) {
      return;
    }

    const autocomplete = new mapsApi.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "us" },
      strictBounds: false,
      types: ["geocode"],
    });
    autocomplete.bindTo("bounds", props.map);

    const handler = props.onPlaceChanged.bind(undefined, autocomplete);
    autocomplete.addListener("place_changed", handler);
  }, [props.map, mapsApi, inputRef.current]);

  const tooltip = props.disabled
    ? "Search is disabled when location tracking is enabled"
    : "Search by nearby landmarks";
  return (
    <Tooltip title={tooltip}>
      <FormControl
        variant="filled"
        fullWidth={true}
      >
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
