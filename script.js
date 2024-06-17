import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getDatabase,ref,set,onValue,get} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyB4qxrgaYaaiKgXbjrqgpAGEFjCHob4QLg",
    authDomain: "codeathon-f3542.firebaseapp.com",
    databaseURL:"https://codeathon-f3542-default-rtdb.firebaseio.com/",
    projectId: "codeathon-f3542",
    storageBucket: "codeathon-f3542.appspot.com",
    messagingSenderId: "1097109950913",
    appId: "1:1097109950913:web:fba1f2e40003a506bfdf40",
    measurementId: "G-LP91VL9LY4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

document.querySelector("#HomeButton").addEventListener("click", () => {
    document.querySelector('#Container').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector("#TimelineButton").addEventListener("click", () => {
    document.querySelector('#Timeline').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector("#EvalButton").addEventListener("click", () => {
    document.querySelector('#Eval').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector("#FaqButton").addEventListener("click", () => {
    document.querySelector('#FAQ').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector("#topBtn").addEventListener("click", () => {
    document.querySelector('#Container').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector("#RegisterBtn").addEventListener("click", () => {
    window.location.href="./signup.html";
});

document.querySelector("#LoginBtn").addEventListener("click", () => {
    window.location.href="./login.html";
});

document.querySelector("#LoginButton").addEventListener("click", () => {
    window.location.href="./login.html";
});

document.querySelector("#resultBtn").addEventListener("click", () => {
    const targetDate = new Date("2024-04-28T19:00:00").getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;
    if(interval >0){
        alert("Result Will Be Declared At 28 April 2024 7:00 PM");
    }else{
        window.location.href = "./result.html";
    }

});

const targetDate = new Date("2024-04-27T14:00:00").getTime();
const interval = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;


    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(distance>0){
        document.getElementById("Days").innerHTML = check_Size(days) + days;
        document.getElementById("Hrs").innerHTML = check_Size(hours) + hours;
        document.getElementById("Mins").innerHTML = check_Size(minutes) + minutes;
        document.getElementById("Secs").innerHTML = check_Size(seconds) + seconds;
    
    }else{
        document.getElementById("Days").innerHTML = "00";
        document.getElementById("Hrs").innerHTML = "00";
        document.getElementById("Mins").innerHTML = "00";
        document.getElementById("Secs").innerHTML = "00";
    }
    
}, 1000);

let check_Size = (a) =>{
    if(a<10){
        return "0";
    }else{
        return "";
    }
}

let NoticedatabaseRef = ref(database,"Information/Notice");
onValue(NoticedatabaseRef,(snapshot)=>{
    let notice_message = snapshot.val();
    document.getElementById("notice").innerHTML = notice_message;
});
