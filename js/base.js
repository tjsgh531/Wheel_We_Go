import { InitMap } from "./extendsTools/initmap.js";
import { DrawShape } from "./extendsTools/drawShape.js";
import { CurrentPos } from "./extendsTools/currentPos.js";
import { Search } from "./extendsTools/search.js";

class MapBase{
    constructor(){
        this.maptool = new InitMap();
        this.currentPos = new CurrentPos();
        this.drawShape = new DrawShape();
        this.searchTool = new Search();

        this.map;
        this.currentLat, this.currentLon;
        this.centerCircle;
        this.start();
    }

    start(){
        this.initSetMap();
        this.sideBar();
    }

    // 현재 위치가 갱신 될때 마다 실행 하는 함수
    update(position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const newPosition = new Tmapv3.LatLng(latitude, longitude);
        
        this.map.setCenter(newPosition);

        this.drawShape.setMap(this.map);

        if(this.centerCircle){
           this.centerCircle = this.drawShape.moveCircle(this.centerCircle, latitude, longitude);
        }
        else{
            this.centerCircle = this.drawShape.addCircle(latitude, longitude, 4);
        }
        
    }

    initSetMap(){
        this.currentPos.getCurrentLocation().then((position)=>{
            this.currentLat = position.coords.latitude;
            this.currentLon = position.coords.longitude;
            
            this.maptool.createTmap(this.currentLat, this.currentLon)
            .then((map)=>{
                this.map = map;

                map.on("ConfigLoad", ()=>{  
                    this.drawShape.setMap(map);
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
            sideBar.classList.remove('unactive');
        });
 
        sideBar_cancle.addEventListener('click', ()=>{
            sideBar.classList.add('unactive');
        });
    }

  
}

window.onload = ()=>{
    new MapBase();
}