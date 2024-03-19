// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
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
const db = getDatabase()

var question = document.getElementById("ques")
var option = document.getElementById("opt")
var optionParent = document.getElementById("optionParent")
var correctAnswerElem = document.getElementById("correctAnswer")
var correctAnswer;
var options = []

function renderOption() {
  optionParent.innerHTML = ""
  for (var i = 0; i < options.length; i++) {
    optionParent.innerHTML += `<li onclick="setCorrectAnswer('${options[i]}')" class="p-2 bg-light fs-5  rounded shadow my-2 " >${options[i]}</li>`
  }
}

window.addOption = function () {
  options.push(option.value)
  renderOption()
}


window.setCorrectAnswer = function (a) {
  correctAnswer = a
  correctAnswerElem.innerHTML = correctAnswer
}

window.submitQuestion = function () {
  var obj = {
    question: question.value,
    option: options,
    correctAnswer: correctAnswer
  }
  obj.id = push(ref(db, 'questions/')).key
  var reference = ref(db, `questions/${obj.id}`)
  set(reference, obj)
}