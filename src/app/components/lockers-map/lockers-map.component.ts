import { Component, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ServerUserService } from '../../services/server-user.service';

@Component({
  selector: 'app-lockers-map',
  templateUrl: './lockers-map.component.html',
  styleUrls: ['./lockers-map.component.scss']
})
export class LockersMapComponent implements OnInit {
  @Input() arrayMarkerMap;
  @Input() arrayListLockers;
  zoom: number = 8;// google maps zoom level
  // initial center position for the map
  lat: number = 25.690290;
  lng: number = -100.315014;
  count: number = 0; 

  arrayMarker:any = [];
  arrayLockers;

  arrAuxMarker;
  arrAuxLocker;

  constructor(
    private ServerUserService: ServerUserService,
    private _router: Router) { }

  ngOnInit() {}

  ngOnChanges(changes:SimpleChanges){
    if(this.arrayMarkerMap && this.arrayListLockers){

      this.arrAuxMarker = JSON.parse(this.arrayMarkerMap);
      this.arrayMarker = this.arrayMarkerMap;

      this.arrAuxLocker = JSON.parse(this.arrayListLockers);
      this.arrayLockers = JSON.parse(this.arrayListLockers);
    }
  }

  onSeeLocker(id_locker, name_locker){
    this.ServerUserService.setIdLocker(id_locker);
    this._router.navigateByUrl("d-ad/locker/"+name_locker);
  }

  filterLockersList(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.arrayMarker = this.arrAuxMarker.filter( i => i.locker_name.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0);
    this.arrayMarker = JSON.stringify(this.arrayMarker);

    this.arrayLockers = this.arrAuxLocker.filter( i => i.locker_name.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0);
  }

}
