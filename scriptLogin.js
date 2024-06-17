import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getDatabase,ref,set,onValue} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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
    window.location.href = "./#Container";
});

document.querySelector("#TimelineButton").addEventListener("click", () => {
    window.location.href = "./#Timeline";
});

document.querySelector("#EvalButton").addEventListener("click", () => {
    window.location.href = "./#Eval";
});

document.querySelector("#FaqButton").addEventListener("click", () => {
    window.location.href = "./#FAQ";
});

document.querySelector("#LoginButton").addEventListener("click", () => {
    window.location.href="./login.html";
});


let INFields = document.querySelectorAll(".textBox");
let LoginBtn = document.getElementById("LogBtn");

LoginBtn.addEventListener("click",async ()=>{
    try {
        const CredentialdBRef = ref(database,'Credentials/'+INFields[0].value.toUpperCase());
        let password;
        let passwordEntered = INFields[1].value;
        await onValue(CredentialdBRef,(snapshot)=>{
            password = snapshot.val();
            if(passwordEntered != password){
                alert("Incorrect Username or Password");
                INFields[1].value = "";
                INFields[1].focus();
            }else{
                sessionStorage.setItem("loggedUser",INFields[0].value.toUpperCase());
                INFields[0].value = "";
                INFields[1].value = "";
                window.location.href="./Dashboard.html";
            }
        });
    } catch (error) {}
});