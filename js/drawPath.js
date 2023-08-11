
import { CurrentPos } from "./currentPos.js";
import { DrawShape } from "./drawShape.js";
import { InitMap } from "./initmap.js";

class DrawPath{
    constructor(){
        this.updatetime = 1000;

        this.currentPos = new CurrentPos();
        this.maptool = new InitMap()
        this.drawTools;

        this.updateLocation();              
        this.map = this.maptool.createTmap(this.currentLat, this.currentLon);
        
        this.map.on("ConfigLoad", function(){
            
            this.drawTools = new DrawShape(this.map);

            console.log("왜");

            setInterval(()=>{
                const preLat = this.currentLat;
                const preLon = this.currentLon;
            
                console.log("이전 좌표 : ", preLat, preLon);
                this.updateLocation();

                this.drawTools.addPolyline(preLat, preLon, 35.155314, 128.106005, 6, "red"); 

            }, 1000);
        }.bind(this));
        
        

    }

    updateLocation(){
        const currentLocation = this.currentPos.getLocation();
        this.currentLat = currentLocation[0];
        this.currentLon = currentLocation[1];
    }

}

window.onload = ()=>{
    new DrawPath();
}