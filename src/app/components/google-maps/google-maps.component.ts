import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { ServerUserService } from '../../services/server-user.service';
import { ParseError } from '@angular/compiler';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {
  // google maps zoom level
  zoom: number = 9;

  @Input() longitud;
  @Input() latitud;
  @Input() coords;
  markers: marker[] = [];

  lat;
  lng;

  @Output() id_locker = new EventEmitter<string>();
  
  constructor(private ServerUserService: ServerUserService) {}

  ngOnInit() {
  }
  
  ngOnChanges(changes:SimpleChanges){
    if( this.longitud && this.latitud  ){
      this.lng = parseFloat(this.longitud);
      this.lat = parseFloat(this.latitud);
    }
    if( this.coords ){
      this.markers = JSON.parse(this.coords);
    }
    if (this.markers[0]) {
      this.markers[0].lng=Number(this.longitud);
      this.markers[0].lat=Number(this.latitud);
    }
  }
  
  clickedMarker(label: string, index: number) {
    this.id_locker.emit(this.markers[index]['id_locker']);
  }

  mapClicked($event: MouseEvent) {
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
