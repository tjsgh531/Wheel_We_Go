
export class RestApiData{
    constructor(){


    }
    ///////////////////////////////////////////////////////////////////////
    //////////////////////////  create data  //////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    // 지역(Regions) 생성
    async createRegion(regionData) {
        const apiUrl = 'http://127.0.0.1:8000/api/regions/';

        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(regionData)
        })

        .then(response => response.json());
    }

    // 한 건 당(saveRecords) 생성
    async createSaveRecord(saveRecordData) {
        const apiUrl = 'http://127.0.0.1:8000/api/saveecords/';

        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(saveRecordData)
        })

        .then(response => response.json());

    }

    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////// read data ///////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    // 지역 불러오기

    getRegionData(){
        return new Promise((resolve, reject)=>{
            const apiUrl = 'http://127.0.0.1:8000/api/regions/?format=json';

            // fetch 함수를 사용하여 데이터 가져오기
            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            });
        });  
    }
    // 유저 불러오기
    getUserData(){
        return new Promise((resolve,reject)=>{
            const apiUrl= 'http://127.0.0.1:8000/api/users/?format=json'

            fetch(apiUrl)
            .then(response => response.json())
            .then(data=> {
                resolve(data);
            });
        });
    };
    //기록 불러오기
    getsaveRecordsData(){
        return new Promise((resolve,reject)=>{
            const apiUrl= 'http://127.0.0.1:8000/api/saveRecords/?format=json'

            fetch(apiUrl)
            .then(response => response.json())
            .then(data=> {
                resolve(data);
            });
        });
    };

    ///////////////////////////////////////////////////////////////////////
    //////////////////////////  update data  //////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    // 유저 정보 업데이트 
    updateUser(userId, updatedUserData) {
        return new Promise((resolve, reject) => {
            const apiUrl = `http://127.0.0.1:8000/api/users/${userId}/`;

            fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUserData)
            })

            .then(response => response.json())
            .then(data => {
                resolve(data);
            });
        });
    }

    // 지역(Regions) 정보 업데이트 
    updateUser(regions, updatedUserData) {
        return new Promise((resolve, reject) => {
            const apiUrl = `http://127.0.0.1:8000/api/regionos/${regions}/`;

            fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUserData)
            })

            .then(response => response.json())
            .then(data => {
                resolve(data);
            });

        });
    }

    // 한 건 당(saveRecords) 정보 업데이트 
    updatesaveRecords(saveRecords, updatedUserData) {
        return new Promise((resolve, reject) => {
            const apiUrl = `http://127.0.0.1:8000/api/regionos/${saveRecords}/`;

            fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUserData)
            })

            .then(response => response.json())
            .then(data => {
                resolve(data);
            });

        });
    }

}
