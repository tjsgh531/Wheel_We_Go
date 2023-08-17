import { RestApiData } from "./extendsTools/restApiData.js";
import { NaviResult } from "./extendsTools/naviResult.js";

class MyData {
  //흐름
  constructor() {
    //restApiData.js에서 함수를 쓰기 위한 추가
    this.restApiTool = new RestApiData();
    //naveResultTool.js에서 함수를 쓰기 위한 추가
    this.naviResultTool = new NaviResult();
    //현재 로그인 된 유저 가져오기
    this.username = this.getCurrentLoginUser();


    // this.setArrayRegion();
    // this.setArrayTime();
    //현재 로그인 된 유저의 모든 데이터 가져오기
    this.PrintUserRecordsAllData();

  }
  ////////////////////// 사용자 누구인지 return 함수 /////////////////////

  getCurrentLoginUser() {
    //userinfo에 html에 있는 id가져오기
    let userinfo = document.getElementById('user-info');
    // user에 data-username에 있는 유저네임 저장  
    let user = userinfo.dataset.username;
    // 이후 user 변수를 활용하여 필요한 작업을 수행할 수 있습니다.
    return user;
  }

  ///////////////////// 데이터 정렬 기준을 위한 토글 //////////////////////

  setArrayTime() {



  }
  /////////////////////// 지역 별 데이터 토글 //////////////////////////////

  setArrayRegion() {

  }

  ////////////////////// 로그인 된 사용자의 기록 저장 순으로 출력 /////////////////////

  PrintUserRecordsAllData() {
    this.restApiTool.getsaveRecordsData().then(data => {
      // 유저 데이터만 필터링해줌
      const userRecords = data.filter(record => record.user_id === this.username);

      // 필요한 값 가져오기
      userRecords.forEach(infoData => {
        const recordDate = infoData.info.date;
        const start = infoData.info.startName;
        const end = infoData.info.endName;
        const time = infoData.info.AtTime;
        const km = infoData.info.distance;
        const credit = infoData.earnedCoin;
        const listItem = document.createElement('li');
        listItem.style.listStyle = 'none';
        listItem.innerHTML = `
            <div class="route-data-time">${recordDate}</div>
            <div class="route-etc-time">
              <div class="circle-container">
                <span class="circle-0"></span>
                <div class="route">
                    <div class='start_location'>${start}</div> -> <div class ='end_location'>${end}</div>
                </div>
              </div>
              <div class="etc-data">
                <div><img src="../static/img/시간.png" alt="시간">
                    <div class = 'take_time'>${time}분</div>
                </div>
                <div><img src="../static/img/거리.png" alt="거리">
                    <div class = 'kms'>${km}km</div>
                </div>
                <div><img src="../static/img/코인.png" alt="코인">

                    <div class='coins'>${credit}</div>
                </div>
              </div>
            </div>
        `;
        document.querySelector('.records-list').appendChild(listItem);
      });
    });
  }
  /////////////////////////////// 출력 ///////////////////////////////

}




window.onload = () => {
  new MyData();
}
