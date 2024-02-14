import FilterAltIcon from "@mui/icons-material/FilterAlt";
import LocationOffIcon from "@mui/icons-material/LocationOff";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import { FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { NavLink, useSubmit } from "react-router-dom";
import { getEarthDistance } from "../../functions/math";
import { FormatsContext } from "../../providers/FormatsProvider";
import { MapsContext } from "../../providers/MapsProvider";
import { UserLocationContext } from "../../providers/UserLocationProvider";
import { Coordinates } from "../../types/responseModels";

const UPDATE_DISTANCE_KM = 10;

export interface SearchControlProps {
  map?: google.maps.Map;
}

export const SearchControl: FunctionComponent<SearchControlProps> = props => {
  const submit = useSubmit();
  const mapsApi = useContext(MapsContext);
  const userLocation = useContext(UserLocationContext);
  const [formatsState] = useContext(FormatsContext);
  const inputRef = useRef<HTMLInputElement>();
  const [searchLocation, setSearchLocation] = useState<Coordinates>();

  useEffect(() => {
    if (!searchLocation) {
      return;
    }

    const searchParams = new URLSearchParams({
      lat: searchLocation.lat.toString(),
      lng: searchLocation.lng.toString(),
    });
    formatsState.selected.forEach(f => searchParams.append("fmt", f));

    submit(searchParams, { action: "/stations", method: "get" });
  }, [formatsState.selected, searchLocation, submit]);

  useEffect(() => {
    if (!props.map || !inputRef.current || !mapsApi.places.value) {
      return;
    }

    const autocomplete = new mapsApi.places.value.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "us" },
      strictBounds: false,
      types: ["geocode"],
    });
    autocomplete.bindTo("bounds", props.map);

    const placeChangedHandler = () => {
      const location = autocomplete.getPlace().geometry?.location;
      if (location) {
        setSearchLocation({
          lat: location.lat(),
          lng: location.lng(),
        });
      }
    };

    autocomplete.addListener("place_changed", placeChangedHandler);
  }, [props.map, mapsApi.places]);

  useEffect(() => {
    if (!userLocation.coordinates) {
      return;
    }

    if (
      searchLocation &&
      getEarthDistance(userLocation.coordinates, searchLocation) < UPDATE_DISTANCE_KM
    ) {
      return;
    }

    setSearchLocation(userLocation.coordinates);
  }, [searchLocation, userLocation.coordinates]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "stretch",
      }}
    >
      <Tooltip
        title={
          userLocation.isTrackingEnabled
            ? "Search is disabled when location tracking is enabled"
            : "Search by nearby landmarks"
        }
      >
        <FormControl
          variant="outlined"
          disabled={userLocation.isTrackingEnabled}
          sx={{ flex: "1 1" }}
        >
          <InputLabel htmlFor="location-search">Search</InputLabel>
          <OutlinedInput
            id="location-search"
            inputRef={inputRef}
            disabled={userLocation.isTrackingEnabled}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
            label="Search"
          />
        </FormControl>
      </Tooltip>
      <Tooltip title="Filter by format">
        <IconButton
          component={NavLink}
          to={"/formats"}
          color="error"
          sx={{ p: 1.5, ml: 0.5 }}
        >
          <FilterAltIcon />
        </IconButton>
      </Tooltip>

      <Divider
        sx={{ height: 28, m: 0.5 }}
        orientation="vertical"
      />
      <Tooltip
        title={
          userLocation.isTrackingEnabled ? "Disable location tracking" : "Enable location tracking"
        }
      >
        <IconButton
          sx={{ p: 1.5 }}
          color="primary"
          onClick={
            userLocation.isTrackingEnabled
              ? userLocation.disableTracking
              : userLocation.enableTracking
          }
        >
          {userLocation.isTrackingEnabled ? <LocationOnIcon /> : <LocationOffIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};
