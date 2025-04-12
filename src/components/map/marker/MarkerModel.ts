class MarkerModel {
  lng: number;
  lat: number;
  name: string|null = null

  constructor(lng:number, lat:number) {
    this.lng = lng;
    this.lat = lat;
  }

  setCustomOverlayMarker(name:string):void {
    this.name = name;
  }
}

export default MarkerModel;
