let activePage = 0;

const preBtn = document.querySelector('.pre');
const nxtBtn = document.querySelector('.next');

const contents = document.querySelectorAll(".content");


nxtBtn.addEventListener("click", ()=>{
    if(activePage > 4){
        activePage = 4;
    }
    else{
        activePage++;
    }

    btnsAct();
    allUnactive();
    contents[activePage].classList.toggle("unactive", false);
});

preBtn.addEventListener("click", ()=>{
    if(activePage < 0){
        activePage = 0;
    }
    else{
        activePage--;
    }

    btnsAct();
    allUnactive();
    contents[activePage].classList.toggle("unactive", false);
});

const start = document.querySelector(".content_4_start");
start.addEventListener("click", ()=>{

    activePage++;
    btnsAct();
    allUnactive();
    contents[activePage].classList.toggle("unactive", false);
});

function allUnactive(){
    contents.forEach(element => {
        element.classList.toggle("unactive", true);
    });
}

function btnsAct(){
    const btns = document.querySelector(".btns");

    if(activePage >=3){
        btns.classList.toggle("unactive", true);
    }
    else{
        btns.classList.toggle("unactive", false);
    }
}