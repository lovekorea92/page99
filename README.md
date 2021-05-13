★ HTML, CSS, JAVSCRIPT
https://doykim.netlify.app/

목차
1. 실시간 날씨,위치 정보
2. 실시간 시간 정보
3. SEARCH BAR
4. ADD memo-list
5. bg auto change
-----
★ 날씨,위치 정보

1. html/css 작성
<script src="https://kit.fontawesome.com/d7c93585cf.js" crossorigin="anonymous"></script>

<section class="weather-info">  
<i class="fas fa-cloud"></i>
<span class="js-weather"></span>
</section>

section {
  margin-left: auto;
}
.js-weather{
  font-size: 1.5rem;
}

2. javascript 작성

const weather = document.querySelector(".js-weather");
const API_KEY = "23630bbccfac33c88748bff9cb8b8662";
const COORDS = `coords`;

function getWeather(lat, lng) {
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)

.then(function (response) {
return response.json();
})
.then(function name(json) {
const temperature = json.main.temp;
const place = json.name;
weather.innerText = `${temperature}°
${place}`;
});
}

/*saveCoords()는 매개변수 coordsObj를 JSON.stringify를 이용하여 string타입으로 변환 후
locaStorage에 coords라는 key에 value로 저장을 합니다.*/
function saveCoords(coordsObj) {
localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


/*handleGeoSucces은 받아온 매개변수 position 데이터의 latitude값과 longitude 값을
coordsObj라는 object에 key와 value값으로 할당하여 줍니다.
할당된 coordsObj를 getWeather()와 saveCoords()에 인자값으로 전달합니다.*/

function handleGeoSucces(position) {
const latitude = position.coords.latitude;
const longitude = position.coords.longitude;
const coordsObj = {
latitude,
longitude
};
saveCoords(coordsObj);
getWeather(latitude, longitude);
}

/* 정보 받아오기에 실패하여 errLoacitonHandle 호출시 console창에 메세지를 띄웁니다. */
function handleGeoError (params) {
console.log("cant access geo location");
}

/*  askForCoords()는 navigator.geolocation을 통해 Geolocation API를 접근하고
브라우저는 사용자에게 위치 정보 접근 권한을 요청합니다.
이에 성공을 하게되면 받아온 GeolocationPosition 데이터를 매개변수로 넣어
handleGeoSucces 콜백을 호출하고 실패시 handleGeoError 콜백을 호출합니다.
*/
function askForCoords(params) {
navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

/*최초 방문을 시도한 기기이거나 정보가 없을경우에는 askForCoords() 호출 */
function loadCoords(params) {
const loadedCoords = localStorage.getItem(COORDS);
if(loadedCoords == null){
askForCoords();
} else{
const parsedCoords = JSON.parse(loadedCoords);
getWeather(parsedCoords.latitude, parsedCoords.longitude);
}
}

function init(params) {
loadCoords();
}
init();
-------------------------------------------------------------
★ 실시간 시간 정보

1. HTML/CSS 작성
</section>
    <div class="js-clock">
        <h1 class="js-title"></h1>
    </div>

.js-title {
  font-size: 7rem;
  margin: 0 auto var(--size-margin-bottom);
}

2. JAVASCRIPT 작성

/* ""클래스 부분을 변수로 담음 */
const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

/*  쿼리문을 변수로 담아, 텍스트로 띄움   */
function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  clockTitle.innerText = `${hours}:${minutes}:${seconds}`;   //clocktitle변수안에 텍스트형태로 넣어 실행.  ~~~쿼리문을.
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;  //만약 10초보다 작다면 초앞에0을붙인다. `{     `0${}`     :       }`;
}

/* 실행, 1초마다 gettime 갱신 */
function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();


--------------------------------------------------------------
★ SEARCH BAR

1. HTML 작성 : get방식으로 외부주소로 폼액션 연결, 아이콘

 <script src="https://kit.fontawesome.com/d7c93585cf.js" crossorigin="anonymous"></script>

 <form action="https://www.google.com/search" method="GET">
    <div class="search-bar">
      <input name="q" type="text" placeholder="   Search">
      <i class="fas fa-search"></i>
    </div>
  <p><p>
    </form>

2. CSS 작성 : 투명화, 아이콘고정, placeholder색변경

.search-bar{
  width: 500px;
  position: relative;
}

.search-bar input[type="text"]{
  width: 100%;
  padding: 20px;
  padding-right: 60px;
  box-sizing: border-box;
  background: rgba(0,0,0,0.3);
  border: 2px solid #fff;
  border-radius: 10px;
  font-size: 18px;
  color: #fff;
  outline: none;
}

.fa-search{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 25px;
  color: #fff;
  font-size: 25px;
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #fff;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: #fff;
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: #fff;
}

@media screen and (max-width: 425px){
  .search_box{
    width: 95%;
  }
}
------------------------------------------------
★ ADD memo

1. HTML/CSS 작성 : 투명화, 아이콘고정, placeholder색변경

<form class="js-toDoForm">
      <div class="js-toDoForm1">
        <input type="text" placeholder="   Add what you have to do." />
        <i class="fas fa-plus-square"></i>
      </div>
    </form>
    <p><p>
    <ul class="js-toDoList"></ul>



.fa-search{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 25px;
  color: #fff;
  font-size: 25px;
}

.js-toDoForm1{
   width: 350px;
  position: relative;
}
.js-toDoForm1 input[type="text"]{
  width: 100%;
  padding: 20px;
  padding-right: 60px;
  box-sizing: border-box;
  background: rgba(0,0,0,0.3);
  border: 2px solid #fff;
  border-radius: 10px;
  font-size: 18px;
  color: #fff;
  outline: none;
}
.fa-plus-square{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 25px;
  color: #fff;
  font-size: 25px;
}


2. JAVASCRIPT 작성

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

/* 리스트 삭제하기*/
function deleteToDo(event) {
  const btn = event.target;    //이벤트발생시 정보호출
  const li = btn.parentNode;  //버튼에대한 부모요소
   toDoList.removeChild(li);   //자식 li 태그 제거
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id); //filter는 해당 함수가 toDos의 모든 items들에게 실행하도록 하여 재배열
  });
  toDos = cleanToDos; 
  saveToDos();    // 로컬 스토리지 저장
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}


/* 배열에 추가하기*/
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;   
  li.appendChild(delBtn);  //버튼요소
  li.appendChild(span);    //text요소
  li.id = newId;            // 새로운id값 부여
  toDoList.appendChild(li);    
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj); //배열에 추가
  saveToDos();
}

/* 제출 관리 */
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();

--------------------------------------------
★ bg auto change : 1.jpg  2.jpg  3.jpg 파일을 준비하고 js연결.

const body = document.querySelector("body");
const IMG_NUMBER = 3;

// 이미지명 ${imgNumber + 1}.jpg` 을 배경이미지로 돌림
function paintImage(imgNumber) {
  const image = new Image();
  image.src = `${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}
//랜덤한 수 생성,저장   내림(0.@@*3)  ----경우의수는 0,1,2
function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
