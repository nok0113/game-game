//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go 라는 버튼을 누름.
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤 번호가 < 유저 번호 Down!!
//랜덤 번호가 > 유저 번호 up!!
//rest버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다 쓰면 게임이 끝난다. (더 이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖의 숫자를 입력하면, 알려준다. 기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지 않는다.


let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5
let gameOver = false
let chanceArea = document.getElementById("chance-area");
let history=[];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus",function(){userInput.value=""});//입력창에 다시 커서를 놓았을때 값이 사라지는것
//function()괄호에 지정 안해준 것은 여기에만 쓸거라..!

function pickRandomNum(){ //math.floor은 소수점 버리는거
    computerNum = Math.floor(Math.random() * 100) + 1; //math랜덤은 0~1까지 랜덤 .소수껴서 100까지 뽑으려면 곱하기 100을 해줌. +1해야 0~99 -> 1~100으로 됨
    console.log("정답", computerNum);
}

function play(){
    let userValue = userInput.value;

    if(userValue<1 || userValue>100){
        resultArea.textContent="1과 100사이 숫자를 입력해주세요."
        return;
    };

    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 숫자 입니다. 다른 숫자를 입력해주세요."
        return;
    };

    chances --;
    chanceArea.textContent=`남은 기회 : ${chances}번`;
    console.log("chance", chances);

    if(userValue < computerNum){
        resultArea.textContent = "UP!!!"
    }else if(userValue > computerNum){
        resultArea.textContent = "DOWN!!!"
    }else{
        resultArea.textContent = "맞췄습니다!!!"
        gameOver=true;
    }
    history.push(userValue) //입력한 값 히스토리 배열에 저장
    console.log(history);

    if(chances < 1){
    gameOver = true;
    }
    if(gameOver == true){
        playButton.disabled = true; //disabled 버튼 비활성화
    }
};

function reset(){
    //리셋이란? user input창이 깨끗하게 정리되고
    userInput.value  = ""
    // 새로운 번호가 생성되고
    pickRandomNum();
    resultArea.textContent="결과값이 여기 나옵니다!"
};
pickRandomNum();