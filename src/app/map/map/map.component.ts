import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IStation } from 'src/app/shared/models/station.model';
import { Easing, Tween, update } from '@tweenjs/tween.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnChanges {
  @Output() mapClick: EventEmitter<google.maps.MapMouseEvent> =
    new EventEmitter();
  @Output() markerClick: EventEmitter<number> = new EventEmitter();
  @Output() mapMoveEnd: EventEmitter<number | null> = new EventEmitter();
  @Input() stations: IStation[] = [];
  @Input() tempMarker: { lat: number; lng: number } | null = null;
  @Input() userCords: { lat: number; lng: number } = { lat: 0, lng: 0 };
  @Input() moveTo: {
    lat: number;
    lng: number;
    stationId: number | null;
  } | null = null;

  map: google.maps.Map | null = null;
  mapWidth = '100%';
  mapHeight = '90vh';
  mapOptions: google.maps.MapOptions = {
    center: { lat: 43.141096, lng: 20.518112 },
    zoom: 14,
    mapId: '1aae11f303a526f0',
    minZoom: 14,
    maxZoom: 18,
    disableDefaultUI: true,
    restriction: {
      latLngBounds: {
        north: 43.24,
        south: 43.05,
        west: 20.29,
        east: 20.69,
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

  userMarkerIcon: google.maps.Icon = {
    url: '../../../assets/user-marker.png',
    scaledSize: new google.maps.Size(40, 40),
  };

  markerOptions: google.maps.MarkerOptions = {
    icon: this.stationIcon,
  };

  userMarkerOptions: google.maps.MarkerOptions = {
    icon: this.userMarkerIcon,
  };

  tempMarkerOptions: google.maps.MarkerOptions = {
    icon: this.markerIcon,
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map != null && this.moveTo === null) {
      this.map.setZoom(14);
      const map = this.map!;

      setTimeout(() => {
        map.panTo({ lat: 43.141096, lng: 20.518112 });
      }, 1000);
    }

    if (this.map && this.moveTo) {
      this.map.panTo(this.moveTo!);
      const map = this.map!;
      setTimeout(() => {
        map.setZoom(18);
        setTimeout(() => {
          this.mapMoveEnd.emit(this.moveTo!.stationId);
        }, 200);
      }, 500);
    }
  }

  onMapReady(map: google.maps.Map) {
    this.map = map;

    const rectangleOptions = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.2,
      strokeWeight: 0,
      fillColor: '#FF0000',
      fillOpacity: 0.2,
    };

    new google.maps.Rectangle({
      ...rectangleOptions,
      map,
      bounds: {
        north: 43.24,
        south: 43.2,
        west: 20.29,
        east: 20.69,
      },
    });

    new google.maps.Rectangle({
      ...rectangleOptions,
      map,
      bounds: {
        north: 43.2,
        south: 43.05,
        west: 20.6,
        east: 20.69,
      },
    });

    new google.maps.Rectangle({
      ...rectangleOptions,
      map,
      bounds: {
        north: 43.1,
        south: 43.05,
        west: 20.29,
        east: 20.6,
      },
    });
    new google.maps.Rectangle({
      ...rectangleOptions,
      map,
      bounds: {
        north: 43.2,
        south: 43.1,
        west: 20.29,
        east: 20.4,
      },
    });
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    event.stop(); // prevents default click behaviour
    this.mapClick.emit(event);
  }

  onMarkerClick(stanicaId: number) {
    this.markerClick.emit(stanicaId);
  }
}
