class MarkerModel {
  id: string;
  lng: number;
  lat: number;
  roomId: number
  name: string|null = null      // 커스텀 마커에 표시될 이름
  rotate: number|null = null    // 내가 기기가 보는 방향

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

  setCurrentMyPosition(rotate:number):void {
    this.rotate = rotate
  }
}

export default MarkerModel;
