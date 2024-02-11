import SearchIcon from "@mui/icons-material/Search";
import { FilledInput, FormControl, InputAdornment, InputLabel, Tooltip } from "@mui/material";
import { FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { MapsContext } from "../../providers/MapsProvider";
import { Form } from "react-router-dom";

export interface SearchControlProps {
  map?: google.maps.Map;
}

export const SearchControl: FunctionComponent<SearchControlProps> = props => {
  const mapsApi = useContext(MapsContext);
  const inputRef = useRef<HTMLInputElement>();
  const [isLocationTrackingEnabled] = useState(false);

  useEffect(() => {
    if (!props.map || !inputRef.current) {
      return;
    }

    const autocomplete = new mapsApi.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "us" },
      strictBounds: false,
      types: ["geocode"],
    });
    autocomplete.bindTo("bounds", props.map);

    const placeChangedHandler = () => {
      const location = autocomplete.getPlace().geometry?.location;
      if (location) {
        console.log("TODO");
      }
    };

    autocomplete.addListener("place_changed", placeChangedHandler);
  }, [props.map, mapsApi, inputRef]);

  return (
    <Form
      action="/stations"
      method="get"
      noValidate
    >
      <Tooltip
        title={
          isLocationTrackingEnabled
            ? "Search is disabled when location tracking is enabled"
            : "Search by nearby landmarks"
        }
      >
        <FormControl
          variant="filled"
          fullWidth={true}
        >
          <InputLabel htmlFor="location-search">Search</InputLabel>
          <FilledInput
            id="location-search"
            inputRef={inputRef}
            disabled={isLocationTrackingEnabled}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </Tooltip>
    </Form>
  );
};
