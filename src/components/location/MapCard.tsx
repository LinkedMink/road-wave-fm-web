/* eslint-disable react/prop-types */
import { Paper, StyledComponentProps, StyleRulesCallback, Theme } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { Coordinates } from '../../types/Location';
import { StationViewModel } from '../../types/Station';
import SearchBar from './SearchBar';

const INITIAL_MAP_CENTER = { lat: 39.8283, lng: -98.5795 }; // Center of US
const INITIAL_ZOOM = 4;

type StyleClass = 'map';
type StyleProps = StyledComponentProps<StyleClass>;

const styles: StyleRulesCallback<Theme, Record<string, unknown>, StyleClass> = (_theme: Theme) => ({
  map: {
    minHeight: '400px',
    maxHeight: '800px',
    width: '100%',
  },
});

export interface MapCardStateProps {
  isMapsApiLoaded: boolean;
  currentLocation?: Coordinates;
  stations: StationViewModel[];
}

type MapCardProps = MapCardStateProps & SharedStyleProps & StyleProps;

const MapCard: FunctionComponent<MapCardProps> = (props) => {
  const [map, setMap] = useState<google.maps.Map>();
  const mapDivRef = React.createRef<HTMLDivElement>();

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
    <Paper className={props.classes?.paper}>
      <SearchBar map={map} />
      <div className={props.classes?.map} ref={mapDivRef}></div>
    </Paper>
  );
};

export default withSharedStyles(styles)(MapCard);
