class Search {
    constructor() {
        this.getList();
        // this.catchString();
        // this.getData();

        // this.searchLog = document.querySelector('.search_log');
        // this.logdata.forEach(e => {
        //     const newSearchBlock = this.createSearchBlock(e.search_word, e.date);
        //     this.searchLog.appendChild(newSearchBlock);
        // });

    }

    getList(){
        console.log("hoho")
        $('#btn_select').click(function(){
            let searchKeyword = $('#searchKeyword').val();
            let headers = {};
            headers["appKey"]="l7xxed2c734830ae4364975ef11e67a76e81";
            
            $.ajax({
                method:"GET",
                headers : headers,
                url:"https://apis.openapi.sk.com/tmap/pois?version=1&format=json&callback=result",
                async:false,
                data:{
                    "searchKeyword" : searchKeyword,
                    "centerLat" : "35.151017",
                    "centerLon" : "128.103734",
                    "resCoordType" : "EPSG3857",
                    "reqCoordType" : "WGS84GEO",
                    "count" : 10
                },
                success:function(response){
                    let resultpoisData = response.searchPoiInfo.pois.poi;
                    let search_list =[];
                    
                    for(let k in resultpoisData){
                        
                        let noorLat = Number(resultpoisData[k].noorLat);
                        let noorLon = Number(resultpoisData[k].noorLon);
                        let name = resultpoisData[k].name;
                        search_list.push(name);
                    }
                    console.log(search_list);
                    
                    $("#searchResult").html(search_list);	//searchResult 결과값 노출
                    
                    
                },
                error:function(request,status,error){
                    console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                }
            });
        })
    }

    /*
    getData() {
        this.logdata = [
            {
                "search_word": "진주역(고속철도)",
                "date": "08.02"
            },
            {
                "search_word": "홈리스 타코",
                "date": "08.03"
            },
            {
                "search_word": "월포 해수욕장",
                "date": "08.06"
            }
        ];
    }

    createSearchBlock(word, date) {
        const searchBlock = document.createElement('div');
        searchBlock.classList.add("searchblock");

        const wordBlock = document.createElement('div');
        wordBlock.classList.add("word-block");
        wordBlock.textContent = `${word}`;

        const dateBlock = document.createElement('div');
        dateBlock.classList.add("date-block");
        dateBlock.textContent = `${date}`;

        const cancle = document.createElement('div');
        cancle.classList.add("cancle");
        cancle.textContent = "X";
        cancle.addEventListener("click", ()=>{
            
        })

        searchBlock.appendChild(wordBlock);
        searchBlock.appendChild(dateBlock);
        searchBlock.appendChild(cancle);

        return searchBlock;
    }
    */
}

/*
// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    const cancelButton = document.querySelector('.cancleBtn'); // 취소 버튼
    const searchBox = document.querySelector('.searchBox'); // 검색 입력 필드

    cancelButton.addEventListener('click', () => {
        searchBox.value = ''; // 검색 입력 필드 내용 초기화
    });
});
*/