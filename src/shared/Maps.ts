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

class Maps {
  private initPromise: Promise<void> | null = null;
  private mapElements: Record<string, unknown> = {};
  private map: google.maps.Map | null = null;

  constructor(private readonly apiKey: string) {}

  loadApiScript = (options: Record<string, string> = {}): Promise<void> => {
    if (!this.initPromise && !window.google.maps) {
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
      });
    }

    return this.initPromise as Promise<void>;
  };

  initMap = (mapElement): void => {
    let initElement = mapElement;
    if (typeof mapElement === 'string') {
      initElement = document.getElementById(mapElement);
    }

    this.map = new google.maps.Map(initElement, {
      center: INITIAL_MAP_CENTER,
      zoom: INITIAL_ZOOM,
    });
  };

  initAutocomplete = (inputElement, onPlaceChanged): google.maps.places.Autocomplete => {
    let initElement = inputElement;
    if (typeof inputElement === 'string') {
      initElement = document.getElementById(inputElement);
    }

    const autocomplete = new google.maps.places.Autocomplete(initElement, {
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

  focus = (coordinates, zoom = false) => {
    if (!this.map) {
      return;
    }

    const centerPoint = coordinates.length
      ? { lat: coordinates[1], lng: coordinates[0] }
      : coordinates;

    this.map.setCenter(centerPoint);
    if (zoom) {
      this.map.setZoom(FOCUS_ZOOM);
    }
  };

  addMarkers = (markerDescriptions, onClick) => {
    if (!this.map) {
      return;
    }

    if (!this.mapElements.markers) {
      this.mapElements.markers = [];
    }

    markerDescriptions.forEach((element) => {
      const markerOptions = {
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: { lat: element.coordinates[1], lng: element.coordinates[0] },
      };
      if (element.label) {
        markerOptions.label = element.label;
      }

      const marker = new google.maps.Marker(markerOptions);
      marker.data = element.data;

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

  getMarkerBounds = (): void => {
    if (!this.mapElements || !this.mapElements.markers) {
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    this.mapElements.markers.forEach((element) => {
      bounds.extend(element.position);
    });

    return bounds;
  };

  setMarkers = (markerDescriptions, onClick, center = true): void => {
    this.clearMarkers();
    this.addMarkers(markerDescriptions, onClick);

    if (this.map && center) {
      const bounds = this.getMarkerBounds();
      this.map.fitBounds(bounds);
    }
  };
}

export default Maps;
