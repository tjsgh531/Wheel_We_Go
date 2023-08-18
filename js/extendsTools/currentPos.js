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
        return new Promise((resolve, reject) => {
            const init_position = {
                coords :{    
                    latitude : 37.468478,
                    longitude : 127.039257,
                }                
            }
            resolve(init_position);
        });

  


    }
}