// 지도 API의 변수들
class Map{
    constructor(){
        this.map;
        this.marker_s; 
        this.marker_e;

        this.drawInfoArr = [];
        this.resultdrawArr = [];

        
    }

    // 초기 맵을 띄워준다.
    initTmap() {
    // 1. 지도 띄우기
    this.map = new Tmapv2.Map("map_div", {
      center: new Tmapv2.LatLng("<%-curLat %>", "<%-curLng%>"), //장고 템플릿언어로 갑 치환
      width: "100%", // 맵의 가로
      height: "100vh", //맵의 세로
      zoom: 17, // 맵을 얼마정도 확대할건지?
      zoomControl: true, // 맵을 사용자가 확대시킬건지
      scrollwheel: true,
    });
  
    // 2. 시작, 도착 심볼찍기
    // 시작
    this.marker_s = new Tmapv2.Marker({
      position: new Tmapv2.LatLng("<%-curLat %>", "<%-curLng%>"),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
      iconSize: new Tmapv2.Size(24, 38),
      map: this.map,
    });
  
    // 도착
    this.marker_e = new Tmapv2.Marker({
      position: new Tmapv2.LatLng("<%-destLat %>", "<%-destLng%>"),
      icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
      iconSize: new Tmapv2.Size(24, 38),
      map: this.map,
    });
  
    // 3. 경로탐색 API 사용요청
    $.ajax({
      method: "POST",
      url: "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
      async: false,
      data: {
        appKey: "<%-secretKey %>",
        startX: "<%-curLng %>",
        startY: "<%-curLat %>",
        endX: "<%-destLng %>",
        endY: "<%-destLat %>",
        reqCoordType: "WGS84GEO",
        resCoordType: "EPSG3857",
        startName: "출발지",
        endName: "도착지",
      },
      success: function (response) {
        var resultData = response.features;
  
        //결과 출력
        var tDistance =
          +(resultData[0].properties.totalDistance / 1000).toFixed(1) +
          "km,";
        var tTime =
          +(resultData[0].properties.totalTime / 60).toFixed(0) + "분";
        console.log(`소요시간 : ${tDistance}, 남은거리 : ${tTime}`);
        $("#time").text(tTime);
        $("#distance").text(tDistance);
  
        //기존 그려진 라인 & 마커가 있다면 초기화
        if (this.resultdrawArr.length > 0) {
          for (var i in this.resultdrawArr) {
            this.resultdrawArr[i].setMap(null);
          }
          this.resultdrawArr = [];
        }
  
        this.drawInfoArr = [];
  
        for (var i in resultData) {
          //for문 [S]
          var geometry = resultData[i].geometry;
          var properties = resultData[i].properties;
          var polyline_;
  
          if (geometry.type == "LineString") {
            for (var j in geometry.coordinates) {
              // 경로들의 결과값(구간)들을 포인트 객체로 변환
              var latlng = new Tmapv2.Point(
                geometry.coordinates[j][0],
                geometry.coordinates[j][1]
              );
              // 포인트 객체를 받아 좌표값으로 변환
              var convertPoint =
                new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
              // 포인트객체의 정보로 좌표값 변환 객체로 저장
              var convertChange = new Tmapv2.LatLng(
                convertPoint._lat,
                convertPoint._lng
              );
              // 배열에 담기
              this.drawInfoArr.push(convertChange);
            }
          } else {
            var markerImg = "";
            var pType = "";
            var size;
  
            if (properties.pointType == "S") {
              //출발지 마커
              markerImg =
                "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
              pType = "S";
              size = new Tmapv2.Size(24, 38);
            } else if (properties.pointType == "E") {
              //도착지 마커
              markerImg =
                "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
              pType = "E";
              size = new Tmapv2.Size(24, 38);
            } else {
              //각 포인트 마커
              markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
              pType = "P";
              size = new Tmapv2.Size(8, 8);
            }
  
            // 경로들의 결과값들을 포인트 객체로 변환
            var latlon = new Tmapv2.Point(
              geometry.coordinates[0],
              geometry.coordinates[1]
            );
  
            // 포인트 객체를 받아 좌표값으로 다시 변환
            var convertPoint =
              new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);
  
            var routeInfoObj = {
              markerImage: markerImg,
              lng: convertPoint._lng,
              lat: convertPoint._lat,
              pointType: pType,
            };
  
            // Marker 추가
            marker_p = new Tmapv2.Marker({
              position: new Tmapv2.LatLng(
                routeInfoObj.lat,
                routeInfoObj.lng
              ),
              icon: routeInfoObj.markerImage,
              iconSize: size,
              map: this.map,
            });
          }
        } //for문 [E]
        drawLine(this.drawInfoArr);
      },
      error: function (request, status, error) {
        console.log(
          "code:" +
            request.status +
            "\n" +
            "message:" +
            request.responseText +
            "\n" +
            "error:" +
            error
        );
      },
    });
    }
  
    addComma(num) {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        return num.toString().replace(regexp, ",");
    }
  
    drawLine(arrPoint) {
        var polyline_;
    
        polyline_ = new Tmapv2.Polyline({
        path: arrPoint,
        strokeColor: "#DD0000",
        strokeWeight: 6,
        map: this.map,
        });
        this.resultdrawArr.push(polyline_);
    }
  
}


