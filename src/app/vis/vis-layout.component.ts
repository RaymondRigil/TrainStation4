import { Component, OnInit, AfterViewInit,NgZone } from '@angular/core';
import { Model } from "../vis/model/repository.model";
import { RestDataSource } from "../vis/service/rest.datasource";
import { Facility } from "../vis/model/facility.model";
import { Area } from "../vis/model/area.model";
import { Videomap } from "../vis/model/videomap.model";
import { Configuration } from "../vis/model/configuration.model";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataService } from "../vis/service/data.service";
//import { SortablejsOptions } from 'angular-sortablejs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './vis-layout.component.html',
  styleUrls:['./vis-style.css']
})
export class VisLayoutComponent implements OnInit,AfterViewInit {
	
	// constructor(private repository: Model) {
		constructor(private dataSource: RestDataSource, private dservice: DataService, public zone: NgZone) {
		  //this.facility = this.repository.getFacility();
	 //alert('fullcomp'+JSON.stringify(this.facility));
	 
	 }
  public facility: Facility = new Facility();
  public selectedArea: Area = new Area();
  public selectedVideomap: Videomap = new Videomap();
  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};
  public gVal: any = [];
  public items: any = [];
  public selVal: number = 190;
  public associatedAirspaces: any = [];
  //public options: SortablejsOptions = {};
  
 // public options: SortablejsOptions = {
 //   onUpdate: function(event: any){
			//var index = this.items.map(function(e){ return e.myclass; }).indexOf('some');
			//this.selVal = this.gVal[index].zval;
			//alert('selVal is '+this.selVal);
//			alert(event.newIndex);
			//$scope.checkAltitudes3();
//		}
//   };
  //public options: SortablejsOptions;
  
  /*
  public options: SortablejsOptions = {
    sort: true,
	onStart: function(evt){
		alert('hello2');
	},
	
	onSort: function(evt){
		alert('hello2');
	}
   };
  */
  
  public zupdate(): void {
	  var index = this.items.map(function(e){ return e.myclass; }).indexOf('some');
	  this.selVal = this.gVal[index].zval;
	  console.log('this selVal is '+this.selVal);
	  this.dservice.changeSelectedAltitude(this.selVal);
  }
  
  public clickAlt(index): void {
	  this.selVal = this.gVal[index].zval;
	  for(var i=0;i < this.items.length;i++){
			if(i  != index){
				this.items[i].myclass ="";
			}
			else{ 
				this.items[i].myclass ="some";
			}
		}
	  this.dservice.changeSelectedAltitude(this.selVal);
	  
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
	this.dataSource.getData().subscribe(data => { 
	this.facility = data; 
	this.dservice.changeFacilityData(this.facility);
	for(var i =0; i< this.facility.areas.length;i++){
		for(var j = 0; j < this.facility.areas[i].airspaces.length;j++){
			this.facility.areas[i].airspaces[j].isSelected = false;
			if(this.facility.areas[i].airspaces[j].configurations){
				/*
				for(var k = 0; k < this.facility.areas[i].airspaces[j].configuration.length;k++){
				    this.facility.areas[i].airspaces[j].configuration[k].isSelected = false;
				}
				this.facility.areas[i].airspaces[j].configuration[0].isSelected = true;
				*/
				this.facility.areas[i].airspaces[j].confIndex = "0";
			}
			
		}
	}
	alert('component'+this.facility.id); 
	});
	
	this.gVal = [{zval:190,asNames:[]},{zval:180,asNames:[]},{zval:170,asNames:[]},{zval:160,asNames:[]},{zval:150,asNames:[]},{zval:140,asNames:[]},{zval:130,asNames:[]},{zval:120,asNames:[]},{zval:110,asNames:[]},{zval:100,asNames:[]},{zval:90,asNames:[]},{zval:80,asNames:[]},{zval:70,asNames:[]},{zval:60,asNames:[]},{zval:50,asNames:[]},{zval:40,asNames:[]},{zval:30,asNames:[]},{zval:20,asNames:[]},{zval:10,asNames:[]},{zval:0,asNames:[]}];
 
    this.items =[];
	var zObj = {myclass:""};
	
	for(var i =0; i < this.gVal.length; i++){
		this.items.push(Object.assign({},zObj));
	}
	this.items[0].myclass="some";
	
	this.selVal = this.gVal[0].zval;
	
	/*
	this.options = {
    sort: true,
	onStart: function(evt){
		alert('hello2');
	},
	
	onSort: function(evt){
		alert('hello2');
	}
   };
   */
   
   this.dservice.currentAssociatedAirspaces.subscribe(zfac  => {
		//if(zfac.length >0){
			//alert(JSON.stringify(zfac));
			if(zfac.length >0){
			this.gVal = [{zval:210,asNames:[]},{zval:180,asNames:[]},{zval:170,asNames:[]},{zval:160,asNames:[]},{zval:150,asNames:[]},{zval:140,asNames:[]},{zval:130,asNames:[]},{zval:120,asNames:[]},{zval:110,asNames:[]},{zval:100,asNames:[]},{zval:90,asNames:[]},{zval:80,asNames:[]},{zval:70,asNames:[]},{zval:60,asNames:[]},{zval:50,asNames:[]},{zval:40,asNames:[]},{zval:30,asNames:[]},{zval:20,asNames:[]},{zval:10,asNames:[]},{zval:0,asNames:[]}];
			}
			this.associatedAirspaces = zfac;
			for(var i =0; i<this.gVal.length;i++){
			this.gVal[i].asNames =[];
				for(var k =0; k< this.associatedAirspaces.length;k++){
				
					if(this.associatedAirspaces[k].altArr){
					if(this.associatedAirspaces[k].altArr.includes(this.gVal[i].zval)){
						if(this.gVal[i].asNames.map(function(e){ return e.name; }).indexOf(this.associatedAirspaces[k].name)<0){
						this.gVal[i].asNames.push(Object.assign({},{name:this.associatedAirspaces[k].name,color:this.associatedAirspaces[k].color }));
						}
					}
					}
				}
			
			}
			this.zone.run(() => this.gVal = this.gVal);
			console.log(JSON.stringify(this.gVal));
			
			
		//}
    });
	 
  }
  
  updateSelectedAirspaces(q,e) {
	   if(typeof(this.selectedArea.airspaces[q].confIndex)=='string'){ alert(this.selectedArea.airspaces[q].confIndex); }
	  if(this.selectedArea.name){
		  var zArr: any = [];
		  var zArr2: any = [];
		  for(var z = 0; z < this.selectedArea.airspaces.length; z++){
			  if(this.selectedArea.airspaces[z].isSelected){
				  zArr.push({ pAirspaceIndex: z, pConfIndex: parseInt(this.selectedArea.airspaces[z].confIndex)});
			  }
			  zArr2.push({ pAirspaceIndex: z, pConfIndex: parseInt(this.selectedArea.airspaces[z].confIndex)});
		  }
		  //console log would help
		  alert('flay comp'+JSON.stringify(zArr));
		  this.dservice.changeSelectedAirspacesIndices(zArr);	  
		  this.dservice.changeAltAirspaceConfArr(zArr2);
	  }  
  }
  
  
  public updateSelectedVideomap(): void {
	      var zIndex: number = 777;
	  	  this.facility.videoMaps.forEach((vid,index) => {
			 if(vid.name == this.selectedVideomap.name){
				 zIndex = index;
			 }
			 
		  });
		  if(zIndex != 777){
			  alert('zindex'+zIndex);
			this.dservice.changeSelectedVideomapIndex(zIndex);
          }		  
  }
  
  public updateSelectedArea(): void {
	      var zIndex: number = 777;
	  	  this.facility.areas.forEach((area,index) => {
			 if(area.name == this.selectedArea.name){
				 zIndex = index;
			 }
			 
		  });
		  if(zIndex != 777){
			  //alert('zindex'+zIndex);
			var zArr2 = [];
			for(var z = 0; z < this.selectedArea.airspaces.length; z++){
			  zArr2.push({ pAirspaceIndex: z, pConfIndex: parseInt(this.selectedArea.airspaces[z].confIndex)});
		    }
			this.dservice.changeAltAirspaceConfArr(zArr2);
			this.dservice.changeSelectedAreaIndex(zIndex);
          }		
		  //this.dservice.changeSelectedAreaIndex(i);	  
  }
  
  ngAfterViewInit(): void {
	  
	 //.subscribe(facility => { this.facility = facility; alert('zid'+this.facility.id);});
  }
}
