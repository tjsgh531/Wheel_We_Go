import { RestApiData } from "./extendsTools/restApiData.js";
import { NaviResult } from "./extendsTools/naviResult.js";

class MyData{
  //흐름
  constructor(){
    //restApiData.js에서 함수를 쓰기 위한 추가
    this.restApiTool = new RestApiData();
    //naveResultTool.js에서 함수를 쓰기 위한 추가
    this.naviResultTool = new NaviResult();
    //현재 로그인 된 유저 가져오기
    this.username = this.getCurrentLoginUser();
    //현재 로그인 된 유저의 데이터가져오기(필터링 추가)
    this.PrintUserRecordsAllData();
    
  }

  ////////////////////// 현재 로그인 된 유저 가져오기 함수 /////////////////////

  getCurrentLoginUser(){
      //userinfo에 html에 있는 id가져오기
      let userinfo = document.getElementById('user-info');
      // user에 data-username에 있는 유저네임 저장  
      let user = userinfo.dataset.username;
      // 이후 user 변수를 활용하여 필요한 작업을 수행할 수 있습니다.
      return user;
  }


  ////////////////////// 현재 로그인 된 유저의 데이터가져오기(필터링 추가) /////////////////////
  PrintUserRecordsAllData() {
    this.restApiTool.getsaveRecordsData().then(data => {
      const userRecords = data.filter(record => record.user_id === this.username);

      // 우선 오래된 것 부터 정렬( 동 필터링 미적용시 날짜순으로 정렬하기)
      userRecords.sort((a, b) => a.info.date.localeCompare(b.info.date));
      
      // 우선 정렬 화면에 표시
      this.displayRecords(userRecords);


      /////// 동 필터링 설정( html에서 필터링 id가져오기 )
      const startNameFilter = document.getElementById('startNameFilter');
          // 현재 로그인 유저에서 시작 동 이름이 같은 기록만 가져와서 set으로 저장
      const startNames = new Set(userRecords.map(record => record.info.startName));
          // 동 선택 추가를 위해 프리셋 설정 ( 아래 for문을 돌며 전체 부분이 startName으로 바뀌어 추가)
      startNameFilter.innerHTML = '<option value="">전체</option>';
          // 시작 동 추가해주기 
      startNames.forEach(startName => {
        const option = document.createElement('option');
        option.value = startName;
        option.textContent = startName;
        startNameFilter.appendChild(option);
      });
          // 시작 동 바뀌면 그 시작 필터로 가기
      startNameFilter.addEventListener('change', () => {
        const selectedStartName = startNameFilter.value;
        this.filterAndDisplayRecords(userRecords, selectedStartName);
      });
      /////// 날짜 범위 필터링 리스너 설정 (동필터링과 유사하게 감)
      const dateFilter = document.getElementById('dateRangeFilter');
      dateFilter.addEventListener('change', () => {
        const selectedRange = dateFilter.value;
        this.filterAndDisplayDateRange(userRecords, selectedRange);
      });

      const sortOption = document.getElementById('sortOption');
      sortOption.addEventListener('change', () => {
        const selectedSort = sortOption.value;
        this.sortAndDisplayRecords(userRecords, selectedSort);
      });
    });
  }

  // 동필터링 된 내용 출력 함수 ( 필터링 레코드와 시작 이름을 받아옴)
  filterAndDisplayRecords(records, selectedStartName) {
    // 출발지 이름이 선택되었을 때 필터링을 저장, 선택되지 않았을 땐 배열 그대로 사용
    const filteredRecords = selectedStartName
    // 조건...연산자...
      ? records.filter(record => record.info.startName === selectedStartName)
      : records;
    // class records-list추가 ( 이하 내용은 위의 기본 셋과 동일 )
    this.displayRecords(filteredRecords);
  }
  // 날짜 범위 필터링 함수
  filterAndDisplayDateRange(records, selectedRange) {
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - selectedRange);

  const filteredRecords = records.filter(record => {
    const recordDate = new Date(record.info.date.replace(/\./g, '-'));
    return recordDate >= oneMonthAgo && recordDate <= today;
  });

  this.displayRecords(filteredRecords);
  }

// 정렬 옵션 적용 함수
  sortAndDisplayRecords(records, selectedSort) {
  if (selectedSort === 'latest') {
    records.sort((a, b) => b.info.date.localeCompare(a.info.date));
  } else if (selectedSort === 'oldest') {
    records.sort((a, b) => a.info.date.localeCompare(b.info.date));
  }

  this.displayRecords(records);
  }

// 데이터 표시 함수
displayRecords(records) {
  const recordsList = document.querySelector('.records-list');
  recordsList.innerHTML = '';

  records.forEach(infoData => {

    const recordDate = new Date(infoData.info.date.replace(/\./g, '-'));
    const start = infoData.info.startName;
    const end = infoData.info.endName;
    const time = infoData.info.AtTime;
    const km = infoData.info.distance;
    const credit = infoData.earnedCoin;
    const listItem = document.createElement('li');
    listItem.style.listStyle = 'none';
    listItem.innerHTML = `
      <div class="route-data-time">${recordDate.toLocaleDateString()}</div>
      <div class="circle-container">
        <span class="circle-0"></span>
        <div class="route">
          <div class='start_location'>${start}</div> -> <div class ='end_location'>${end}</div>
        </div>
      </div>
      <div class="etc-data">
        <div><img src="../static/img/시간.png" alt="시간">
          <div class='take_time'>${time}분</div>
        </div>
        <div><img src="../static/img/거리.png" alt="거리">
          <div class='kms'>${km}km</div>
        </div>
        <div><img src="../static/img/코인.png" alt="코인">
          <div class='coins'>${credit}</div>
        </div>
      </div>
    `;
    recordsList.appendChild(listItem);  
    });
  }
}








/////////////////////////////// 출력 ///////////////////////////////
window.onload = ()=>{
  new MyData();
}
