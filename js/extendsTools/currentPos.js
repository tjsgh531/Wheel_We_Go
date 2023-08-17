export class CurrentPos{
    constructor(){
     
    }
    
    watchLocation(success){
        if (navigator.geolocation) {
            const watchid = navigator.geolocation.watchPosition(
                success
                , ()=>{
                    console.error(`ERROR(${err.code}): ${err.message}`);
                }, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                });
            return watchid;
        }
    }   
    

    async getCurrentLocation() {
        const location = new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
                reject(new Error('Geolocation이 지원되지 않는 브라우저입니다.'));
            }
        })
        .catch(error => {
            console.error('오류:', error.message);
        });;

        const timeout = new Promise((resolve, reject)=>{
            setTimeout(()=>{
                //AT센터로 좌표 이동..
                this.init_position = {
                    coords :{    
                        latitude : 37.468478,
                        longitude : 127.039257,
                    }                
                }
                console.log("시간이 지났어요...");
                resolve(this.init_position);
            }, 15000);
        })

        return Promise.race([location, timeout]);
    }
}