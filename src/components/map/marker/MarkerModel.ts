class MarkerModel {
  id: string;
  lng: number;
  lat: number;
  roomId: number
  name: string|null = null

  mapMarkerInfo: any|null = null;

  /**
   * @param id
   * @param lng 127...
   * @param lat 37...
   */
  constructor(id:string, lng:number, lat:number, roomId:number) {
    this.id = id;
    this.lng = lng;
    this.lat = lat;
    this.roomId = roomId;
  }

  setCustomOverlayMarker(name:string):void {
    this.name = name;
  }
}

export default MarkerModel;
