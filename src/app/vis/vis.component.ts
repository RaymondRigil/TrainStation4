import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "../vis/service/data.service";
import { Facility } from "../vis/model/facility.model";
import * as Papa from 'papaparse/papaparse.min.js';
declare var jquery:any;
declare var $ :any;
declare var google : any;

@Component({
  templateUrl: 'vis.component.html'
})
export class  VisComponent implements OnInit {

  constructor(private dservice: DataService, public zone: NgZone) { 
     
  }
  
  public mymap:any = {};
  private facility: Facility = new Facility();
  public myPolygons: any = [];
  public myMarkerArr: any = [];
  public selectedAreaIndex: number = 999;
  public selectedVideomapIndex: number = 999;
  public selectedAirspacesIndices: any[] = [];
  public polyArray: any = [];
  public myMarkers: any = [];
  public videoMapLineArray: any = [];
  //public gVal: any = [];
  public altAirspaceConfArr: any = [];
  public associatedAirspaces: any =[];
  public selVal: number = 190;
  //shows flight controls
  public included: boolean = false;
  public showRouteControls: boolean = false;
  public fltMarker: any = {};
  public infoWindow: any = {};
  public startPoint: any = {};
  public mainFlightData: any = [];
  public flightTransitionData: any = [];
  public flightDuration: number = 0;
  public flightAircraftType: string = '';
  public mainFlightDataCounter: number = 0;
  
  public flightACID: any = '';
  public fltTicks: number = 0;
  public flightElevation: any = '';
  public flightSpeed: any = 0;
  public flightSlider: any = {};
  public flightATC:any = '';
  public notPlaying: boolean = true;
  public intervalMgr: any = {};
  ///check usage of this.zindex in visCtrl.js
  public zindex: number = 0;
  
  public gVal: any = this.gVal = [{zval:190,asNames:[]},{zval:180,asNames:[]},{zval:170,asNames:[]},{zval:160,asNames:[]},{zval:150,asNames:[]},{zval:140,asNames:[]},{zval:130,asNames:[]},{zval:120,asNames:[]},{zval:110,asNames:[]},{zval:100,asNames:[]},{zval:90,asNames:[]},{zval:80,asNames:[]},{zval:70,asNames:[]},{zval:60,asNames:[]},{zval:50,asNames:[]},{zval:40,asNames:[]},{zval:30,asNames:[]},{zval:20,asNames:[]},{zval:10,asNames:[]},{zval:0,asNames:[]}];
 
  
  
  public brandPrimary:string =  '#20a8d8';
  public brandSuccess:string =  '#4dbd74';
  public brandInfo:string =   '#63c2de';
  public brandWarning:string =  '#f8cb00';
  public brandDanger:string =   '#f86c6b';

  // dropdown buttons
  public status: { isopen: boolean } = { isopen: false };
  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  //convert Hex to RGBA
  public convertHex(hex:string,opacity:number){
    hex = hex.replace('#','');
    let r = parseInt(hex.substring(0,2), 16);
    let g = parseInt(hex.substring(2,4), 16);
    let b = parseInt(hex.substring(4,6), 16);

    let rgba = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return rgba;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  // lineChart1
  public lineChart1Data:Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChart1Labels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options:any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours:Array<any> = [
    { // grey
      backgroundColor: this.brandPrimary,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend:boolean = false;
  public lineChart1Type:string = 'line';

  // lineChart2
  public lineChart2Data:Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A'
    }
  ];
  public lineChart2Labels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options:any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 34 + 5,
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours:Array<any> = [
    { // grey
      backgroundColor: this.brandInfo,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend:boolean = false;
  public lineChart2Type:string = 'line';


  // lineChart3
  public lineChart3Data:Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Series A'
    }
  ];
  public lineChart3Labels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart3Options:any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours:Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Legend:boolean = false;
  public lineChart3Type:string = 'line';


  // barChart1
  public barChart1Data:Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A'
    }
  ];
  public barChart1Labels:Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChart1Options:any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 0.6,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours:Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend:boolean = false;
  public barChart1Type:string = 'bar';

  // mainChart

  public random(min:number, max:number) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  public mainChartElements:number = 27;
  public mainChartData1:Array<number> = [];
  public mainChartData2:Array<number> = [];
  public mainChartData3:Array<number> = [];

  public mainChartData:Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Current'
    },
    {
      data: this.mainChartData2,
      label: 'Previous'
    },
    {
      data: this.mainChartData3,
      label: 'BEP'
    }
  ];
  public mainChartLabels:Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public mainChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value:any) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours:Array<any> = [
    { //brandInfo
      backgroundColor: this.convertHex(this.brandInfo,10),
      borderColor: this.brandInfo,
      pointHoverBackgroundColor: '#fff'
    },
    { //brandSuccess
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
      pointHoverBackgroundColor: '#fff'
    },
    { //brandDanger
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend:boolean = false;
  public mainChartType:string = 'line';

  // social box charts

  public socialChartData1:Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Facebook'
    }
  ];
  public socialChartData2:Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: 'Twitter'
    }
  ];
  public socialChartData3:Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'LinkedIn'
    }
  ];
  public socialChartData4:Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Google+'
    }
  ];

  public socialChartLabels:Array<any> = ['January','February','March','April','May','June','July'];
  public socialChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display:false,
      }],
      yAxes: [{
        display:false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public socialChartColours:Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public socialChartLegend:boolean = false;
  public socialChartType:string = 'line';

  // sparkline charts

  public sparklineChartData1:Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Clients'
    }
  ];
  public sparklineChartData2:Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Clients'
    }
  ];

  public sparklineChartLabels:Array<any> = ['January','February','March','April','May','June','July'];
  public sparklineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display:false,
      }],
      yAxes: [{
        display:false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public sparklineChartDefault:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: '#d1d4d7',
    }
  ];
  public sparklineChartPrimary:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandPrimary,
    }
  ];
  public sparklineChartInfo:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandInfo,
    }
  ];
  public sparklineChartDanger:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
    }
  ];
  public sparklineChartWarning:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandWarning,
    }
  ];
  public sparklineChartSuccess:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
    }
  ];


  public sparklineChartLegend:boolean = false;
  public sparklineChartType:string = 'line';


  ngOnInit(): void {
    //generate random values for mainChart
    for (var i = 0; i <= this.mainChartElements; i++) {
      this.mainChartData1.push(this.random(50,200));
      this.mainChartData2.push(this.random(80,100));
      this.mainChartData3.push(65);
    }
	
	
	//let zself = this;
	
		var ztester = this.mymap = new google.maps.Map(document.getElementById('mapMain'), {
		  zoom: 9,
		  center: { lat: 40.668140,  lng: -76.349487 },
		  //mapTypeId: 'terrain',
		 
		 streetViewControl:false,
		 styles: [
           
			{elementType: 'geometry', stylers: [{color: '#000000'}]},
           {elementType: 'labels.text.stroke', stylers: [{color: '#000000'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#000000'}]},
			{
				featureType: "administrative",
				elementType: "labels",
				stylers: [
				  { visibility: "off" }
				]
			  },{
				featureType: "poi",
				elementType: "labels",
				stylers: [
				  { visibility: "off" }
				]
			  },{
				featureType: "water",
				elementType: "labels",
				stylers: [
				  { visibility: "off" }
				]
			  },{
				featureType: "road",
				elementType: "labels",
				stylers: [
				  { visibility: "off" }
				]
			  },
			  {
				featureType: "road.highway",
				elementType: "labels",
				stylers: [
				  { visibility: "off" }
				]
			  },
			  {
				featureType: "all",
				elementType: "labels",
				stylers: [
				  { visibility: "off" }
				]
			  },
			  {
				featureType: "transit",
				elementType: "labels",
				stylers: [
				  { visibility: "off" }
				]
			  }

          ]
		  
		});
		
		google.maps.event.addListener(ztester,'resize',function(){
						//console.log('redrawn',$scope.areas[index].name);
					});
					
		google.maps.event.trigger(ztester,'resize');
		
		var ztester1 = this;
		
		google.maps.event.addListener(ztester, 'mousemove', function (event) {
			  ztester1.mymap.setOptions({draggableCursor:'crosshair', cursor:'crosshair',});
              ztester1.showAirspaces(event.latLng);               
         });
		
		//alert(this.mymap.getCenter());
		
		
		
		this.dservice.currentFacility.subscribe(zfac  => {
			this.facility = zfac;
			console.log('zfac'+JSON.stringify(this.facility));
			this.mymap.setCenter({lat: this.facility.center.lat, lng: this.facility.center.lng});
		});
		
		this.dservice.currentSelectedAreaIndex.subscribe(zfac  => {
			alert('dashboard area index'+zfac);
			this.selectedAreaIndex = zfac;
			
		});
		
		this.dservice.currentVideomapIndex.subscribe(vmIndex  => {
			if(vmIndex != 777){
				alert('vmindex'+vmIndex);
				this.removeVidMap();
				this.selectedVideomapIndex = vmIndex;
				//console.log('zfac'+JSON.stringify(this.facility));
				var videoMapCoordinates: any =[];	
				this.videoMapLineArray = [];
				
				for(var i=0; i< this.facility.videoMaps[this.selectedVideomapIndex].lines.length; i++){
					videoMapCoordinates[i] = [];
					for(var j=0; j< this.facility.videoMaps[this.selectedVideomapIndex].lines[i].length; j++){
							var nodeIndex = this.facility.nodes.map(function(e){ return e.id; }).indexOf(this.facility.videoMaps[this.selectedVideomapIndex].lines[i][j]);
								if(nodeIndex > -1){
									var newObj = { lat: this.facility.nodes[nodeIndex].lat, lng: this.facility.nodes[nodeIndex].lng }
									videoMapCoordinates[i].push(Object.assign({},newObj));
								}
					}
				}
				  
				  
				for(var i =0; i < videoMapCoordinates.length; i++) {
				  this.videoMapLineArray[i] = new google.maps.Polyline({
				  path: videoMapCoordinates[i],
				  geodesic: true,
				  strokeColor: '#0ed132',
				  strokeOpacity: 1.0,
				  strokeWeight: 1
				});
				
				
				this.videoMapLineArray[i].setMap(this.mymap);
				
				}
			}
		});
		
		this.dservice.currentSelectedAirspacesIndices.subscribe(zArr  => {
			this.selectedAirspacesIndices = zArr;
			this.clearPolygons();
			this.removeMarkers();
			console.log('current selected airspaces'+JSON.stringify(zArr));
			this.drawPolygons(zArr);
			
			/*
			alert('zArr'+JSON.stringify(zArr));
				
			var p = 0;
			
			this.polyArray[p] ={ color:"",pointArr:[]};
			if(this.selectedAreaIndex !=999 && zArr.length >0){
			if(zArr[0].pAirspaceIndex != 999){
				for(var i = 0; i < zArr.length; i++){
				    var theAirspace = this.facility.areas[this.selectedAreaIndex].airspaces[zArr[i].pAirspaceIndex];
					if(theAirspace.configurations[zArr[i].pConfIndex].segments){
						var theSegments = theAirspace.configurations[zArr[i].pConfIndex].segments;
						for(var m = 0; m < theSegments.length; m++){
							if(theSegments[m].altitudes.includes(this.selVal)){
								this.polyArray[p].color = theAirspace.color;
								if(theAirspace.abbreviation){
								   this.addMarker(theSegments[m].titleCoords,this.mymap,theAirspace.abbreviation.substring(0,4),p,theAirspace.color);
								}
								if(theSegments[m].polyLine){
									for(var n =0; n < theSegments[m].polyLine.length;n++){
										var nodeIndex = this.facility.nodes.map(function(e){ return e.id; }).indexOf(theSegments[m].polyLine[n]);
										if(nodeIndex > -1){
											var newObj = { lat: this.facility.nodes[nodeIndex].lat, lng: this.facility.nodes[nodeIndex].lng }
											this.polyArray[p].pointArr.push(Object.assign({},newObj));
										}
									}
								}
							    p++;
								this.polyArray[p] = { color:"",pointArr:[]};
							}
						}
					}
			    }
				this.mapPoly();
			}
			}
			*/
			
		});
		
		this.dservice.currentAltAirspaceConfArr.subscribe(zArr  => {
			this.altAirspaceConfArr = zArr;
			console.log(JSON.stringify(zArr));
		});
		
		this.dservice.currentSelectedAltitude.subscribe(zSelVal  => {
			console.log('selectedAltitude '+zSelVal);
			this.selVal = zSelVal;
			//console.log(JSON.stringify(zArr));
			//this.clearPolygons2();
			//this.removeMarkers();
			this.removeMarkers();
			this.clearPolygons3();
			this.drawPolygons(this.selectedAirspacesIndices);
			//setTimeout(this.drawPolygons(this.selectedAirspacesIndices),10000); 
			///this.clearPolygons2().then(()=>{ this.drawPolygons(this.selectedAirspacesIndices); });
			//console.log("clickalt selected airspaces"+JSON.stringify(this.selectedAirspacesIndices));
			//this.drawPolygons(this.selectedAirspacesIndices);
		});
		
		this.getMainFlightData();
		
		this.flightSlider  = {
			value: 0,
		  options: {
			floor: 0,
			ceil: 32665,
			onChange: function() { this.resetFlight(); }
		  }
		};
  } ///end ngOnInit
  
  public clearPolygons2(): Promise<any> {
	 
	 
	  return new Promise<any>(()=>{
		   for(var q = 0; q < this.myPolygons.length; q++){
				//this.myPolygons[k].setMap(null);
				this.myPolygons[q].setMap(null);
				console.log('cleared'+q);
	  }
	  this.myPolygons = [];
	  this.drawPolygons(this.selectedAirspacesIndices);
	  });
  }
  
  public clearPolygons3(): void {
	  for(var q = 0; q < this.myPolygons.length; q++){
				
				this.zone.run(() => this.myPolygons[q].setMap(null));
				console.log('cleared'+q);
				
	  }
	  this.myPolygons = [];
	  //this.drawPolygons(this.selectedAirspacesIndices);
	
  }
  
  public clearPolygons(): void {
	  this.zone.run(() => {
		 for(var q = 0; q < this.myPolygons.length; q++){
				this.myPolygons[q].setMap(null);
				console.log('cleared'+q);
	     }
		 this.myPolygons = [];
		 
	  });
	  
  }
  
  public hidePoly(): void{
		console.log(JSON.stringify(this.zindex));
		for(var i =0; i< this.myPolygons.length; i++){
			this.myPolygons[i].setMap(null);
		}
		//bermudaTriangle = [];
  }
	
  public unhidePoly(): void{
		console.log(JSON.stringify(this.zindex));
		for(var i =0; i< this.myPolygons.length; i++){
			this.myPolygons[i].setMap(this.mymap);
		}
		//bermudaTriangle = [];
  }
  
  public addMarker(location, map, label,index,zcolor): void {
        var image ="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png";
        this.myMarkers[index] = new google.maps.Marker({
          position: location,
          label: {text: label, color:zcolor},
          map: map,
		  icon: image
        });
  }
  
  public removeMarkers(): void {
	  for(var i =0; i < this.myMarkers.length; i++){
		  this.myMarkers[i].setMap(null);
	  }
	  this.myMarkers = [];
  }
  
  public removeMarkers2(): Promise<any> {
	  for(var i =0; i < this.myMarkers.length; i++){
		  this.myMarkers[i].setMap(null);
	  }
	  this.myMarkers = [];
	  return new Promise(()=>this.clearPolygons2());
  }
  
  public hideMarkers():void {
		for (var i = 0; i < this.myMarkers.length; i++) {
          this.myMarkers[i].setMap(null);
        }
		//$scope.myMarkers = [];
  }
	
  public unhideMarkers(): void{
		for (var i = 0; i < this.myMarkers.length; i++) {
          this.myMarkers[i].setMap(this.mymap);
        }
		//$scope.myMarkers = [];
  }
  
  public removeVidMap(): void {
	  for(var i =0; i < this.videoMapLineArray.length; i++){
		  this.videoMapLineArray[i].setMap(null);
	  }
	  this.videoMapLineArray = [];
  }
  
  public mapPoly(): void {
	for(var i =0; i < this.polyArray.length;i++){
			this.myPolygons[i] = new google.maps.Polygon({
								  paths: this.polyArray[i].pointArr,
								  strokeColor: this.polyArray[i].color,
								  strokeOpacity: 0.8,
								  strokeWeight: 3,
								  fillColor: this.polyArray[i].color,
								  fillOpacity: 0.5,
								  zIndex: -1
			});
			var ztester1 = this;
			this.myPolygons[i].setMap(this.mymap);
			
			this.myPolygons[i].addListener('mousemove', function(event){
				console.log('movedoverpoly');
				 ztester1.mymap.setOptions({draggableCursor:'crosshair', cursor:'crosshair',});
				ztester1.showAirspaces(event.latLng);  
			});
			
			
	}
  }
  
  
     public showAirspaces(pnt): void {
		//  showAirspaces(pnt) {
		console.log('point is',JSON.stringify(pnt));
		var testTriangle =[];
		var testPolyArr = [];
		////
		this.associatedAirspaces =[];
		var zArr = this.altAirspaceConfArr;
		console.log('emptied');
		//var asObj = { name:"",altArr:[]};
		   if('airspaces' in this.facility.areas[this.selectedAreaIndex]){
				for(var i = 0; i < zArr.length; i++){
				    var theAirspace = this.facility.areas[this.selectedAreaIndex].airspaces[zArr[i].pAirspaceIndex];
					if(theAirspace.configurations[zArr[i].pConfIndex].segments){
						var theSegments = theAirspace.configurations[zArr[i].pConfIndex].segments;
						for(var m = 0; m < theSegments.length; m++){
							
								
								if(theSegments[m].polyLine){
									for(var n =0; n < theSegments[m].polyLine.length;n++){
										var nodeIndex = this.facility.nodes.map(function(e){ return e.id; }).indexOf(theSegments[m].polyLine[n]);
										if(nodeIndex > -1){
											var newObj = { lat: this.facility.nodes[nodeIndex].lat, lng: this.facility.nodes[nodeIndex].lng }
											testPolyArr.push(Object.assign({},newObj));	
										}
									}
								}
								var dupArray = testPolyArr.slice();
								testTriangle[m] = new google.maps.Polygon({paths: dupArray});
								if(google.maps.geometry.poly.containsLocation(pnt, testTriangle[m])){
									console.log('eureka2');
									this.associatedAirspaces.push(Object.assign({},{ name:theAirspace.name.substring(0,5),color:theAirspace.color,altArr:theSegments[m].altitudes }));
									console.log('assocair',JSON.stringify(this.associatedAirspaces));
								}
							    
							
						}
					}
			    }
		   }
		   /////
		   ////this.updateAirspaceNames();
		   this.dservice.changeAssociatedAirspaces(this.associatedAirspaces);
		   
		
		
	}
	
    public updateAirspaceNames(): void {
		for(var i =0; i<this.gVal.length;i++){
			this.gVal[i].asNames =[];
			for(var k =0; k< this.associatedAirspaces.length;k++){
			
				if(this.associatedAirspaces[k].altArr){
				if(this.associatedAirspaces[k].altArr.includes(this.gVal[i].zval)){
					if(this.gVal[i].asNames.map(function(e){ return e.name; }).indexOf(this.associatedAirspaces[k].name)<0){
					this.gVal[i].asNames.push(Object.assign({},{name:this.associatedAirspaces[k].name.substring(0,5),color:this.associatedAirspaces[k].color }));
					}
				}
				}
			}
			
		}
		//$scope.$apply();
	}
	
	public drawPolygons(zArr):void {
			this.removeMarkers();
			this.clearPolygons();
			alert('zArr'+JSON.stringify(zArr));
				
			var p = 0;
			
			this.polyArray[p] ={ color:"",pointArr:[]};
			if(this.selectedAreaIndex !=999 && zArr.length >0){
			if(zArr[0].pAirspaceIndex != 999){
				for(var i = 0; i < zArr.length; i++){
				    var theAirspace = this.facility.areas[this.selectedAreaIndex].airspaces[zArr[i].pAirspaceIndex];
					if(theAirspace.configurations[zArr[i].pConfIndex].segments){
						var theSegments = theAirspace.configurations[zArr[i].pConfIndex].segments;
						for(var m = 0; m < theSegments.length; m++){
							console.log("clickalt "+this.selVal);
							if(theSegments[m].altitudes.includes(this.selVal)){
								this.polyArray[p].color = theAirspace.color;
								if(theAirspace.abbreviation){
								   this.addMarker(theSegments[m].titleCoords,this.mymap,theAirspace.abbreviation.substring(0,4),p,theAirspace.color);
								}
								if(theSegments[m].polyLine){
									for(var n =0; n < theSegments[m].polyLine.length;n++){
										var nodeIndex = this.facility.nodes.map(function(e){ return e.id; }).indexOf(theSegments[m].polyLine[n]);
										if(nodeIndex > -1){
											var newObj = { lat: this.facility.nodes[nodeIndex].lat, lng: this.facility.nodes[nodeIndex].lng }
											this.polyArray[p].pointArr.push(Object.assign({},newObj));
										}
									}
								}
							    p++;
								this.polyArray[p] = { color:"",pointArr:[]};
							}
						}
					}
			    }
				this.mapPoly();
			}
			}
		
	}
	
	public drawPolyPromise(): Promise<any>{
		return new Promise<any>(()=>{ this.drawPolygons(this.selectedAirspacesIndices); });
	}
	
	
    public includeFlightPath():void {
		if(this.included){
			
			this.showRouteControls = true;
			this.createFlightPathMarkers();
		}
		else{
			
			this.showRouteControls = false;
		}
		
	}
	
	public createFlightPathMarkers(): void{
		if(this.fltMarker){ this.fltMarker.setMap(null); }
		this.infoWindow.setContent('');
		this.startPoint = { lat:this.mainFlightData[0].lat, lng:this.mainFlightData[0].lng };
		
		var image = "assets/FF4D00-0.8.png";
		var ztester1 = this;
		
		this.fltMarker = new google.maps.Marker({
          position: this.startPoint,
        
		  icon: image,
          map: ztester1.mymap
		 
        });
		this.infoWindow.setContent('<div class="ac-box"><div class="ac-container"><div class="left-pipe-plain">|</div><div class="right-info"><div class="ac-elevation">'+this.mainFlightData[0].altitude+'</div><div class="acid-speed-type"><span class="acid-text"><span id="acid-value">'+this.mainFlightData[0].ACID+'</span> <span id="aircraft-text">'+this.mainFlightData[0].speed+'</span></span></div></div></div><div class="controller-box" id="zController"><b>'+this.flightTransitionData[0].currentATC+'</b></div></div>');
		
	    this.infoWindow.open(ztester1.mymap,this.fltMarker);
		google.maps.event.addListener(this.infoWindow, 'domready', function () {
			
			var iwOuter = $('.gm-style-iw');
			var iwBackground = iwOuter.prev();
			iwBackground.children(':nth-child(2)').css({'display' : 'none'});
			iwBackground.children(':nth-child(4)').css({'display' : 'none'});			
			var arrow_div = $(".gm-style-iw").prev();
			$("div:eq(0)", arrow_div).hide();
			$("div:eq(2)", arrow_div).hide();

		});
	}
	
	public getMainFlightData(): void {
		var ztester1 = this;
		Papa.parse("../../assets/ENSUE_NORTH_WOOLY.csv", {
				download: true,
				complete: function(results) {
					//console.log('papaparse',JSON.stringify(results));
					for(var i = 1; i < results.data.length; i++){
						if(parseFloat(results.data[i][3])){
						ztester1.mainFlightData.push({ lat: parseFloat(results.data[i][3]), lng: parseFloat(results.data[i][4]), altitude: (parseFloat(results.data[i][7])/100).toFixed(2), speed: parseFloat(results.data[i][6]), ACID: results.data[i][2]});
						ztester1.flightDuration = this.flightDuration + 235;
						}
						
					}
					console.log('mainflight'+JSON.stringify(ztester1.mainFlightData));
				}
		});
		Papa.parse("../../assets/ENSUE_NORTH_WOOLY_AC_LIST.csv", {
				download: true,
				complete: function(results) {
					//console.log('papaparse',JSON.stringify(results));
					
					ztester1.flightAircraftType = results.data[1][2];				
					
				}
		});
		Papa.parse("../../assets/ENSUE_NORTH_WOOLY_DATABLOCK.csv", {
				download: true,
				complete: function(results) {
					for(var i = 1; i < results.data.length; i++){
						if(parseFloat(results.data[i][1])){
						ztester1.flightTransitionData.push({ transTime: (parseFloat(results.data[i][1]) * 1000 / 20), currentATC: results.data[i][3], nextATC:  results.data[i][4]});
						
						}
						
					}			
					
				}
		});
	}
	
	
	
	public updateFlightPos2(): void{
		if(this.mainFlightDataCounter < this.mainFlightData.length){
			// var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
			var image = 'assets/flighticon.png';
			//$scope.fltMarker.setMap(null); 
			this.startPoint.lat = this.mainFlightData[this.mainFlightDataCounter].lat;
			this.startPoint.lng = this.mainFlightData[this.mainFlightDataCounter].lng;
			this.flightElevation = this.mainFlightData[this.mainFlightDataCounter].altitude;
			this.flightACID = this.mainFlightData[this.mainFlightDataCounter].ACID;
			this.flightSpeed = this.mainFlightData[this.mainFlightDataCounter].speed;
			console.log("new flight pos",JSON.stringify(this.startPoint));
			$('.ac-elevation').html(this.flightElevation);
			$('#acid-value').html(this.flightACID);
			/*
			if($scope.showAircraft){
				$('#aircraft-text').html($scope.flightAircraftType);
				$scope.showAircraft = false;
			}
			else{
				$('#aircraft-text').html($scope.flightSpeed);
				$scope.showAircraft = true;
			}
			*/
			if(this.fltTicks < 14){
				$('#aircraft-text').html(this.flightSpeed);
			}
			else{
				$('#aircraft-text').html(this.flightAircraftType);
			}
			if(this.fltTicks == 20){
				this.fltTicks =0;
			}
			else{
				this.fltTicks++;
			}
			this.mainFlightDataCounter++;
			this.flightSlider.value = this.flightSlider.value + 235;
			
			 //$scope.$broadcast('rzSliderForceRender');
			 /*
			$scope.fltMarker = new google.maps.Marker({
				  position: $scope.startPoint,
				  label: {text: 'UA 1347', color:'yellow'},
				  map: $scope.map,
				  icon: image
				});
			*/
			var tIndex = 0;
			for(var i=0; i < this.flightTransitionData.length; i++){
				
				if(i == 0 && this.flightSlider.value < this.flightTransitionData[i].transTime){
					this.flightATC =this.flightTransitionData[i].currentATC;
					$('#zController').html(this.flightATC);
					if(this.flightSlider.value >= this.flightTransitionData[i].transTime - 2000){
							$('#zController').addClass("blink");
					}
					else{
							$('#zController').removeClass("blink");
					}
					break;
				}
				else{
					if(this.flightSlider.value < this.flightTransitionData[i].transTime && this.flightSlider.value >= this.flightTransitionData[i-1].transTime){
						this.flightATC = this.flightTransitionData[i].currentATC;
						$('#zController').html(this.flightATC);
						if(this.flightSlider.value >= this.flightTransitionData[i].transTime - 2000){
							$('#zController').addClass("blink");
						}
						else{
							$('#zController').removeClass("blink");
						}
						break;
					}
					if(this.flightSlider.value > this.flightTransitionData[i].transTime && (i == this.flightTransitionData.length -1)){
						this.flightATC =this.flightTransitionData[i].nextATC;
						$('#zController').html(this.flightATC);
						$('#zController').removeClass("blink");
						break;
					}
					
				}
				
			}
			this.fltMarker.setPosition(new google.maps.LatLng( this.startPoint.lat, this.startPoint.lng ));
				
		}
		else{
			console.log('flight completed');
			
			////NEED ANGULAR 4 INTERVAL MGR
			////**************************************$interval.cancel($scope.intervalMgr);
			clearInterval(this.intervalMgr);
			this.notPlaying = true;
			this.mainFlightDataCounter = 0;
			this.flightSlider.value = 0;
			//$scope.$broadcast('rzSliderForceRender');
			
			
		}
	
	
	}

	public playFlightPath(): void {
		this.intervalMgr = setInterval(this.updateFlightPos2,235);
		this.notPlaying = false;
	}

	public pauseFlightPath(): void{
		clearInterval(this.intervalMgr);
		this.notPlaying = true;
	}

	

	public resetFlight(): void{
		
			clearInterval(this.intervalMgr);
			this.mainFlightDataCounter = Math.floor(this.flightSlider.value/235);
			this.intervalMgr = setInterval(this.updateFlightPos2,235);
			if(this.notPlaying){ this.notPlaying = false; }
		
	}
	
	
	public pieceDiv:any = {};
	public mesDiv:any = {};
	public resetDiv:any = {};
	public guessDiv:any = {};
	public timeDiv:any = {};
	public timeDiv_:any = {};
	public displayGame:boolean = false;
	public pieceCounter: number = 0;
	//public pieceDiv:any = {};
	public gameTimer: any = {};
	public gameInterval: any = {};
	public testPoly: any = [];
	
	public showInstructions():void {
	  var menuDiv = document.createElement('div');
	  menuDiv.style.cssText =
		  'margin: 40px 10px; border-radius: 8px; height: 320px; width: 180px;' +
		  'background-color: white; font-size: 14px; font-family: Roboto;' +
		  'text-align: center; color: grey;line-height: 32px; overflow: hidden';
	  var titleDiv = document.createElement('div');
	  titleDiv.style.cssText =
		  'width: 100%; background-color: #4285f4; color: white; font-size: 20px;' +
		  'line-height: 40px;margin-bottom: 24px';
	  titleDiv.innerText = 'Sector Puzzle';
	  var pieceTitleDiv = document.createElement('div');
	  pieceTitleDiv.innerText = 'PIECES LEFT:';
	  pieceTitleDiv.style.fontWeight = '800';
	  var pieceDiv  = document.createElement('div');
	  this.pieceDiv = pieceDiv;
	  pieceDiv.innerText = '';
	  var timeTitleDiv = document.createElement('div');
	  timeTitleDiv.innerText = 'TIME:';
	  timeTitleDiv.style.fontWeight = '800';
	  var timeDiv = this.timeDiv = this.timeDiv_ = document.createElement('div');
	  timeDiv.innerText = '0.0 seconds';
	  
	  var resetDiv = this.resetDiv = document.createElement('div');
	  resetDiv.innerText = 'Reset';
	  resetDiv.style.cssText = 
		  'cursor: pointer; border-top: 1px solid lightgrey; margin-top: 18px;' +
		  'color: #4275f4; line-heremoveight: 40px; font-weight: 800';
	  //resetDiv.onclick = console.log('hello');
	  //$scope.resetDiv.addEventListener('click',$scope.resetGame());
	  var guessDiv = this.guessDiv = document.createElement('div');
	  menuDiv.appendChild(titleDiv);
	  menuDiv.appendChild(pieceTitleDiv);
	  menuDiv.appendChild(pieceDiv);
	  menuDiv.appendChild(timeTitleDiv);
	  menuDiv.appendChild(timeDiv);
	  //menuDiv.appendChild(difficultyTitleDiv);
	 // menuDiv.appendChild(difficultySelect);
	  menuDiv.appendChild(resetDiv);
	  menuDiv.appendChild(guessDiv);
	  this.mymap.controls[google.maps.ControlPosition.TOP_LEFT].push(menuDiv);
	 // alert($scope.map.controls[google.maps.ControlPosition.TOP_LEFT].length);
	 this.resetDiv.addEventListener('click',function(){ this.resetGame(); });

	};
	
	public startGame(): void {
	
		this.showInstructions();
		this.displayGame = true;
		
		
		for(var i =0; i < this.myPolygons.length; i++){
			var zpath = this.myPolygons[i].getPaths().getArray();
			//var zpath = bermudaTriangle[i].getPaths();
			var zpath2 = [];
			console.log('zpath',JSON.stringify(zpath));
			if((zpath.length >0) && ('b' in zpath[0])){
			//var zpath1 = angular.copy(zpath[0].b);
			var zpath1 = Object.assign({},zpath[0].b);
			console.log('zpath1',JSON.stringify(zpath1));
			var zpath3 = JSON.parse(JSON.stringify(zpath1));
			for(var j =0; j < zpath3.length; j++){
				var newPt = { lat:0, lng: 0 };
				newPt.lat = zpath3[j].lat;
				newPt.lng = zpath3[j].lng -1;
				zpath2.push(Object.assign({},newPt));
				
				
			}
			
			console.log('zpath2',JSON.stringify(zpath2));
			
			//testPoly never initialized or reset??
			this.testPoly[i] = new google.maps.Polygon({
									  paths: zpath2,
									  strokeColor: '#ffff00',
									  strokeOpacity: 0.8,
									  strokeWeight: 3,
									  fillColor: '#ffff00',
									  fillOpacity: 0.05,
									  draggable: true,
									  zIndex: -1
				});
			//$scope.testPoly[i].setZIndex(google.maps.Marker.MAX_ZINDEX - 2);	
			this.testPoly[i].setMap(this.mymap);
			var bb = this.myPolygons[i].getBounds();
			
			this.testPoly[i].set('zbounds',bb);
			this.testPoly[i].set('zindex',i);
			//google.maps.event.addListener($scope.testPoly[i], 'dragend', function() {
				var ztester = this;
			 this.testPoly[i].addListener('dragend', function() {
			  
				 
				 var f1 = this.getBounds().toJSON();
				  var f2 = this.zbounds.toJSON();
				 
				  
				  if((Math.abs(f1.east - f2.east) < 0.05) && (Math.abs(f1.west - f2.west) < 0.05) && (Math.abs(f1.north - f2.north) < 0.05) && (Math.abs(f1.south - f2.south) < 0.05)){
					  // alert('correct!');
					  ztester.guessDiv.style.visibility = 'block';
					  ztester.guessDiv.style.cssText ='cursor: pointer; border-top: 1px solid lightgrey; margin-top: 18px;' +
		  'color: blue; line-heremoveight: 40px; font-weight: 800';
					  ztester.guessDiv.textContent ="CORRECT!";
					  setTimeout(function(){ ztester.guessDiv.style.visibility = 'hidden'; },1500);
				   this.setMap(null);
				   ztester.myPolygons[this.zindex].setMap(ztester.mymap);
				   ztester.pieceCounter--;
				   ztester.pieceDiv.innerText = ztester.pieceCounter;
				   if(ztester.pieceCounter <1){ ztester.endGame(); }
					  return true;
				  }else {
				//alert('molto wrongo');
				 // alert('wrong');
				 ztester.guessDiv.style.visibility = 'block';
				 ztester.guessDiv.style.cssText ='cursor: pointer; border-top: 1px solid lightgrey; margin-top: 18px;' +
		  'color: red; line-heremoveight: 40px; font-weight: 800';
					  ztester.guessDiv.textContent ="WRONG!";
					  setTimeout(function(){ this.guessDiv.style.visibility = 'hidden'; },1500);
				 return false;
				  }
				 
				 
			   
			});
			}
		
		}
		this.pieceCounter = this.testPoly.length;
		this.pieceDiv.innerText = this.pieceCounter;
		for(var i =0; i< this.myPolygons.length; i++){
				this.myPolygons[i].setMap(null);
		}
		
		///new0927
		this.hideMarkers();
		
		if (this.timeDiv) {
		 
		  this.timeDiv.textContent = '0.0 seconds';
		  
			}
			this.gameTimer = +new Date;
		 this.gameInterval = setInterval(function() {
			
	   console.log(this.timeDiv.textContent);
	  
		let diff = +new Date - this.gameTimer;
		if(this.timeDiv) {
			this.timeDiv.textContent = (diff / 1000).toFixed(2) + ' seconds';
			//$scope.$apply();
		}
		}, 100);
		
		
	}
	
	public endGame(): void{
	
		clearInterval(this.gameInterval);
		this.guessDiv.style.visibility = 'block';
				 this.guessDiv.style.cssText ='cursor: pointer; border-top: 1px solid lightgrey; margin-top: 18px;' +
		  'color: green; line-heremoveight: 40px; font-weight: 800';
					  this.guessDiv.textContent = "You correctly placed "+(this.testPoly.length - this.pieceCounter)  +" segments in "+ this.timeDiv.textContent+"seconds";
					  setTimeout(function(){ this.displayGame = false; this.mymap.controls[google.maps.ControlPosition.TOP_LEFT].clear(); },3000);
		
		
		for(var i = 0; i < this.testPoly.length; i++){
			this.testPoly[i].setMap(null);
		}
		
		this.unhideMarkers();
		this.unhidePoly();
		//$scope.testPoly = [];
	
	
	}
	
	public resetGame(): void{
	
		clearInterval(this.gameInterval);
		 this.guessDiv.style.visibility = 'block';
				 this.guessDiv.style.cssText ='cursor: pointer; border-top: 1px solid lightgrey; margin-top: 18px;' +
		  'color: green; line-heremoveight: 40px; font-weight: 800';
					  this.guessDiv.textContent = "You correctly placed "+(this.testPoly.length - this.pieceCounter)  +" segments in "+ this.timeDiv.textContent+"seconds";
					  setTimeout(function(){ this.displayGame = false; this.mymap.controls[google.maps.ControlPosition.TOP_LEFT].clear(); 
					  
					  for(var i = 0; i < this.testPoly.length; i++){
						this.testPoly[i].setMap(null);
			
						}
		
						this.startGame();
					  
					  
					  },3000);
		
	
		
		
	}


	public resetGame1(): void{
		this.endGame();
		this.startGame();
	}
	
	
	
	
	
}
