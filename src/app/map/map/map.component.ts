import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  mapWidth = '100%';
  mapHeight = '100vh';
  options: google.maps.MapOptions = {
    center: { lat: 43.141096, lng: 20.518112 },
    zoom: 14,
    minZoom: 14,
    maxZoom: 18,
  };
  constructor() {}
}
