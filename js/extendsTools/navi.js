export class Navi {
    constructor() {
        this.currentLat, this.currentLon;
        this.map;
      
        this.marker_SE = "";  
        this.markerObj;
        this.marker_p1;
        this.marker_p2;
        this.polyline_;
        this.markerImg = "";
        this.pType = "";
        this.size;

        this.totalMarkerArr = [];
        this.drawInfoArr =[];
        this.resultdrawArr = [];
    }
    
    setMap(map){
        this.map = map;
    }


    navi( startLat, startLng, endLat, endLng){
        
        // 기존 그려진 라인 & 마커가 있다면 초기화
        this.eraseLineMarks()

        // 시작 도착 심볼 찍기
        this.marker_SE = "S"
        this.makeMark(startLat, startLng);
        // 도착 심볼 찍기
        this.marker_SE = "E"
        this.makeMark(endLat, endLng);

        const headers = {}; 
		    headers["appKey"]="l7xxed2c734830ae4364975ef11e67a76e81";

        $.ajax({
            method : "POST",
            headers : headers,
            url : "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
            async : false,
            data : {
                "startX" : startLng.toString(),
                "startY" : startLat.toString(),
                "endX" : endLng.toString(),
                "endY" : endLat.toString(),
                "reqCoordType" : "WGS84GEO",
                "resCoordType" : "EPSG3857",
                "startName" : "출발지",
                "endName" : "도착지"
            },
            success : (response) => {
                const resultData = response.features;

                //결과 출력
                const tDistance = "총 거리 : "
                        + ((resultData[0].properties.totalDistance) / 1000)
                                .toFixed(1) + "km,";
                const tTime = " 총 시간 : "
                        + ((resultData[0].properties.totalTime) / 60)
                                .toFixed(0) + "분";
                console.log(tDistance + tTime);
                $("#result").text(tDistance + tTime);
                
                for ( let i in resultData) { //for문 [S]
                    const geometry = resultData[i].geometry;
                    const properties = resultData[i].properties;


                    if (geometry.type == "LineString") {
                        for ( const j in geometry.coordinates) {
                            // 경로들의 결과값(구간)들을 포인트 객체로 변환 
                            const latlng = new Tmapv3.Point(
                                    geometry.coordinates[j][0],
                                    geometry.coordinates[j][1]);
                            // 포인트 객체를 받아 좌표값으로 변환
                            const convertPoint = new Tmapv3.Projection.convertEPSG3857ToWGS84GEO(
                                    latlng);
                            // 포인트객체의 정보로 좌표값 변환 객체로 저장
                            const convertChange = new Tmapv3.LatLng(
                                    convertPoint._lat,
                                    convertPoint._lng);
                            
                            // 배열에 담기
                            this.drawInfoArr.push(convertChange);
                        }
                    } else {
                        if (properties.pointType == "S") { //출발지 마커
                            this.markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
                            this.pType = "S";
                            this.size = new Tmapv3.Size(24, 38);
                        } else if (properties.pointType == "E") { //도착지 마커
                            this.markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
                            this.pType = "E";
                            this.size = new Tmapv3.Size(24, 38);
                        } 
                        else { //각 포인트 마커
                            this.markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                            this.pType = "P";
                            this.size = new Tmapv3.Size(8, 8);
                        }

                        // 경로들의 결과값들을 포인트 객체로 변환 
                        const latlon = new Tmapv3.Point(
                                geometry.coordinates[0],
                                geometry.coordinates[1]);

                        // 포인트 객체를 받아 좌표값으로 다시 변환
                        const convertPoint = new Tmapv3.Projection.convertEPSG3857ToWGS84GEO(latlon);
                        

                        const routeInfoObj = {
                            markerImage : this.markerImg,
                            lng : convertPoint._lng,
                            lat : convertPoint._lat,
                            pointType : this.pType
                        };

                        // Marker 추가
                        this.marker_p = new Tmapv3.Marker({
                        position : new Tmapv3.LatLng(
                                routeInfoObj.lat,
                                routeInfoObj.lng),
                        icon : routeInfoObj.markerImage,
                        iconSize : this.size,
                        map : this.map
                        });
                        this.totalMarkerArr.push(this.marker_p);
                    }
                }//for문 [E]
              
                this.drawLine();

            },
            
        })
    }

    
    makeMark(lat, lng){

        if(this.marker_SE == "S"){ 
            this.markerObj = new Tmapv3.Marker(
                {
                    position : new Tmapv3.LatLng(lat, lng),
                    icon : "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
                    iconSize : new Tmapv3.Size(24, 38),
                    map : this.map
                }
        )}else{ 
            this.markerObj = new Tmapv3.Marker(
                {
                    position : new Tmapv3.LatLng(lat, lng),
                    icon : "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
                    iconSize : new Tmapv3.Size(24, 38),
                    map : this.map
                }
        )};
        this.totalMarkerArr.push(this.markerObj);

    }
    

    drawLine(){
        this.polyline_ = new Tmapv3.Polyline({
            path : this.drawInfoArr,
            strokeColor : "#dd00dd",
            strokeWeight : 6,
            direction : true,
            map : this.map
        });
        this.resultdrawArr.push(this.polyline_);
    }

    eraseLineMarks(){
        if(this.resultdrawArr.length > 0) {
            for ( const i in this.resultdrawArr) {
                this.resultdrawArr[i].setMap(null);
            }
            for ( const i in this.totalMarkerArr) {
                this.totalMarkerArr[i].setMap(null);
            }
            this.resultdrawArr = [];
        }
        this.drawInfoArr = [];
    }
}