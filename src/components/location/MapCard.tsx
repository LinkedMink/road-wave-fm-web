/* eslint-disable react/prop-types */
import { Paper, StyledComponentProps, StyleRulesCallback, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { Coordinates } from '../../types/Map';
import { StationViewModel } from '../../types/Station';
import SearchBar from './SearchBar';

const INITIAL_MAP_CENTER = { lat: 39.8283, lng: -98.5795 }; // Center of US
const INITIAL_ZOOM = 4;
const FOCUS_ZOOM = 10;

type StyleClass = 'map' | 'search' | 'panel';
type StyleProps = StyledComponentProps<StyleClass>;

const styles: StyleRulesCallback<Theme, Record<string, unknown>, StyleClass> = (theme: Theme) => ({
  panel: {
    height: '100%',
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  search: {
    flex: '0 0 auto',
    marginBottom: theme.spacing(1),
  },
  map: {
    display: 'flex',
    flex: '1 1',
    width: '100%',
  },
});

export interface MapCardStateProps {
  isMapsApiLoaded: boolean;
  currentLocation?: Coordinates;
  stations: StationViewModel[];
}

export interface MapCardDispatchProps {
  selectLocation(lat: number, lng: number): void;
}

type MapCardProps = MapCardStateProps & MapCardDispatchProps & SharedStyleProps & StyleProps;

const MapCard: FunctionComponent<MapCardProps> = (props) => {
  const [map, setMap] = useState<google.maps.Map>();
  const mapDivRef = React.createRef<HTMLDivElement>();

  const placeChangedHandler = (autocomplate: google.maps.places.Autocomplete) => {
    const location = autocomplate.getPlace().geometry?.location;
    if (location) {
      props.selectLocation(location.lat(), location.lng());
    }
  };

  useEffect(() => {
    if (props.isMapsApiLoaded && mapDivRef.current && !map) {
      const map = new google.maps.Map(mapDivRef.current, {
        center: INITIAL_MAP_CENTER,
        zoom: INITIAL_ZOOM,
      });
      setMap(map);
    }
  });

  return (
    <Paper className={clsx(props.classes?.paper, props.classes?.panel)}>
      <SearchBar className={props.classes?.search} map={map} onPlaceChanged={placeChangedHandler} />
      <div className={props.classes?.map} ref={mapDivRef}></div>
    </Paper>
  );
};

export default withSharedStyles(styles)(MapCard);
