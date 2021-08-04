/* eslint-disable react/prop-types */
import { Paper } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useState } from 'react';
import Maps from '../../shared/Maps';
import { SharedStyleProps, withSharedStyles } from '../../shared/Style';
import { Coordinates } from '../../types/Location';
import { StationViewModel } from '../../types/Station';
import SearchBar from './SearchBar';

const INITIAL_MAP_CENTER = { lat: 39.8283, lng: -98.5795 }; // Center of US
const INITIAL_ZOOM = 4;

export interface MapCardStateProps {
  maps?: Maps;
  currentLocation?: Coordinates;
  stations: StationViewModel[];
}

type MapCardProps = MapCardStateProps & SharedStyleProps;

const MapCard: FunctionComponent<MapCardProps> = (props) => {
  const [map, setMap] = useState<google.maps.Map>();
  const mapDivRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (props.maps && mapDivRef.current) {
      const map = new google.maps.Map(mapDivRef.current, {
        center: INITIAL_MAP_CENTER,
        zoom: INITIAL_ZOOM,
      });
      setMap(map);
    }
  });

  return (
    <Paper className={props.classes?.paper}>
      <SearchBar mapApiRef={map} />
      <div ref={mapDivRef}></div>
    </Paper>
  );
};

export default withSharedStyles()(MapCard);
