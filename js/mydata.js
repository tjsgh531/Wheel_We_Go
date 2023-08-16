// import { RestApiData } from "./extendsTools/restApiData.js";
// // import { NaviResult } from "./extendsTools/naviResult.js";
// class MyData {
//   //흐름
//   constructor() {
//     this.restApiTool = new RestApiData();
//     // this.naviResultTool = new NaviResult();

//     this.createCircleChart();

//     this.getUserRecordsData();

//     this.createUserRecordsData();
//   }


//   getUserRecordsData() {
//     this.restApiTool.getRecordData().then(

//     )
//   }

//   createCircleChart() {
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

//     allRecords.forEach(function (recordId) {
//       if (user === user_id) {
//         myNumber += 1; // 개수 증가
//         myKm += km; // km 값을 누적
//       }
//     });
//     return { myNumber, myKm }; // 객체로 반환
//   }

// }


// window.onload = () => {
//   new MyData();
// }
