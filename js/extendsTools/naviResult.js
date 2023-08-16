import { RestApiData } from "./restApiData.js";

export class NaviResult{
    constructor(){
        this.dataTool = new RestApiData();
    }

    // map 위치 설정
    settingMapPosition(){

    }

    // Summary 결과창 만드는 것
    createResultSummaryBoard(data_valid, time, distance, coin){
        const data_valid_item = document.querySelector('.data_valid_item');
        const data_time_item = document.querySelector('.data_time_item');
        const data_distance_item = document.querySelector('.data_distance_item');
        const data_coin_item = document.querySelector('.data_coin_item');

        //data_valid가 true 이면 정상 false 오류
        if(data_valid){
            data_valid_item.textContent = "정상";
        }else{
            data_valid_item.textContent = "오류";
        }

        // 시간 데이터
        data_time_item.textContent = `${time}`;

        // 이동 거리
        data_distance_item.textContent = `${distance}`;

        //코인
        data_coin_item.textContent = `${coin}`;
    }

    //result content 창
    createResultContentBoard(markers){
        const marking_state = document.querySelector('.marking_state');
        

        for(let i in markers){
            if(i % 3 == 0){
                if(marking_group){
                    marking_state.appendChild(marking_group);
                }
                
                const marking_group = document.createElement("div");
            }
            const newMarkItem = this.createMarkDiv(i);
            marking_group.appendChild(newMarkItem);
        }
        
    }

    createMarkDiv(num){
        const markingDiv = document.createElement('div');
        const number = document.createElement('div');
        const pin = document.createElement('div');
        const state = document.createElement('div');
        const writeStateBtn = document.createElement('div');

        markingDiv.classList.add('markin_div');
        number.classList.add("number_div");
        pin.classList.add("pin_div");
        state.classList.add("pin_div");
        writeStateBtn.add("write_state_btn");

        number.textContent = `${num}`;
        pin.innerHTML = "<i class='fa-solid fa-thumbtack'></i>";

        markingDiv.appendChild(number);
        markingDiv.appendChild(pin);
        markingDiv.appendChild(state);
        markingDiv.appendChild(writeStateBtn);

        return markingDiv;
    }
}