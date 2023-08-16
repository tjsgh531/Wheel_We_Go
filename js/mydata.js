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
      //현재 로그인 된 유저의 데이터 가져오기
      this.getUserRecordsData();
  }

////////////////////// 사용자 누구인지 return 함수 /////////////////////

   getCurrentLoginUser(){
    //userinfo에 html에 있는 id가져오기
    const userinfo = document.getElementById('user-info');
    // user에 data-username에 있는 유저네임 저장  
    const user = userinfo.dataset.username;
    // 이후 user 변수를 활용하여 필요한 작업을 수행할 수 있습니다.
    return user;
    }


  // createCircleChart() {
  //   const { valid, km } = this.getUserRecordsData();
  //   const totalKm = data.stack;
  //   const totalCount = data.record_id.length;
  //   const myCount = this.getUserRecordsData().length;

  //   let myKm = 0;

  //   // km 배열의 모든 값을 합산
  //   for (let i = 0; i < km.length; i++) {
  //       myKm += km[i];
  //   }

  //   // valid가 2인 것들의 갯수를 계산
  //   let validCount = 0;
  //   for (let i = 0; i < valid.length; i++) {
  //       if (valid[i] === 2) {
  //           validCount++;
  //       }
  //   }

  //   const percent = (myKm / totalKm) * 100;

  //   console.log(totalKm,"중", myKm);
  //   console.log("validCount:", validCount);
  //   console.log( totalCount,"중",myCount);
  //   console.log("기여도:", percent,"%");

  //   // 최종 결과 반환
  //   return { myKm, validCount, totalCount, myCount, percent,totalKm };

    



    //     createCircleChart() {
        //     const { myNumber, myKm } = this.theNumberMyData(); // theNumberMyData() 함수 호출하여 결과 가져오기
//     const totalKm = data.stack; // 전체 데이터 개수 가져오기
//     const totalNumber = data.record_id
//     const percent = (myKm / totalKm) * 100; // 퍼센트 계산
        
//     console.log("기여도:", percent, "%");
//     console.log(totalKm, "중", myKm);
//     console.log(totalNumber, "중", myNumber);
//   }
      
//   theNumberMyData() {
//     const allRecords = data.records_id;
//     const km = data.km;
//     const user = this.getCurrentLoginUser(); // 로그인 사용자 정보 가져오기

//     let myNumber = 0; // 변수 선언과 초기화
//     let myKm = 0;

//     allRecords.forEach(function () {
//       if (user === data.user_id) {
//         myNumber += 1; // 개수 증가
//         myKm += km; // km 값을 누적
//       }
//     });
//     return { myNumber, myKm }; // 객체로 반환
    }


window.onload = ()=>{
  new MyData();
}



// class SectionManager {
//   constructor() {
//     this.sections = document.querySelectorAll('.section');
//     this.nextButtons = document.querySelectorAll('.next-button');
//     this.prevButtons = document.querySelectorAll('.prev-button');
//     this.currentSectionIndex = 0;

//     this.init();
//   }

//   init() {
//     this.nextButtons.forEach((button, index) => {
//       button.addEventListener('click', () => this.moveToNextSection(index));
//     });

//     this.prevButtons.forEach((button, index) => {
//       button.addEventListener('click', () => this.moveToPrevSection(index));
//     });

//     this.updateButtonVisibility();
//   }

//   moveToNextSection(index) {
//     this.sections[this.currentSectionIndex].classList.remove('active');
//     this.currentSectionIndex = index + 1;
//     this.sections[this.currentSectionIndex].classList.add('active');
//     this.updateButtonVisibility();
//   }

//   moveToPrevSection(index) {
//     this.sections[this.currentSectionIndex].classList.remove('active');
//     this.currentSectionIndex = index;
//     this.sections[this.currentSectionIndex].classList.add('active');
//     this.updateButtonVisibility();
//   }

//   updateButtonVisibility() {
//     this.prevButtons.forEach(button => {
//       button.style.display = this.currentSectionIndex === 0 ? 'none' : 'inline-block';
//     });

//     this.nextButtons.forEach(button => {
//       button.style.display = this.currentSectionIndex === this.sections.length - 1 ? 'none' : 'inline-block';
//     });
//   }
// }



// // Initialize the SectionManager
// const sectionManager = new SectionManager();


// // 데이터불러오기
// const api = new RestApiData();
    
// // 유저 정보 받아오기 
// const userInfo = document.getElementById('user-info')
// const user= userInfo.dataset.usernmae

// // 유저의 모든 레코드 가져오기
// api.getRecordData().then(data => {
//   // 유저 데이터만 필터링
//   const userRecords = data.filter(data=>data.user_id===user);
//   const recordsList = document.querySelector('.records-list');  
//   userRecords.forEach(record => {
//     const li = document.createElement('li');
//     li.textContent = `일시: ${record.record_date}, 이동시간: ${record.TIME}, 거리: ${record.km}, 코인: ${record.coin}`;
//     recordsList.appendChild(li);
//   });
// })
