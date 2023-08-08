import { InitMap } from "./initmap.js";
import { DrawShape } from "./drawShape.js";

class App{
    constructor(){
        this.currentLat;
        this.currentLon;

        this.map;
        this.maptool;
        this.drawTools;

        this.currentPosCircle;

        this.init();
        
    }

    async init(){
        const position = await this.getCurrentLocation();
        this.currentLat = position.coords.latitude;
        this.currentLon = position.coords.longitude;

        this.maptool = new InitMap();

        this.map = await this.maptool.createTmap(this.currentLat, this.currentLon);
            
        this.map.on("ConfigLoad",function(){
            this.drawTools = new DrawShape(this.map);
            this.currentPosCircle = this.drawTools.addCircle(this.currentLat, this.currentLon, 2, 2, "#FFC573");
                     
        }.bind(this));
        
    }

    //프래임마다 반복하는 함수
    update(){
        console.log("update 실행중 ...");
        // 현재 위치 업데이트
        this.updateCurrentPos();
        
        //자기 위치 표현하는 원 움직이기
    
        console.log("되는 거지?");
        this.currentPosCircle = this.drawTools.moveCircle(this.currentPosCircle, this.currentLat, this.currentLon);

        console.log("되는 거지?");
        //맵을 현재 위치에 중앙 맞추기
        this.map = this.maptool.updateMap(this.map, this.currentLat, this.currentLon);

        console.log("되는 거지?");
        this.update();
        requestAnimationFrame(this.update());
    }

    drawCurrentPos(){
        this.drawTools
    }

    async updateCurrentPos(){
        const position = await this.getCurrentLocation();
        this.currentLat = position.coords.latitude;
        this.currentLon = position.coords.longitude;

        console.log("현재위치 : ", this.currentLat, this.currentLon);
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

window.onload = ()=>{
    new App();
}

window.addEventListener("click", ()=>{
    alert("STOP");
})