import { InitMap } from "./initmap.js";
import { DrawShape } from "./drawShape.js";

class App{
    constructor(){
        this.currentLat;
        this.currentLon;

        this.map;
        this.drawTools;

        this.currentPosCircle;

        this.init();
    }

    async init(){
        const position = await this.getCurrentLocation();
        this.currentLat = position.coords.latitude;
        this.currentLon = position.coords.longitude;

        this.maptool = new InitMap();

        this.map = this.maptool.createTmap(this.currentLat, this.currentLon);

        this.map.on("ConfigLoad",()=>{
            this.drawTools = new DrawShape(this.map);
            this.currentPosCircle = this.drawTools.addCircle(this.currentLat, this.currentLon, 2, 2, "#FFC573");
            this.update();
        });

        
    }

    //프래임마다 반복하는 함수
    update(){
        // 현재 위치 업데이트
        this.updateCurrentPos();
        
        //자기 위치 표현하는 원 움직이기
        this.drawTools.moveCircle(this.currentPosCircle, this.currentLat, this.currentLon);

        //맵을 현재 위치에 중앙 맞추기
        this.maptool.updateMap(this.map, this.currentLat, this.currentLon);


        requestAnimationFrame(this.update.bind(this));
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