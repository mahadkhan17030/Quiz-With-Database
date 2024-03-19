  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
  import { getDatabase,ref,onChildAdded } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDY4GgJY8iPDxK33aNupHnS7Yb_7RNgRI8",
    authDomain: "quiz-with-database-70177.firebaseapp.com",
    databaseURL: "https://quiz-with-database-70177-default-rtdb.firebaseio.com",
    projectId: "quiz-with-database-70177",
    storageBucket: "quiz-with-database-70177.appspot.com",
    messagingSenderId: "586791218075",
    appId: "1:586791218075:web:e41d0597a9fd989f8dcf3e",
    measurementId: "G-ZB3Q30E3SF"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase();

var currQues = document.getElementById("currentQuestion")
var totalQues = document.getElementById("totalQuestion")
var dispQues = document.getElementById("displayQuestion")
var option = document.getElementById("options")
var maindiv = document.getElementById("maindiv") 
var showResult = document.getElementById("showResult")
var displayMarks = document.getElementById("dispMarks")
var displayGrade = document.getElementById("dispGrade")
var displayPercentage = document.getElementById("dispPercentage")
var displayStatus = document.getElementById("dispStatus")
var marks = 0;
var currentIndex = 0;
var questions = []



window.getData = function () {
  maindiv.style.display='none'
  var reference = ref(db,'questions')
onChildAdded(reference,function(data){
    console.log(data.val())
    questions.unshift(data.val())
    // console.log(questions)
    maindiv.style.display='block'
    initRender()
  })
}
getData()




window.next = function () {
  if (currentIndex + 1 == questions.length) {
    showResult.style.display = "flex"
    maindiv.style.display = "none"
    var totalmarks = questions.length
    var percentage = (marks / totalmarks) * 100
    console.log(totalmarks)
    displayMarks.innerHTML = marks
    displayPercentage.innerHTML = percentage.toFixed(2)
    if(percentage > 79){
      displayGrade.innerHTML = "A+"
    }
    if(percentage>= 70 && percentage < 80){
      displayGrade.innerHTML = "A"
    }
    if(percentage >= 60 && percentage < 70 ){
      displayGrade.innerHTML = "B"
    } 
    if(percentage >= 50 && percentage < 60 ){
      displayGrade.innerHTML ="C"
    }
    if(percentage >= 40 && percentage < 50 ){
      displayGrade.innerHTML ="D"
    }
    
    if (percentage < 40) {
      displayStatus.innerHTML = "Fail"
      displayGrade.innerHTML = "F"
    }
    else {
      displayStatus.innerHTML = "Pass"
    }
  }
  else {
    currentIndex++
    initRender()
  }
}  
  


  window.initRender = function () {
    totalQues.innerHTML = questions.length
    currQues.innerHTML = currentIndex + 1;
    dispQues.innerHTML = questions[currentIndex].question
    option.innerHTML = ''
    for (var i = 0; i < questions[currentIndex].option.length; i++) {
      option.innerHTML += `
          <div class="col-md-6 text-center">
                  <button class="rounded-pill btn-outline-warning bg-dark opt"
                   onclick ="checkAns('${questions[currentIndex].option[i]}','${questions[currentIndex].correctAnswer}')">
           ${questions[currentIndex].option[i]}</button>
              </div>
          `
    }
  }
  window.checkAns = function (a,b){
    
    if(a==b){
      marks++
      }
      next()
  }