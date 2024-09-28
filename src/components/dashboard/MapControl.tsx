/* eslint-disable @typescript-eslint/no-deprecated */
import { Box, useTheme } from "@mui/material";
import { FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { StationsActionType } from "../../definitions/dashboardConstants";
import { indexToChar } from "../../functions/collection";
import { areEqualMapPos } from "../../functions/math";
import { StationLocationViewModel } from "../../types/responseModels";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { MapsContext } from "./providers/MapsProvider";
import { StationsContext } from "./providers/StationsProvider";
import { UserLocationContext } from "./providers/UserLocationProvider";

// TODO find better way to import raw SVG
// import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
const PersonPinCircleIconPath =
  "M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 2c1.1 0 2 .9 2 2 0 1.11-.9 2-2 2s-2-.89-2-2c0-1.1.9-2 2-2zm0 10c-1.67 0-3.14-.85-4-2.15.02-1.32 2.67-2.05 4-2.05s3.98.73 4 2.05c-.86 1.3-2.33 2.15-4 2.15z";

const INITIAL_MAP_CENTER = { lat: 39.8283, lng: -98.5795 }; // Center of US
const INITIAL_ZOOM = 4;
const FOCUS_ZOOM_MIN = 10;

interface MarkersFor {
  for: StationLocationViewModel[];
  refs: google.maps.Marker[];
}

export interface MapControlProps {
  onMapInitialized: (map: google.maps.Map) => void;
}

export const MapControl: FunctionComponent<MapControlProps> = props => {
  const theme = useTheme();
  const mapsApi = useContext(MapsContext);
  const [stationsState, stationsDispatch] = useContext(StationsContext);
  const userLocation = useContext(UserLocationContext);
  const mapElementRef = useRef<HTMLDivElement>(null);
  const [userMarker, setUserMarker] = useState<google.maps.Marker>();
  const [markers, setMarkers] = useState<MarkersFor>({ for: [], refs: [] });
  const [mapRef, setMapRef] = useState<google.maps.Map>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!mapElementRef.current || mapRef || !mapsApi.maps.value) {
      return;
    }

    const map = new mapsApi.maps.value.Map(mapElementRef.current, {
      center: INITIAL_MAP_CENTER,
      zoom: INITIAL_ZOOM,
    });
    setMapRef(map);
    props.onMapInitialized(map);
  }, [mapRef, mapsApi.maps, props]);

  useEffect(() => {
    const markerApi = mapsApi.marker.value;
    if (!mapRef || !mapsApi.core.value || !markerApi || stationsState.list === markers.for) {
      return;
    }

    markers.refs.forEach(m => {
      m.setMap(null);
    });

    const newBounds = new mapsApi.core.value.LatLngBounds();
    const createdMarkers = stationsState.list.map((s, i) => {
      const latLng = {
        lat: s.coordinates[1],
        lng: s.coordinates[0],
      };
      newBounds.extend(latLng);
      const marker = new markerApi.Marker({
        position: latLng,
        map: mapRef,
        title: s.callSign,
        label: indexToChar(i),
      });
      marker.addListener("click", () => {
        stationsDispatch({ type: StationsActionType.SELECT, payload: s });
      });
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
    } else {
      const lat = searchParams.get("lat");
      const lng = searchParams.get("lng");
      if (!lat || !lng) {
        return;
      }

      mapRef.panTo({
        lat: Number(lat),
        lng: Number(lng),
      });
      const zoom = mapRef.getZoom();
      if (zoom && zoom < FOCUS_ZOOM_MIN) {
        mapRef.setZoom(FOCUS_ZOOM_MIN);
      }
    }

    setMarkers({
      refs: createdMarkers,
      for: stationsState.list,
    });
  }, [
    mapRef,
    stationsState.list,
    markers,
    mapsApi.core,
    mapsApi.marker,
    stationsDispatch,
    searchParams,
  ]);

  useEffect(() => {
    if (!mapRef || !stationsState.selected) {
      return;
    }

    mapRef.panTo({
      lat: stationsState.selected.coordinates[1],
      lng: stationsState.selected.coordinates[0],
    });
    const zoom = mapRef.getZoom();
    if (zoom && zoom < FOCUS_ZOOM_MIN) {
      mapRef.setZoom(FOCUS_ZOOM_MIN);
    }
  }, [mapRef, stationsState.selected]);

  useEffect(() => {
    const markerApi = mapsApi.marker.value;
    if (!mapRef || !userLocation.coordinates || !markerApi) {
      if (userMarker) {
        userMarker.setMap(null);
      }

      return;
    }

    const tempMarker =
      userMarker ??
      new markerApi.Marker({
        position: userLocation.coordinates,
        map: mapRef,
        title: `Your Location: ${userLocation.coordinates.lat.toFixed(
          5
        )}, ${userLocation.coordinates.lng.toFixed(5)}`,
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
    } else if (!markerPos || !areEqualMapPos(userLocation.coordinates, markerPos)) {
      tempMarker.setPosition(userLocation.coordinates);
    }
  }, [mapRef, userLocation.coordinates, userMarker, mapsApi.marker, theme.palette.secondary.dark]);

  return (
    <Box sx={{ position: "relative", flex: "1" }}>
      <Box
        ref={mapElementRef}
        sx={{
          position: "absolute",
          height: "100%",
          width: "100%",
          border: `1px solid ${theme.palette.divider}`,
        }}
      />
      <LoadingSpinner isLoading={mapsApi.maps.loading || mapsApi.marker.loading} />
    </Box>
  );
};
