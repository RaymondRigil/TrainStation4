import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Facility } from "../model/facility.model";


@Injectable()
export class DataService {
  private messageSource = new BehaviorSubject<any>({});
  private selectedAreaIndex = new BehaviorSubject<number>(0);
  private facility = new BehaviorSubject<Facility>({center:{lat: 40.668140, lng: -76.349487}});
  private selectedAirspacesIndices = new BehaviorSubject<any[]>([{ pAirspaceIndex:999, pConfIndex: 999}]);
  private selectedVideomapIndex = new BehaviorSubject<number>(777);
  private altAirspaceConfArr = new BehaviorSubject<any[]>([]);
  private associatedAirspaces = new BehaviorSubject<any[]>([]);
  private selectedAltitude = new BehaviorSubject<number>(190);
  
  
  currentFacility = this.facility.asObservable();
  currentVideomapIndex = this.selectedVideomapIndex.asObservable();
  currentSelectedAirspacesIndices = this.selectedAirspacesIndices.asObservable();
  currentSelectedAreaIndex = this.selectedAreaIndex.asObservable();
  currentAltAirspaceConfArr = this.altAirspaceConfArr.asObservable();
  currentAssociatedAirspaces = this.associatedAirspaces.asObservable();
  currentSelectedAltitude = this.selectedAltitude.asObservable();
  
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  changeMessage(message: any) {
    this.messageSource.next(message)
  }
  
  changeSelectedArea(selectedAreaIndex: number){
     this.selectedAreaIndex.next(selectedAreaIndex);
  }
  
  
  changeFacilityData(someFac: Facility){
	  this.facility.next(someFac);
  }
  
  changeSelectedAirspacesIndices(someArr: any[]){
	  this.selectedAirspacesIndices.next(someArr);
  }
  
  changeSelectedVideomapIndex(selectedVideomapIndex: number){
     this.selectedVideomapIndex.next(selectedVideomapIndex);
  }
  
  changeSelectedAreaIndex(selectedAreaIndex: number){
     this.selectedAreaIndex.next(selectedAreaIndex);
  }
  
  changeAltAirspaceConfArr(altAirspaceConfArr: any[]){
	  this.altAirspaceConfArr.next(altAirspaceConfArr);
  }
  
  changeAssociatedAirspaces(associatedAirspaces: any[]){
	  this.associatedAirspaces.next(associatedAirspaces);
  }
  
  changeSelectedAltitude(selectedAltitude: number){
	  this.selectedAltitude.next(selectedAltitude);
  }
  
  
}