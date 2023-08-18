import { InitMap } from "./extendsTools/initmap.js";
import { CurrentPos } from "./extendsTools/currentPos.js";
import { Search } from "./extendsTools/search.js";

class Area {
    constructor() {
        this.maptool = new InitMap();
        this.currentPos = new CurrentPos();
        this.searchTool = new Search();

        this.map = null;
        this.currentLat;
        this.currentLon;

        this.polygons = [];
        this.data = null;
        this.name = [];

        this.start();

        this.markers = [];
        
        this.fetchedData = [];
        this.fDataDicKms = {};
        this.fDataDicStacks = {};

        this.user_data = {};
        this.user_data_kms = {};

        

        document.getElementById('searchBtn').addEventListener('click', () => {
            const searchWord = document.getElementById('searchInput').value;
            this.search(searchWord);
        });
        document.getElementById('searchInput').addEventListener('keydown', (event) =>{
            if(event.key === 'Enter'){
                const searchWord = searchInput.value;
                this.search(searchWord);
            }
        });

        setInterval(() => {
            this.displayMapCenter();
        }, 1000);

        
    }

    start() {
        this.loadingText()
        fetch("http://127.0.0.1:8000/api/regions/?format=json")
            .then((response) => response.json())
            .then((data) => {
                this.fetchedData = data;
                this.processFetchedData();
            })
        
        this.sideBar();
        this.initTmap();
    }

    initTmap() {
        this.currentPos.getCurrentLocation().then((position) => {

            this.currentLat = position.coords.latitude;
            this.currentLon = position.coords.longitude;
            this.maptool.createTmap(this.currentLat, this.currentLon)
                .then((map) => {
                    this.map = map;

                    this.map.on("ConfigLoad", () => {
                        this.startLoadFile();
                        this.getMapCenter();
                    });
                    this.search();
                })
        });
    }

    resetLoading(){
        const loader = document.querySelector(".loader");
        const loader_text = document.querySelector(".loader_text");
    
        
        loader.classList.toggle("unactive", true);
        // 시간 지나면 텍스트 변하는 효과 없애기
        this.loading_timeout_function.forEach(element => {
            clearTimeout(element); 
        });
        
        loader_text.textContent = "현재 위치 좌표 불러오는 중 ...";
    
    }

    loadingText(){
        // loading 관련 변수
        this.loading_timeout_function = [];

        const loader_text = document.querySelector(".loader_text");
        const loading1 = setTimeout(()=>{
            loader_text.textContent = "혹시 ... 건물 안인가요?? 건물 안에서는 gps가 잘 안잡혀요 ㅜㅜ";
        }, 5000);

        this.loading_timeout_function.push(loading1);
    }

    processFetchedData() {
        for (let i = 0; i < this.fetchedData.length; i++) {
            let startName = this.fetchedData[i].regions.split(" ");
            let parts = startName.length > 1 ? startName[1] : KeyboardEvent;

            let stacksValue = this.fetchedData[i].stacks;
            let kmsValue = this.fetchedData[i].kms;

            console.log(parts, stacksValue, kmsValue);

            this.fDataDicKms[parts] = kmsValue;
            this.fDataDicStacks[parts] = stacksValue; 
        }
    }


    startLoadFile() {
        new Promise ((resolve, reject)=>{
            $.ajax({
                url: "/static/json/seoul_coords_gu.json",
                type: 'GET',
                dataType: 'json',
                success: (data) => {
                    this.data = data.features;
    
                    let coordinates = [];
    
                    for (let i = 0; i < this.data.length; i++) {
                        coordinates = this.data[i].geometry.coordinates;
                        let name = this.data[i].properties.EMD_NM;
    
                        this.name.push(name);
                        this.user_data[name] = 0;
                        this.user_data_kms[name] = 0;
                    }
                    
                    for(let key in this.fDataDicStacks){
                        for (let i = 0; i < this.name.length; i++) {
                            if(key == this.name[i]){
                                this.user_data[this.name[i]] = this.fDataDicStacks[this.name[i]];
                                this.user_data_kms[this.name[i]] = this.fDataDicKms[this.name[i]];
                            }
                        }
                    }
    
                    for(let key in this.fDataDicKms){
                        for(let i = 0;i<this.fDataDicKms;i++){
                            if(key == this.name[i]){
                                this.user_data_kms[this.name[i]] = this.fDataDic[this.name[i]];
                            }
                        }
                    }
                    
                    for (let i = 0; i < this.data.length; i++) {
                        coordinates = this.data[i].geometry.coordinates;
    
                        this.displayArea(coordinates, this.name[i]);
                    }
                    resolve();
                }
            });

        })
        .then(()=>{
            this.resetLoading();
        })
        
    }

    displayArea(coordinates, emdNm) {
        let path = [];
        let point = [];
        let points = [];

        let latSum = 0;
        let lngSum = 0;

        for (let j = 0; j < coordinates.length; j++) {
            for (let z = 0; z < coordinates[j].length; z++) {
                points = coordinates[j][z];

                let temp = points[1];
                points[1] = points[0];
                points[0] = temp;

                point.push(points);

                path.push(new Tmapv3.LatLng(points[0], points[1]));

                latSum += points[0];
                lngSum += points[1];
            }
        }

        let avgLat = latSum / point.length;
        let avgLng = lngSum / point.length;

        let polygon = new Tmapv3.Polygon({
            paths: path,
            fillColor: this.getPolygonColor(this.user_data[emdNm]),
            strokeColor: "#99ccff",
            strokeWeight: 1,
            map: this.map,
            EMD_NM: emdNm,
        });

        let polygonCenter = {
            lat: avgLat,
            lng: avgLng
        }

        this.polygons.push({
            polygon: polygon,
            center: polygonCenter,
        });
    }

    getPolygonColor(value) {
        if (value >= 0 && value < 3) {
            return "#E65100";
        } else if (value >= 3 && value < 9) {
            return "#FFCC80";
        } else if (value >= 9) {
            return "#FFFFFF";
        }
    }

    search(search_word) {
        this.clearMarker();

        this.searchTool.getList(this.currentlat, this.currentLon, search_word).then((result) => {
            const nameList = result.name_list;

            for (const coords of result.coords) {
                const marker = new Tmapv3.Marker({
                    position: new Tmapv3.LatLng(coords.latitude, coords.longitude),
                    map: this.map,
                    title: nameList,
                });
                this.markers.push(marker);

                if (this.markers.length === 1) {
                    break;
                }
            }

            if (this.markers.length > 0) {
                let markerPosition = this.markers[0].getPosition();
                let latitude = markerPosition.lat();
                let longitude = markerPosition.lng();

                this.map.setCenter(this.markers[0].getPosition());
                this.map.setZoom(15);
            }
        });
    }

    clearMarker() {
        this.markers.forEach(function (marker) {
            marker.setMap(null);
        })
        this.markers = [];
    }

    getMapCenter() {
        let center = this.map.getCenter();

        return {
            latitude: center.lat(),
            longitude: center.lng(),
        };
    }

    displayMapCenter() {
        let center = this.getMapCenter();

        let closestDistance = Number.MAX_VALUE;
        let closestIndex = -1;

        for (let i = 0; i < this.polygons.length; i++) {
            let polygonData = this.polygons[i];
            let polygonCenter = polygonData.center;

            let distance = this.calculateDistance(center.latitude, center.longitude, polygonCenter.lat, polygonCenter.lng);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
            }
        }

        if (closestIndex !== -1) {
            const closestNameElement = document.getElementById('closestName');
            const correspondingName = this.name[closestIndex];
            closestNameElement.textContent = correspondingName + " 데이터 현황";
        
            const correspondingValue = this.user_data[correspondingName];
            const closestStacksNum = document.getElementById('stacksNum');
            closestStacksNum.textContent = correspondingValue;

            const correspondingKmsData = this.user_data_kms[correspondingName];
            const closestKmsData = document.getElementById('kmsData');
            closestKmsData.textContent = correspondingKmsData;
        }
    }

    calculateDistance(lat1, lng1, lat2, lng2) {
        const earthRadius = 6371; // 지구 반지름

        const degToRad = (degrees) => {
            return degrees * (Math.PI / 180);
        };

        lat1 = degToRad(lat1);
        lng1 = degToRad(lng1);
        lat2 = degToRad(lat2);
        lng2 = degToRad(lng2);

        const dLat = lat2 - lat1;
        const dLng = lng2 - lng1;

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = earthRadius * c;
        return distance;
    }

    sideBar() {
        const sideBarBtn = document.querySelector('.sideBarBtn');
        const sideBar = document.querySelector('.sideBar');
        const sideBar_cancle = document.querySelector('.sideBar_cancle')

        // 사이드 바 나타내기
        sideBarBtn.addEventListener("click", () => {
            sideBar.classList.toggle('unactive', false);
        });

        sideBar_cancle.addEventListener('click', () => {
            sideBar.classList.toggle('unactive', true);
        });
    }
}

window.onload = () => {
    new Area();
}