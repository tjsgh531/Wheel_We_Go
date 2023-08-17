export class Loading{
    constructor(){

        this.cautions = [];
    }

    loadAppear(){
        const loader = document.querySelector('.loader');
        const loader_text = document.querySelector('.loader_text');
        
        loader.classList.toggle("unactive", false);

        const caution_text1 = setTimeout(()=>{
            loader_text.textContent = "혹시 건물 안 인가요? 건물안은 좌표가 잘 안잡혀요ㅜㅜ";
        }, 5000);
        this.cautions.push(caution_text1);

        const caution_text2 = setTimeout(()=>{
            loader_text.textContent = "현재 좌표를 불러 올수 없어 기본 위치로 이동할게요.";
        }, 12000);
        this.cautions.push(caution_text2);
    }

    loadDisAppear(){
        const loader = document.querySelector('.loader');
        const loader_text = document.querySelector('.loader_text');
        
        // 주의 문구 안나오게
        this.cautions.forEach(element => {
            clearTimeout(element);
        });

        setTimeout(()=>{
            loader.classList.toggle("unactive", true);
            loader_text.textContent ="현재 위치 좌표 불러오는 중 ..."    
        }, 3000);
    }
}
