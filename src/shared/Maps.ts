import { Coordinates } from '../types/Location';
import { isArray, isString } from './TypeCheck';

const GOOGLE_MAPS_BASE_URL = 'https://maps.googleapis.com/maps/api/js?';
const TEMP_ON_LOAD_FUNCTION = 'onGoogleMapsApiLoaded';
const INITIAL_MAP_CENTER = { lat: 39.8283, lng: -98.5795 }; // Center of US
const INITIAL_ZOOM = 4;
const FOCUS_ZOOM = 11;

declare global {
  interface Window {
    [TEMP_ON_LOAD_FUNCTION]?: () => void;
  }
}

interface MapElements {
  markers: google.maps.Marker[];
}

export interface MarkerDescription {
  label: string;
  description: string;
  coordinates: number[];
}

export type MarkerHandler = (marker: google.maps.Marker) => () => void;
export type AutoCompleteHandler = (marker: google.maps.places.Autocomplete) => () => void;

class Maps {
  private initPromise: Promise<Maps> | null = null;
  private mapElements: MapElements = {
    markers: [],
  };
  private map: google.maps.Map | null = null;

  constructor(private readonly apiKey: string) {}

  loadApiScript = (options: Record<string, string> = {}): Promise<Maps> => {
    if (!this.initPromise && !window.google?.maps) {
      this.initPromise = new Promise<void>((resolve, reject) => {
        try {
          window[TEMP_ON_LOAD_FUNCTION] = resolve;

          options.key = this.apiKey;
          options.callback = TEMP_ON_LOAD_FUNCTION;
          const optionsQuery = Object.keys(options)
            .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(options[k])}`)
            .join('&');

          const url = GOOGLE_MAPS_BASE_URL + optionsQuery;

          const script = document.createElement('script');

          script.setAttribute('src', url);
          script.setAttribute('async', '');
          script.setAttribute('defer', '');

          document.head.appendChild(script);
        } catch (error) {
          reject(error);
        }
      }).then(() => {
        window[TEMP_ON_LOAD_FUNCTION] = undefined;
        return this;
      });
    }

    return this.initPromise as Promise<Maps>;
  };

  initMap = (mapElement: string | HTMLElement): void => {
    let element: HTMLElement;
    if (isString(mapElement)) {
      const foundElement = document.getElementById(mapElement);
      if (!foundElement) {
        throw new Error(`ID not found: ${mapElement}`);
      }
      element = foundElement;
    } else {
      element = mapElement;
    }

    this.map = new google.maps.Map(element, {
      center: INITIAL_MAP_CENTER,
      zoom: INITIAL_ZOOM,
    });
  };

  initAutocomplete = (
    inputElement: string | HTMLInputElement,
    onPlaceChanged: AutoCompleteHandler,
  ): google.maps.places.Autocomplete => {
    let element: HTMLInputElement;
    if (isString(inputElement)) {
      const foundElement = document.getElementById(inputElement);
      if (!foundElement) {
        throw new Error(`ID not found: ${inputElement}`);
      }
      element = foundElement as HTMLInputElement;
    } else {
      element = inputElement;
    }

    const autocomplete = new google.maps.places.Autocomplete(element, {
      componentRestrictions: { country: 'us' },
      types: ['geocode'],
    });

    //autocomplete.bindTo(this.map);
    //this.boundElements[inputElementId] = autocomplete

    if (onPlaceChanged) {
      const handler = onPlaceChanged(autocomplete);
      autocomplete.addListener('place_changed', handler);
    }

    return autocomplete;
  };

  focus = (coordinates: number[] | Coordinates, zoom = false): void => {
    if (!this.map) {
      return;
    }

    const centerPoint = isArray(coordinates)
      ? { lat: coordinates[1], lng: coordinates[0] }
      : coordinates;

    this.map.setCenter(centerPoint);
    if (zoom) {
      this.map.setZoom(FOCUS_ZOOM);
    }
  };

  addMarkers = (markerDescriptions: MarkerDescription[], onClick: MarkerHandler): void => {
    if (!this.map) {
      return;
    }

    markerDescriptions.forEach((element) => {
      const markerOptions: google.maps.MarkerOptions = {
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: { lat: element.coordinates[1], lng: element.coordinates[0] },
      };
      if (element.label) {
        markerOptions.label = element.label;
      }

      const marker = new google.maps.Marker(markerOptions);

      if (element.description) {
        const info = new google.maps.InfoWindow({
          content: `<div>${element.description}</div>`,
        });

        marker.addListener('mouseover', () => {
          info.open(this.map, marker);
        });

        marker.addListener('mouseout', () => {
          info.close();
        });
      }

      if (onClick) {
        marker.addListener('click', onClick(marker));
      }

      this.mapElements.markers.push(marker);
    });
  };

  clearMarkers = (): void => {
    if (!this.mapElements || !this.mapElements.markers) {
      return;
    }

    this.mapElements.markers.forEach((element) => {
      element.setMap(null);
    });

    this.mapElements.markers = [];
  };

  getMarkerBounds = (): google.maps.LatLngBounds | void => {
    if (!this.mapElements || !this.mapElements.markers) {
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    this.mapElements.markers.forEach((element) => {
      const position = element.getPosition();
      if (position) {
        bounds.extend(position);
      }
    });

    return bounds;
  };

  setMarkers = (
    markerDescriptions: MarkerDescription[],
    onClick: MarkerHandler,
    center = true,
  ): void => {
    this.clearMarkers();
    this.addMarkers(markerDescriptions, onClick);

    if (this.map && center) {
      const bounds = this.getMarkerBounds();
      if (bounds) {
        this.map.fitBounds(bounds);
      }
    }
  };
}

export default Maps;
