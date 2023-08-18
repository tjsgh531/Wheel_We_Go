import { DrawShape } from "./drawShape.js";
import { InitMap } from "./initmap.js";
import { CurrentPos } from "./currentPos.js";
import { NaviResult } from "./naviResult.js";
import { RestApiData } from "./restApiData.js";


export class Navi {
    constructor() {
        this.drawTool = new DrawShape();
        this.mapTool = new InitMap();
        this.currentPos = new CurrentPos();
        this.naviResult = new NaviResult();
        this.restApiData = new RestApiData();
        this.username = this.getCurrentLoginUser();
        
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
        this.expectTime;

        this.totalMarkerArr = [];
        this.drawInfoArr =[];
        this.resultdrawArr = [];

        // 트래킹 관련 변수
        this.istracking = false;
        this.trackingLines = [];
        this.trackingCoords = [];
        this.trackingMarkers = [];
        this.trackingMarkersCoords = [];
        

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

    getCurrentLoginUser() {
        let userinfo = document.getElementById('user-info');
        let user = userinfo.dataset.username;
        return user;
    }

    // 마커 버튼 클릭시 작동
    clickMarkBtn(){
        const marker = this.mapTool.createMark(this.map, this.currentLat, this.currentLon);
        this.trackingMarkers.push(marker);
        this.trackingMarkersCoords.push([this.currentLat, this.currentLon]);
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
        let headers = {};
        headers["appKey"] = "l7xxed2c734830ae4364975ef11e67a76e81";

        return new Promise((resolve, reject)=>{
            $.ajax({
                method : "GET",
                headers : headers,
                url : "https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&format=json&callback=result",
                async : false,
                data : {
                    "coordType" : "WGS84GEO",
                    "addressType" : "A10",
                    "lon" : lon,
                    "lat" : lat
                },
                success : function(response) {
                    // 3. json에서 주소 파싱
                    let arrResult = response.addressInfo;

                    //법정동 마지막 문자 
                    let lastLegal = arrResult.legalDong
                            .charAt(arrResult.legalDong.length - 1);

                    // 새주소
                    let newRoadAddr = arrResult.city_do + ' '
                            + arrResult.gu_gun + ' ';

                    
                    if (arrResult.eup_myun == ''
                            && (lastLegal == "읍" || lastLegal == "면")) {//읍면
                        newRoadAddr += arrResult.legalDong;
                    } else {
                        newRoadAddr += arrResult.eup_myun;
                    }
                    newRoadAddr += ' ' + arrResult.roadName + ' '
                            + arrResult.buildingIndex;

                    // 새주소 법정동& 건물명 체크
                    if (arrResult.legalDong != ''
                            && (lastLegal != "읍" && lastLegal != "면")) {//법정동과 읍면이 같은 경우

                        if (arrResult.buildingName != '') {//빌딩명 존재하는 경우
                            newRoadAddr += (' (' + arrResult.legalDong
                                    + ', ' + arrResult.buildingName + ') ');
                        } else {
                            newRoadAddr += (' (' + arrResult.legalDong + ')');
                        }
                    } else if (arrResult.buildingName != '') {//빌딩명만 존재하는 경우
                        newRoadAddr += (' (' + arrResult.buildingName + ') ');
                    }

                    console.log("주소!!!! :", newRoadAddr);
                    resolve(newRoadAddr)
                },
                error : function(request, status, error) {
                    console.log("code:" + request.status + "\n"
                            + "message:" + request.responseText + "\n"
                            + "error:" + error);
                }
            });
        });

    }
    //트래킹 시작
    trackingPath(){
        if(!this.istracking){
            this.trackingData = {
                startpoint: [0, 0],
                endpoint : [0, 0],

                startName : "",
                endName : "",

                AtTime : 0,
                distance : 0.0,
                coin : 0,
                coords: [],
                data_valid : 0,
                markings : [],
                markingStr : "",
                date : "",
            }

            this.istracking = true;
            
            this.trackingLines = []; //트래킹 라인 초기화

            //초 시계 초기화
            this.costTime = 0;

            // 거리 초기화
            this.tracking_dis = 0;
            
            // 좌표 초기화 
            let preLat = this.currentLat;
            let preLon = this.currentLon;
            
            this.trackingCoords.push([preLat, preLon]);

            // 라인 그리기 시작
            this.track = setInterval(()=>{
                console.log("현재위치 업데이트 되니? :",this.currentLat, this.currentLon);
                // 시간 계산
                this.costTime += 1;
                if(preLat == this.currentLat && preLat == this.currentLat){
                    console.log("이전 좌표와 동일");
                }
                else{
                    //거리계산
                    this.tracking_dis += this.caculateDistance(preLat, preLon, this.currentLat, this.currentLon);
                    
                    //선 그리기
                    const polyline = this.drawTool.addPolyline(preLat, preLon, this.currentLat, this.currentLon);
                    preLat = this.currentLat;
                    preLon = this.currentLon;

                    this.trackingCoords.push([preLat, preLon]);
                    this.trackingLines.push(polyline);
                }
            },1000);
        }
    }

    // 트래킹 종료 -> 트래킹 데이터 반환
    endTrackingPath(){
        this.istracking = false 
        clearInterval(this.track); // 선그리기 인터벌 종료
    }

    // tracking 데이터 생성
    async createTrackingData(){
        //날짜 정보 생성
        const currentDate = this.createDateInfo();

        //코인 계산
        const coin = Math.floor((this.tracking_dis / 1000).toFixed(1) * 10);

        // 시작 주소 string & 마지막 주소 string
        const startpoint = this.trackingCoords[0];
        const endpoint = this.trackingCoords[this.trackingCoords.length -1];

        let start_str="";
        let end_str ="";
        return this.loadGetLonLatFromAddress(startpoint[0], startpoint[1])
        .then((start_addr_str)=>{
            start_str = start_addr_str;

            //끝나는 지점 이름 받기
            this.loadGetLonLatFromAddress(endpoint[0], endpoint[1])
            .then((end_addr_str)=>{
                end_str = end_addr_str;
            });   
        })
        .then(()=>{
            console.log("으아아아",start_str, end_str);

            //데이터 저장 하기
            const markerStr = this.naviResult.getMarkerStr();
            this.trackingData = {
                startpoint: startpoint,
                endpoint : endpoint,

                startName : start_str, 
                endName : end_str,

                AtTime : this.costTime, //int
                distance : this.tracking_dis, //float
                coin : coin,//int
                coords: this.trackingCoords,//[[lat,lon],[...]....]
                data_valid : 0,//int 0~1
                markings : this.trackingMarkersCoords, //coords 동일
                markingStr : markerStr, //string
                date : currentDate, //날짜
            }

            const saveJsonData = JSON.stringify(this.trackingData);
            
            console.log(saveJsonData);
            
            let saveData = {
                user_id : this.username,
                earnedCoin : coin,
                info : saveJsonData,
            }
            saveData = JSON.stringify(saveData);

            return saveData;
        })
    }

    // tracking 라인 삭제
    eraseTrackingLine(){
        //데이터 초기화
        this.costTime = 0;
        this.tracking_dis = 0;

        // 라인 지우기
        this.trackingLines.forEach(element => {
            element.setMap(null);
        });
        this.trackingLines = [];
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
                    this.expectTime = ((resultData[0].properties.totalTime) / 60).toFixed(0);
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
            strokeColor : "#027BFC",
            strokeWeight : 9,
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

    // navi 하단바 활성화 함수
    onNaviFooter(naviMode){
        const navi_footer = document.querySelector(".navi_footer");
        const navi_terminate_btn = document.querySelector(".navi_terminate_btn");
        const navi_marking_btn = document.querySelector(".navi_marking_btn");
        const arrive_btn = document.querySelector(".arrive_btn");
        const resultBoard = document.querySelector(".resultBoard");
        const submit_result = document.querySelector(".submit_result");

        //초기화
        navi_footer.classList.toggle("unactive", false); // 네비 footer 보이게 하기
        navi_terminate_btn.classList.toggle("unactive", true);
        navi_marking_btn.classList.toggle("unactive", true);
        arrive_btn.classList.toggle("unactive", true);

        //경로 추적만일 경우 네비 지우기
        if(naviMode == 2){
            this.eraseLineMarks();
        }

        //일반 경로 안내 모드
        if(naviMode == 1){
            navi_terminate_btn.classList.toggle("unactive", false);
            arrive_btn.classList.toggle("unactive", false);
        }
        
        //트래킹만 하기 & 트래킹+경로안내
        else{
            navi_terminate_btn.classList.toggle("unactive", false);
            navi_marking_btn.classList.toggle("unactive", false);
            arrive_btn.classList.toggle("unactive", false);
        }
      
        // "중단" 버튼 클릭 시
        navi_terminate_btn.addEventListener('click', ()=>{
            this.abortRecord(naviMode); // 기록중지
        });

        // "마킹 하기" 버튼 클릭 시
        navi_marking_btn.addEventListener('click', ()=>{
            this.clickMarkBtn()
        });

        // "도착" 버튼 클릭 시
        arrive_btn.addEventListener('click', ()=>{
            if(naviMode == 1){
                this.resetGnb();
                this.eraseLineMarks();
            }
            else{
                this.endTrackingPath(); // 트래킹 종료
                this.eraseLineMarks(); // navi 라인 지우기
                this.naviResult.initResultPage(); // 결과 페이지에 이전 정보 삭제


                // 결과창에 표시될 데이터 요소들 삽입
                this.naviResult.createResultSummaryBoard(true, this.trackingData.AtTime, this.trackingData.distance, this.trackingData.coin);
                this.naviResult.createResultContentBoard(this.trackingMarkers);

                resultBoard.classList.toggle("unactive", false); // 결과창 화면 상에 표시

                submit_result.addEventListener("click", ()=>{ // 결과창의 "데이터 저장하고 종료하기" 버튼 를릭 시
                    resultBoard.classList.toggle("unactive", true); // 결과창 화면 끄기
                    this.resultSaveSubmit();
                });
            }

            navi_footer.classList.toggle("unactive", true); // footer 안보이게 하기

        });
    }

    // 기록 중단(네비, 트래킹)
    abortRecord(navimode){
        const navi_footer = document.querySelector(".navi_footer");
        const abortRecordBackgroundBlur = document.querySelector(".abortRecordBackgroundBlur");
        const abortRecordDeleteAbortBtn = document.querySelector(".abortRecordDeleteAbortBtn");
        const abortRecordSaveAbortBtn = document.querySelector(".abortRecordSaveAbortBtn");
        const abortRecordBackBtn = document.querySelector(".abortRecordBackBtn");
        const abortRecordAbortBtn = document.querySelector(".abortRecordAbortBtn");
        const resultBoard = document.querySelector(".resultBoard");
        const submit_result = document.querySelector(".submit_result");

        //초기화
        abortRecordBackgroundBlur.classList.toggle("unactive", false); // 블러 보이게 하기
        abortRecordDeleteAbortBtn.classList.toggle("unactive", true);
        abortRecordSaveAbortBtn.classList.toggle("unactive", true);
        abortRecordBackBtn.classList.toggle("unactive", true);
        abortRecordAbortBtn.classList.toggle("unactive", true);

        //일반 경로만 네비 
        if(navimode == 1){
            abortRecordAbortBtn.classList.toggle("unactive", false);
            abortRecordBackBtn.classList.toggle("unactive", false);
        }
        else{
            abortRecordDeleteAbortBtn.classList.toggle("unactive", false);
            abortRecordSaveAbortBtn.classList.toggle("unactive", false);
            abortRecordBackBtn.classList.toggle("unactive", false);
        }

        // "기록 삭제하고 중단하기" 버튼 클릭 시
        abortRecordDeleteAbortBtn.addEventListener('click', ()=>{
            this.endTrackingPath(); // 트래킹 종료
            this.eraseTrackingLine();

            this.eraseLineMarks();
            this.resetGnb();
            navi_footer.classList.toggle("unactive", true);
            this.resetMarkers();
            abortRecordBackgroundBlur.classList.toggle("unactive", true);
        });

        // "기록 저장하고 중단하기" 버튼 클릭 시
        abortRecordSaveAbortBtn.addEventListener('click', ()=>{
            this.endTrackingPath(); // 트래킹 종료
            this.eraseLineMarks();

            this.naviResult.initResultPage(); // 결과 페이지에 이전 정보 삭제

            abortRecordBackgroundBlur.classList.toggle("unactive", true);
            // 결과창에 표시될 데이터 요소들 삽입
            this.naviResult.createResultSummaryBoard(true, this.trackingData.AtTime, this.trackingData.distance, this.trackingData.coin);
            this.naviResult.createResultContentBoard(this.trackingMarkers);

            resultBoard.classList.toggle("unactive", false); // 결과창 화면 상에 표시
            navi_footer.classList.toggle("unactive", true); // footer 안보이게 하기
            submit_result.addEventListener("click", ()=>{ // 결과창의 "데이터 저장하고 종료하기" 버튼 를릭 시
                resultBoard.classList.toggle("unactive", true); // 결과창 화면 끄기
                        this.resultSaveSubmit();                    
            });

        });

        // "돌아가기" 버튼 클릭 시
        abortRecordBackBtn.addEventListener('click', ()=>{
            abortRecordBackgroundBlur.classList.toggle("unactive", true);

        });

        // navi 중단하기(tracking 없음)
        abortRecordAbortBtn.addEventListener("click", ()=>{
            abortRecordBackgroundBlur.classList.toggle("unactive", true);
            this.eraseLineMarks();
            
            //gnb 초기화
            this.resetGnb();

            navi_footer.classList.toggle("unactive", true);
        });
    }

    resetGnb(){
        const gnb = document.querySelector(".gnb");
        const search = document.querySelector(".search");
        const search_navi = document.querySelector(".search_navi");
        const searchBoxs = document.querySelectorAll(".searchBox");
        const searchCancle = document.querySelector(".search_cancle");
        const sideBarBtn = document.querySelector(".sideBarBtn");
        const sideBar = document.querySelector(".sideBar");

        gnb.classList.toggle("search_gnb", false);
        search.classList.toggle("unactive", false);
        search_navi.classList.toggle("unactive", true);
        searchCancle.classList.toggle("unactive", true);
        sideBarBtn.classList.toggle("unactive", false);
        sideBar.classList.toggle("unactive", true);

        //검색어 초기화
        searchBoxs.forEach(element => {
            element.value = "";
        });
    }

    resetMarkers(){
        this.trackingMarkers.forEach(element => {
            element.setMap(null);
        });
    }

    // "데이터 저장하고 종료하기" 버튼 클릭 시
    resultSaveSubmit(){
        const dataRecordAbortblur = document.querySelector(".dataRecordAbortblur");
        const submitResultAbortBtn = document.querySelector(".submitResultAbortBtn");
        const myDataBtn = document.querySelector(".myDataBtn");
        
        dataRecordAbortblur.classList.toggle("unactive", false);

        myDataBtn.addEventListener("click", ()=>{
            this.createTrackingData().then((saveData)=>{
                this.restApiData.createSaveRecord(saveData); // 트래킹 데이터 DB 저장
                this.eraseTrackingLine(); // 트래킹 라인 삭제
                this.resetMarkers(); // 트래킹 마커들 삭제
                dataRecordAbortblur.classList.toggle("unactive", true); // 마지막 화면 끄기
                this.resetGnb(); // main 페이지의 초기 화면으로 세팅

                window.location.href = "http://127.0.0.1:8000/mydata";
            }); // 트래킹 데이터 생성
        });

        submitResultAbortBtn.addEventListener("click", ()=>{
            this.createTrackingData().then((saveData)=>{
                // this.restApiData.createSaveRecord(saveData);
                this.eraseTrackingLine(); // 트래킹 라인 삭제
                this.resetMarkers(); // 트래킹 마커들 삭제
                dataRecordAbortblur.classList.toggle("unactive", true);
                this.resetGnb(); // main 페이지의 초기 화면으로 전환
            });
        });   
    }
}