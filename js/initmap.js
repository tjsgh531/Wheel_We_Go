export class InitMap {
    constructor() {

    }
  
    createTmap(lat, lon) {
        try {
            let map = new Tmapv3.Map("map_div", {
                center: new Tmapv3.LatLng(lat, lon),
                width: "100%",
                height: "100vh",
                zoom: 18
            });

            return map;

        } catch (error) {
            console.error('지도 초기화 중 오류 발생:', error);
            return null;
        }
    }
    
    updateMap(map, lat, lon){
        const newcenter = new Tmapv3.LatLng(lat, lon);
        map[center] = newcenter;

        return map;
    }
    
}
  
