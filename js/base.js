import { InitMap } from "./extendsTools/initmap.js";
import { DrawShape } from "./extendsTools/drawShape.js";
import { CurrentPos } from "./extendsTools/currentPos.js";
import { Search } from "./extendsTools/search.js";
import { Loading } from "./extendsTools/loading.js";

class MapBase{
    constructor(){
        this.maptool = new InitMap();
        this.currentPos = new CurrentPos();
        this.drawShape = new DrawShape();
        this.searchTool = new Search();
        this.loading = new Loading();

        this.map;
        this.currentLat, this.currentLon;
        this.centerCircle;
        this.istrackingCenter = true;
        this.start();
    }

    start(){
        this.initSetMap();
        this.sideBar();
        this.searchTool.focusSearchBox();
    }

    // 현재 위치가 갱신 될때 마다 실행 하는 함수
    update(position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const newPosition = new Tmapv3.LatLng(latitude, longitude);
        
        this.drawShape.setMap(this.map);
        this.searchTool.setPosition(latitude, longitude);

        this.updateSetCenterCircle(latitude, longitude);
    }

    updateSetCenterCircle(latitude, longitude){
        if(this.istrackingCenter){
            const newPosition = new Tmapv3.LatLng(latitude, longitude);
            this.map.setCenter(newPosition);

            if(this.centerCircle){
               this.centerCircle = this.drawShape.moveCircle(this.centerCircle, latitude, longitude);
            }
            else{
                this.centerCircle = this.drawShape.addCircle(latitude, longitude, 3);
            }
        }

    }

    initSetMap(){
        this.loading.loadAppear();

        this.currentPos.getCurrentLocation().then((position)=>{
            this.currentLat = position.coords.latitude;
            this.currentLon = position.coords.longitude;
            
            this.maptool.createTmap(this.currentLat, this.currentLon)
            .then((map)=>{
                this.map = map;

                map.on("ConfigLoad", ()=>{  
                    this.drawShape.setMap(map);
                    this.searchTool.setMap(map);

                    
                    // map을 클릭하면 현재위치를 센터링 하지말고 맵이 움직이게
                    map.on("DragStart", ()=>{
                        console.log("지도 드래그 시작!!!");
                        this.istrackingCenter = false;
                        
                        const returnToCurPosBtn = document.querySelector(".returnToCurPosBtn"); 
                        returnToCurPosBtn.classList.toggle("unactive", false);

                        // 현재위치로 돌아오기 클릭시
                        returnToCurPosBtn.addEventListener("click", ()=>{
                            this.istrackingCenter = true;
                            returnToCurPosBtn.classList.toggle("unactive", true);
                            
                            this.maptool.setMapCenter(this.map, this.currentLat, this.currentLon);
                        });

                    })

                    //loading 지우기
                    this.loading.loadDisAppear();
                    
                    //현재위치 계속 추적
                    this.watchid = this.currentPos.watchLocation(this.update.bind(this));
                }); 
            });
        });
    }

    stopWatchLocation(){
        navigator.geolocation.clearWatch(this.watchid);
    }

    startWatchLocation(){
        this.watchid = this.currentPos.watchLocation(this.update.bind(this));
    }

    sideBar(){
        const sideBarBtn = document.querySelector('.sideBarBtn');
        const sideBar = document.querySelector('.sideBar');
        const sideBar_cancle = document.querySelector('.sideBar_cancle')
                   
        // 사이드 바 나타내기
        sideBarBtn.addEventListener("click", ()=>{
            sideBar.classList.toggle('unactive', false);
        });
 
        sideBar_cancle.addEventListener('click', ()=>{
            sideBar.classList.toggle('unactive', true);
        });
    }
}

window.onload = ()=>{
    new MapBase();
}