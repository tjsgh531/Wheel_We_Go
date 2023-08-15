import { DrawShape } from "./drawShape.js";
import { InitMap } from "./initmap.js";
import { CurrentPos } from "./currentPos.js";

export class Navi {
    constructor() {
        this.drawTool = new DrawShape();
        this.mapTool = new InitMap();
        this.currentPos = new CurrentPos();

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
        this.expectCoin;

        this.totalMarkerArr = [];
        this.drawInfoArr =[];
        this.resultdrawArr = [];

        // 트래킹 관련 변수
        this.istracking = false;
        this.trackingLines = [];
        this.trackingCoords = [];
        this.trackingMarkers = [];
        this.trackingMarkersCoords = [];
        this.trackingMarkStr ="";

        this.tracking_dis = 0;
    }
    
    setMap(map){
        this.map = map;
        this.drawTool.setMap(map);
    }

    setPosition(lat, lon){
        this.currentLat = lat;
        this.currentLon = lon;
    }

    //트래킹 시작
    trackingPath(){
        if(!this.istracking){
            this.istracking = true;
            
            this.trackingLines = []; //트래킹 라인 초기화

            //초 시계 초기화
            this.costTime = 0;

            // 거리 초기화
            this.tracking_dis = 0;
            
            // 좌표 초기화 
            const preLat = this.currentLat;
            const preLon = this.currentLon;
            
            this.trackingCoords.push([preLat, preLon]);

            // 라인 그리기 시작
            this.track = setInterval(()=>{
                // 시간 계산
                this.costTime += 1;

                //거리계산
                this.tracking_dis += this.caculateDistance(preLat, preLon, this.currentLat, this.currentLon);
                
                //선 그리기
                const polyline = this.drawTool.addPolyline(preLat, preLon, this.currentLat, this.currentLon);
                preLat = this.currentLat;
                preLon = this.currentLon;

                this.trackingCoords.push([preLat, preLon]);
                this.trackingLines.push(polyline);

                
            },1000);
        }
    }

    // 마커 버튼 클릭시 작동
    clickMarkBtn(){
        this.currentPos.getCurrentLocation().then((position)=>{
            const latitude = position.coords.latitude;
            const logitude = position.coords.longitude;

            const marker = this.mapTool.createMark(this.map, latitude, logitude);
            this.trackingMarkers.push(marker);
            this.trackingMarkersCoords.push([latitude, logitude]);
        });
    }

    // 날짜&시간 데이터 생성
    createDateInfo(){
        const now = new Date();

        const dataInfo ={
            year : now.getFullYear(), // 년도
            month : now.getMonth() + 1, // 월 (0부터 시작하므로 +1)
            day : now.getDate(), // 일
            hour : now.getHours(), // 시간
            minute : now.getMinutes(), // 분
        }

        return dataInfo 
    }

    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
      
    //m 단위로 거리계산
    caculateDistance(lat1, lon1, lat2, lon2) {
        const earthRadiusMeters = 6371000;
      
        const dLat = this.degreesToRadians(lat2 - lat1);
        const dLon = this.degreesToRadians(lon2 - lon1);
      
        const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
        const distance = earthRadiusMeters * c;
        return distance.toFixed(1);
    }

    //위경도에 따른 주소 가져오기
    loadGetLonLatFromAddress(lat, lon) {
		// TData 객체 생성
		var tData = new Tmapv3.extension.TData();

		var optionObj = {
			coordType: "WGS84GEO",       //응답좌표 타입 옵션 설정 입니다.
			addressType: "A04"           //주소타입 옵션 설정 입니다.
		};

		var params = {
			onComplete: function(){
                return this._responseData.addressInfo.fullAddress; //출력될 결과 주소 정보 입니다.
            },      //데이터 로드가 성공적으로 완료 되었을때 실행하는 함수 입니다.
			//데이터 로드 중에 실행하는 함수 입니다.
            onProgress: function(){
                console.log("위경도 -> 주소 변환중...")
            },
            //데이터 로드가 실패했을때 실행하는 함수 입니다.      
			onError: function(){
                alert("onError")
            } 
		};

		// TData 객체의 리버스지오코딩 함수
        return new Promise((resolve, reject)=>{
            const strdata = tData.getAddressFromGeoJson(`${lat}`,`${lon}`, optionObj, params);
            resolve(strdata);
        });

    }

    // 트래킹 종료 -> 트래킹 데이터 반환
    endTrackingPath(){
        this.istracking = false 
        clearInterval(this.track); // 선그리기 인터벌 종료

        //날짜 정보 생성
        const currentDate = this.createDateInfo();

        //코인 계산
        const coin = Math.floor((this.tracking_dis / 1000).toFixed(1) * 10);

        // 시작 주소 string & 마지막 주소 string
        const startpoint = this.trackingCoords[0];
        const endpoint = this.trackingCoords[this.trackingCoords.length -1];

        this.loadGetLonLatFromAddress(startpoint[0], startpoint[1])
        .then((start_addr_str)=>{
            const start_str = start_addr_str;
            this.loadGetLonLatFromAddress(endpoint[0], endpoint[1])
            .then((end_addr_str)=>{
                const end_str = end_addr_str;


                //데이터 저장 하기
                const trackingData = {
                    startpoint: startpoint,
                    endpoint : endpoint,

                    startName : start_str,
                    endName : end_str,

                    AtTime : this.costTime,
                    distance : this.tracking_dis,
                    coin : coin,
                    coords: this.trackingCoords,
                    data_valid : 0,
                    markings : this.trackingMarkersCoords,
                    markingStr : this.trackingMarkStr,
                    date : currentDate,
                }

                const saveJsonData = JSON.stringify(trackingData);
                
                const saveData = {
                    earnedCoin : coin,
                    info : saveJsonData,
                }

                //데이터 초기화
                this.costTime = 0;
                this.tracking_dis = 0;

                // 라인 지우기
                this.trackingLines.forEach(element => {
                    element.setMap(null);
                });
                this.trackingLines = [];

                this.saveTrackingData(saveData);
            })
        })
    }

    saveTrackingData(data){
        const apiUrl = `http://127.0.0.1:8000/api/saveRecords/`; // 업데이트할 API의 URL

        // 업데이트 요청 보내기
        fetch(apiUrl, {
            method: "PUT", // HTTP 메서드 설정 (또는 "PATCH"를 사용할 수도 있음)
            headers: {
                "Content-Type": "trakingData/json", // JSON 데이터 전송을 위한 헤더 설정
            },
            body: JSON.stringify(data), // 업데이트할 데이터를 JSON 문자열로 변환하여 전송
        })
        .then(response => response.json()) // 응답을 JSON으로 변환
        .then(updatedUser => {
            console.log("업데이트된 사용자 정보:", updatedUser);
        })
        .catch(error => {
            console.error("업데이트 실패:", error);
        });
    }

    navi(navi_info){
        const startLat = navi_info[0].latitude;
        const startLng = navi_info[0].longitude;
        const endLat = navi_info[1].latitude;
        const endLng = navi_info[1].longitude;
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

        return new Promise((resolve, reject)=>{
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
                    console.log("navi :", this);
                    this.expectCoin = Math.floor(((resultData[0].properties.totalDistance) / 1000).toFixed(1) * 10);
                    console.log("coin :", this.expectCoin);
                    
                    // $("#result").text(tDistance + tTime);
                    
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
                    resolve();
                },
                
            }) 
        });
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

    getExpactCoin(){
        return this.expectCoin
    }

}