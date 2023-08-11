export class CurrentPos{
    constructor(){
        this.currentLat = 35.151368;
        this.currentLon = 128.099938;
        
        setInterval(()=>{
            this.updateCurrentPos();
        }, 100);
    }

    getLocation(){
        return [this.currentLat, this.currentLon];
    }

    updateCurrentPos(){
        this.getCurrentLocation().then((position)=>{

            if(position.coords.latitude == undefined || position.coords.longitude == undefined){
                this.currentLat = position.coords.latitude;
                this.currentLon = position.coords.longitude;
            }
            //console.log("현재 좌표 : ", this.currentLat, this.currentLon);

            //requestAnimationFrame(this.updateCurrentPos.bind(this));
        });
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