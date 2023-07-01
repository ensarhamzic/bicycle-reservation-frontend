import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  mapWidth = '100%';
  mapHeight = '100%';
  mapOptions: google.maps.MapOptions = {
    center: { lat: 43.141096, lng: 20.518112 },
    zoom: 14,
    mapId: '1aae11f303a526f0',
    minZoom: 14,
    maxZoom: 18,
    disableDefaultUI: true,
    restriction: {
      latLngBounds: {
        north: 43.2,
        south: 43.1,
        west: 20.4,
        east: 20.6,
      },
      strictBounds: true,
    },
  };

  markerIcon: google.maps.Icon = {
    url: '../../../assets/map-marker.svg',
    scaledSize: new google.maps.Size(30, 30),
  };

  markerOptions: google.maps.MarkerOptions = {
    icon: this.markerIcon,
  };

  constructor() {}

  onMapClick(event: google.maps.MapMouseEvent) {
    event.stop(); // prevents map icon click event
    console.log(event.latLng?.toJSON()); // coordinates
  }

  onMarkerClick(event: string) {
    console.log(event);
  }
}
