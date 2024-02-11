import { Box, useTheme } from "@mui/material";
import { FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { indexToChar } from "../../functions/collection";
import { areEqualMapPos } from "../../functions/math";
import { MapsContext } from "../../providers/MapsProvider";
import { Coordinates, StationViewModel } from "../../types/responseModels";
import { PagePaper } from "../styled/PagePaper";
import { SearchBar } from "./SearchBar";

// TODO find better way to import raw SVG
// import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
const PersonPinCircleIconPath =
  "M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 2c1.1 0 2 .9 2 2 0 1.11-.9 2-2 2s-2-.89-2-2c0-1.1.9-2 2-2zm0 10c-1.67 0-3.14-.85-4-2.15.02-1.32 2.67-2.05 4-2.05s3.98.73 4 2.05c-.86 1.3-2.33 2.15-4 2.15z";

const INITIAL_MAP_CENTER = { lat: 39.8283, lng: -98.5795 }; // Center of US
const INITIAL_ZOOM = 4;
const FOCUS_ZOOM_MIN = 10;

export interface MapCardOwnProps {
  selected?: StationViewModel;
  onMarkerClick(station: StationViewModel): void;
}

export interface MapCardStateProps {
  isTrackingUser: boolean;
  userLocation?: Coordinates;
  stations?: StationViewModel[];
}

export interface MapCardDispatchProps {
  selectLocation(lat: number, lng: number): void;
}

type MapCardProps = MapCardOwnProps & MapCardStateProps & MapCardDispatchProps;

interface MarkersFor {
  for: StationViewModel[];
  refs: google.maps.Marker[];
}

export const MapCard: FunctionComponent<MapCardProps> = props => {
  const theme = useTheme();
  const mapsApi = useContext(MapsContext);
  const mapDivRef = useRef(null);
  const [userMarker, setUserMarker] = useState<google.maps.Marker>();
  const [markers, setMarkers] = useState<MarkersFor>();
  const [mapRef, setMapRef] = useState<google.maps.Map>();

  useEffect(() => {
    if (mapDivRef.current && !mapRef) {
      const map = new mapsApi.maps.Map(mapDivRef.current, {
        center: INITIAL_MAP_CENTER,
        zoom: INITIAL_ZOOM,
      });
      setMapRef(map);
    }

    if (mapRef) {
      if (props.stations && props.stations !== markers?.for) {
        markers?.refs.forEach(m => m.setMap(null));

        const newBounds = new mapsApi.core.LatLngBounds();
        const createdMarkers = props.stations.map((s, i) => {
          newBounds.extend(s.location);
          const marker = new mapsApi.marker.Marker({
            position: s.location,
            map: mapRef,
            title: s.callSign,
            label: indexToChar(i),
          });
          marker.addListener("click", () => props.onMarkerClick(s));
          return marker;
        });

        if (createdMarkers.length > 1) {
          mapRef.fitBounds(newBounds);
        } else if (createdMarkers.length === 1) {
          const firstPos = createdMarkers[0].getPosition();
          if (firstPos) {
            mapRef.panTo(firstPos);
            const zoom = mapRef.getZoom();
            if (zoom && zoom < FOCUS_ZOOM_MIN) {
              mapRef.setZoom(FOCUS_ZOOM_MIN);
            }
          }
        }

        setMarkers({
          refs: createdMarkers,
          for: props.stations,
        });
      }

      if (props.selected) {
        mapRef.panTo(props.selected.location);
        const zoom = mapRef.getZoom();
        if (zoom && zoom < FOCUS_ZOOM_MIN) {
          mapRef.setZoom(FOCUS_ZOOM_MIN);
        }
      }

      if (props.userLocation) {
        const tempMarker =
          userMarker ??
          new mapsApi.marker.Marker({
            position: props.userLocation,
            map: mapRef,
            title: `Your Location: ${props.userLocation.lat.toFixed(
              5
            )}, ${props.userLocation.lng.toFixed(5)}`,
            clickable: false,
            icon: {
              path: PersonPinCircleIconPath,
              scale: 2,
              fillColor: theme.palette.secondary.dark,
              fillOpacity: 0.6,
            },
          });

        if (!tempMarker.getMap()) {
          tempMarker.setMap(mapRef);
        }

        const markerPos = tempMarker.getPosition();
        if (tempMarker !== userMarker) {
          setUserMarker(tempMarker);
        } else if (!markerPos || !areEqualMapPos(props.userLocation, markerPos)) {
          tempMarker.setPosition(props.userLocation);
        }
      } else if (!props.userLocation && userMarker?.getMap()) {
        userMarker.setMap(null);
      }
    }
  }, [
    mapDivRef,
    mapRef,
    mapsApi.maps.Map,
    mapsApi.core.LatLngBounds,
    mapsApi.marker.Marker,
    props,
    markers?.for,
    markers?.refs,
    userMarker,
    theme.palette.secondary.dark,
  ]);

  const placeChangedHandler = (autocomplate: google.maps.places.Autocomplete) => {
    const location = autocomplate.getPlace().geometry?.location;
    if (location) {
      props.selectLocation(location.lat(), location.lng());
    }
  };

  return (
    <PagePaper
      sx={theme => ({
        minHeight: "580px",
        display: "flex",
        flex: "3 1 auto",
        alignItems: "stretch",
        flexDirection: "column",
        [theme.breakpoints.up("md")]: {
          marginRight: 2,
        },
        [theme.breakpoints.up("lg")]: {
          marginRight: 4,
        },
      })}
    >
      <Box
        sx={theme => ({
          flex: "0 0 auto",
          marginBottom: theme.spacing(1),
        })}
      >
        <SearchBar
          map={mapRef}
          disabled={props.isTrackingUser}
          onPlaceChanged={placeChangedHandler}
        />
      </Box>
      <Box
        ref={mapDivRef}
        sx={{
          flex: "1 1",
          width: "100%",
        }}
      ></Box>
    </PagePaper>
  );
};
