
import { RestApiData } from "./restApiData.js";
import { Navi } from "./navi.js";

export class NaviDataCaution{
    constructor(){
        this.map;

        this.dataTool = new RestApiData();
        this.naviTool = new Navi();

        this.isNavi = false;
        this.expectCoin;
        this.currentLat, this.currentLon;
    }

    setMap(map){
        this.map = map;
    }

    setExpectCoin(coin){
        this.expectCoin = coin;
    }
    setLocation(lat, lon){
        this.currentLat = lat;
        this.currentLon = lon;
    }
    
    naviDataCaution(){
        return new Promise((resolve, reject)=>{
            this.dataTool.getRegionData()
            .then((data) => {
                const getData = data
                // 가져온 데이터 활용
                console.log("현재 좌표 주소 : ", this.currentLat, this.currentLon);
                this.naviTool.loadGetLonLatFromAddress(this.currentLat, this.currentLon)
                .then((currentAddress)=>{

                    // 검색창에 있는 현재 위치(출발 위치 string)
                    const currentAddressName = currentAddress.split(" ")[0] + " " + currentAddress.split(" ")[1]
                    console.log("현재 주소 이름 : ", currentAddressName);
                    const regionsModel = getData.find(regions => regions.regions === currentAddressName);
                    console.log("regionsModel", regionsModel);
                    
                    const backgroundBlur = document.querySelector(".backgroundBlur");
                    const lowData = document.querySelector(".lowData");
                    const iffyData = document.querySelector(".iffyData");
                    const enoughData = document.querySelector(".enoughData");
                    const coin1 = document.querySelector(".coin1");
                    const coin2 = document.querySelector(".coin2");
                    const coin3 = document.querySelector(".coin3");
                    const dataCount1 = document.querySelector(".dataCount1");
                    const dataCount2 = document.querySelector(".dataCount2");
                    const dataCount3 = document.querySelector(".dataCount3");
            
                    backgroundBlur.classList.toggle("unactive", false);

                    // 데이터의 총 km를 기준으로 출력 화면 변화
                    if( regionsModel.kms <= 10) {
                        lowData.classList.toggle("unactive", false); // low O
                        iffyData.classList.toggle("unactive", true); // iffy X
                        enoughData.classList.toggle("unactive", true); // enough X
                        
                        dataCount1.textContent = `${regionsModel.stacks}`;
                        coin1.textContent = `${this.expectCoin}`;

                    }
                    else if((10 < regionsModel.kms) && (regionsModel.kms < 100)) {
                        lowData.classList.toggle("unactive", true); // low X
                        iffyData.classList.toggle("unactive", false); // iffy O
                        enoughData.classList.toggle("unactive", true); // enough X

                        dataCount2.textContent = `${regionsModel.stacks}`;
                        coin2.textContent = `${this.expectCoin}`;
                    }
                    else {
                        lowData.classList.toggle("unactive", true); // low X
                        iffyData.classList.toggle("unactive", true); // iffy X
                        enoughData.classList.toggle("unactive", false); // enough O
                        
                        dataCount3.textContent = `${regionsModel.stacks}`;
                        coin3.textContent = `${this.expectCoin}`;
                    }
                    resolve();
                })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            });
        })
    });   
}};