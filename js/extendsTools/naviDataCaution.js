
import { RestApiData } from "./restApiData.js";
export class NaviDataCaution{
    constructor(){
        this.map;
        this.currentLat, this.currentLon;

        this.dataTool = new RestApiData();

        this.isNavi = false;
        this.expectCoin;
    }

    setMap(map){
        this.map = map;
    }

    setExpectCoin(coin){
        this.expectCoin = coin;
    }
    
    naviDataCaution(){
        return new Promise((resolve, reject)=>{
            this.dataTool.getRegionData()
            .then((data) => {
                console.log("region", data);
                // 가져온 데이터 활용
                console.log(data[2]["kms"]);
                
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
                console.log(data[2]["kms"]);

                // 데이터의 총 km를 기준으로 출력 화면 변화
                if( data[2]["kms"] <= 10) {
                    lowData.classList.toggle("unactive", false); // low O
                    iffyData.classList.toggle("unactive", true); // iffy X
                    enoughData.classList.toggle("unactive", true); // enough X
                    
                    dataCount1.textContent = `${data[2]["stacks"]}`;
                    coin1.textContent = `${this.expectCoin}`;

                }
                else if((10 < data[2]["kms"]) && (data[2]["kms"] < 100)) {
                    lowData.classList.toggle("unactive", true); // low X
                    iffyData.classList.toggle("unactive", false); // iffy O
                    enoughData.classList.toggle("unactive", true); // enough X

                    dataCount2.textContent = `${data[2]["stacks"]}`;
                    coin2.textContent = `${this.expectCoin}`;
                }
                else {
                    lowData.classList.toggle("unactive", true); // low X
                    iffyData.classList.toggle("unactive", true); // iffy X
                    enoughData.classList.toggle("unactive", false); // enough O
                    
                    dataCount3.textContent = `${data[2]["stacks"]}`;
                    coin3.textContent = `${this.expectCoin}`;
                }
                console.log("나 끝났어 경고창..");
                resolve();
            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            });
        })
    }


}