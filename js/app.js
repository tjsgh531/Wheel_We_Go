import { InitMap } from "./initmap.js";
import { DrawShape } from "./drawShape.js";
import { CurrentPos } from "./currentPos.js";

class App{
    constructor(){
        this.currentLat;
        this.currentLon;

        this.map;
        
        this.maptool = new InitMap();

        this.drawTools;

        this.currentPosCircle;

        this.currentPos = new CurrentPos();

        this.init();
    }

    init(){
        
        const currentLocation = this.currentPos.getLocation();
        this.currentLat = currentLocation[0];
        this.currentLon = currentLocation[1];

        this.map = this.maptool.createTmap(this.currentLat, this.currentLon);
            
        this.map.on("ConfigLoad",function(){
            this.drawTools = new DrawShape(this.map);
            this.currentPosCircle = this.drawTools.addCircle(this.currentLat, this.currentLon, 2, 2, "#FFC573");
                    
            setInterval(()=>{
                this.update();
            }, 500);
            
        }.bind(this));
    }

    //프래임마다 반복하는 함수
    update(){
        // 현재 위치 업데이트
        this.currenLat, this.currentLon = this.currentPos.getLocation();

        //자기 위치 표현하는 원 움직이기
        this.currentPosCircle = this.drawTools.moveCircle(this.currentPosCircle, this.currentLat, this.currentLon);

        //맵을 현재 위치에 중앙 맞추기
        this.map = this.maptool.updateMap(this.map, this.currentLat, this.currentLon);
    
        
    }
    
}

window.onload = ()=>{
    new App();
}

window.addEventListener("click", ()=>{
    alert("STOP");
});

