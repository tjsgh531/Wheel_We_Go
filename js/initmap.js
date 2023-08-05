export class InitMap {
    constructor() {
      this.map;
      this.curLat;
      this.curLon;
      this.initTmap();
    }
  
    async initTmap() {
        try {
            const position = await this.getCurrentLocation();
            this.curLat = position.coords.latitude;
            this.curLon = position.coords.longitude;
            console.log('현재 위치 정보:', this.curLat, this.curLon);
    
            this.map = new Tmapv3.Map("map_div", {
                center: new Tmapv3.LatLng(this.curLat, this.curLon),
                width: "100%",
                height: "100vh",
                zoom: 16
            });
        } catch (error) {
            console.error('지도 초기화 중 오류 발생:', error);
        }
    }
  
    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
            reject(new Error('Geolocation이 지원되지 않는 브라우저입니다.'));
            }
        });
    }
}
  
