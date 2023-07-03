import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStation } from 'src/app/shared/models/station.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  @Output() mapClick: EventEmitter<google.maps.MapMouseEvent> =
    new EventEmitter();
  @Output() markerClick: EventEmitter<number> = new EventEmitter();
  @Input() stations: IStation[] = [];
  @Input() tempMarker: { lat: number; lng: number } | null = null;

  mapWidth = '100%';
  mapHeight = '88vh';
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

  stationIcon: google.maps.Icon = {
    url: '../../../assets/station-marker.png',
    scaledSize: new google.maps.Size(40, 40),
  };

  markerOptions: google.maps.MarkerOptions = {
    icon: this.stationIcon,
  };

  tempMarkerOptions: google.maps.MarkerOptions = {
    icon: this.markerIcon,
  };

  constructor() {}

  onMapClick(event: google.maps.MapMouseEvent) {
    event.stop(); // prevents default click behaviour
    this.mapClick.emit(event);
  }

  onMarkerClick(stanicaId: number) {
    this.markerClick.emit(stanicaId);
  }
}
