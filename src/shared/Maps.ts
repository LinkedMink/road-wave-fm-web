const GOOGLE_MAPS_BASE_URL = "https://maps.googleapis.com/maps/api/js?";
const TEMP_ON_LOAD_FUNCTION = "onGoogleMapsApiLoaded";
const INITIAL_MAP_CENTER = { lat: 39.8283, lng: -98.5795 }; // Center of US
const INITIAL_ZOOM = 4;
const FOCUS_ZOOM = 11;

let maps;

class GoogleMaps {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.loadingPromise = null;
    this.mapElements = {};
  }

  loadApiScript = (options = {}) => {
    if (!this.loadingPromise && !maps) {
      this.loadingPromise = new Promise((resolve, reject) => {
        try {
          window[TEMP_ON_LOAD_FUNCTION] = resolve;

          options.key = this.apiKey;
          options.callback = TEMP_ON_LOAD_FUNCTION;
          const optionsQuery = Object.keys(options)
            .map(
              k => `${encodeURIComponent(k)}=${encodeURIComponent(options[k])}`
            )
            .join("&");

          const url = GOOGLE_MAPS_BASE_URL + optionsQuery;

          const script = document.createElement("script");

          script.setAttribute("src", url);
          script.setAttribute("async", "");
          script.setAttribute("defer", "");

          document.head.appendChild(script);
        } catch (error) {
          reject(error);
        }
      }).then(() => {
        window.onGoogleMapsApiLoaded = undefined;
        maps = window.google.maps;
      });
    }

    return this.loadingPromise;
  };

  initMap = mapElement => {
    let initElement = mapElement;
    if (typeof mapElement === "string") {
      initElement = document.getElementById(mapElement);
    }

    this.map = new maps.Map(initElement, {
      center: INITIAL_MAP_CENTER,
      zoom: INITIAL_ZOOM,
    });
  };

  initDirections = () => {
    this.directionsService = new maps.DirectionsService();
    this.directionsRenderer = new maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);
  };

  initAutocomplete = (inputElement, onPlaceChanged) => {
    let initElement = inputElement;
    if (typeof inputElement === "string") {
      initElement = document.getElementById(inputElement);
    }

    const autocomplete = new maps.places.Autocomplete(initElement, {
      componentRestrictions: { country: "us" },
      types: ["geocode"],
    });

    //autocomplete.bindTo(this.map);
    //this.boundElements[inputElementId] = autocomplete

    if (onPlaceChanged) {
      const handler = onPlaceChanged(autocomplete);
      autocomplete.addListener("place_changed", handler);
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

    markerDescriptions.forEach(element => {
      const markerOptions = {
        map: this.map,
        animation: maps.Animation.DROP,
        position: { lat: element.coordinates[1], lng: element.coordinates[0] },
      };
      if (element.label) {
        markerOptions.label = element.label;
      }

      const marker = new maps.Marker(markerOptions);
      marker.data = element.data;

      if (element.description) {
        const info = new maps.InfoWindow({
          content: `<div>${element.description}</div>`,
        });

        marker.addListener("mouseover", () => {
          info.open(this.map, marker);
        });

        marker.addListener("mouseout", () => {
          info.close();
        });
      }

      if (onClick) {
        marker.addListener("click", onClick(marker));
      }

      this.mapElements.markers.push(marker);
    });
  };

  clearMarkers = () => {
    if (!this.mapElements || !this.mapElements.markers) {
      return;
    }

    this.mapElements.markers.forEach(element => {
      element.setMap(null);
    });

    this.mapElements.markers = [];
  };

  getMarkerBounds = () => {
    if (!this.mapElements || !this.mapElements.markers) {
      return;
    }

    const bounds = new maps.LatLngBounds();
    this.mapElements.markers.forEach(element => {
      bounds.extend(element.position);
    });

    return bounds;
  };

  setMarkers = (markerDescriptions, onClick, center = true) => {
    this.clearMarkers();
    this.addMarkers(markerDescriptions, onClick);

    if (this.map && center) {
      const bounds = this.getMarkerBounds();
      this.map.fitBounds(bounds);
    }
  };

  setRoute = (source, destination, onRouteRetrieved) => {
    const sourcePoint = source.length
      ? { lat: source[1], lng: source[0] }
      : source;

    const destinationPoint = destination.length
      ? { lat: destination[1], lng: destination[0] }
      : destination;

    const routeRequest = {
      origin: sourcePoint,
      destination: destinationPoint,
      travelMode: maps.TravelMode["DRIVING"],
    };

    this.directionsService.route(routeRequest, (response, status) => {
      if (status === "OK") {
        this.directionsRenderer.setDirections(response);
        if (onRouteRetrieved) {
          onRouteRetrieved(response);
        }
      }
    });
  };
}

export default GoogleMaps;
