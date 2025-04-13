class MarkerModel {
  id: string;
  lng: number;
  lat: number;
  name: string|null = null

  mapMarkerInfo: any|null = null;

  constructor(id:string, lng:number, lat:number) {
    this.id = id;
    this.lng = lng;
    this.lat = lat;
  }

  setCustomOverlayMarker(name:string):void {
    this.name = name;
  }
}

export default MarkerModel;
