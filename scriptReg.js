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

let n;

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

let validate_Email = (a)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(a);
}

let ValidRegs;
let studentRef = ref(database,'Students');
onValue(studentRef,(snapshot)=>{
    ValidRegs = snapshot.val();
    document.getElementById("RegBtn").addEventListener("click",()=>{
        const targetDate = new Date("2024-04-27T12:00:00").getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;
        if(distance >0){
            alert("Registration Starts at 12 PM");
        }else{
            
            let INFields = document.querySelectorAll(".textBox");
            for(let i = 0;i<INFields.length;i++){
                if(INFields[i].value == ""){
                alert("Empty Field Not Accepted");
                INFields[i].focus();
                return;
                }
            };
        
            let emailFieldVal = document.getElementById("EmailBox").value;
            if(!validate_Email(emailFieldVal)){
                alert("Invalid Email");
                document.getElementById("EmailBox").value = "";
                document.getElementById("EmailBox").focus();
                return;
            }
            
            let NoFieldValue = document.getElementById("WNO").value;
            const numericRegex = /^[0-9]+$/;
            if(NoFieldValue.length != 10 || !numericRegex.test(NoFieldValue)){
                alert("Invalid Contact Number");
                document.getElementById("WNO").value = "";
                document.getElementById("WNO").focus();   
                return;    
            }
        
            let regFields = document.querySelectorAll(".regno");
            for(let i = 0;i<regFields.length;i++){
                //TODO: Falsify It
                if(!validate_Reg(regFields[i].value.toUpperCase())){
                    alert("Student Not In Class or Already In a Team");
                    regFields[i].value = "";
                    regFields[i].focus();
                    return;
                }
            };
            
            if(document.querySelector("select").selectedIndex == 0){
                alert("Select Team Size");
                document.querySelector("select").selectedIndex = 0;
                document.querySelector("select").focus();
            }
            const profile = {
                "Biometric Chosen": INFields[6].value,
                "Contact No": INFields[4].value,
                "Leader Email": INFields[2].value,
                "Leader Name": INFields[1].value,
                "Leader Reg No": INFields[3].value.toUpperCase(),
                "Team Name": INFields[0].value,
                "Team Size": INFields[5].value,
                "Uploaded": false,
                "Generated": false,
                "FileLink": "",
                "Question": ""
            }
        
            let next = 6;
            for(let i = 1;i<n;i++){
                profile["Name"+(i+1)] = INFields[next+1].value;
                profile["Reg"+(i+1)] = INFields[next+2].value.toUpperCase();
                next +=2;
            }
        
            let NewUserDatabaseRef = ref(database,'Profile/'+INFields[3].value.toUpperCase());
            set(NewUserDatabaseRef,profile);
        
            let NewCredentialDatabaseRef = ref(database,'Credentials/'+INFields[3].value.toUpperCase());
        
            //let newPassword = INFields[4].value.substr(0,2)+INFields[1].value.substr(0,2).toUpperCase()+INFields[3].value.substr(7,9)+ (Math.floor(Math.random()*90)+10).toString();
            let newPassword = INFields[4].value.substr(0,2)+(Math.floor(Math.random()*90)+10).toString();
            
            set(NewCredentialDatabaseRef,newPassword);
        
            regFields.forEach((regField)=>{
                ValidRegs = ValidRegs.replace(regField.value.toUpperCase(),"");
            });

            set(studentRef,ValidRegs);
            sessionStorage.setItem("loggedUser",INFields[3].value.toUpperCase());

            alert("You are registered Successfully. "+"Your Password Is: "+ newPassword);
            window.location.href = "./Dashboard.html";}
        });
});

let validate_Reg = (a) =>{
    return ValidRegs.includes(a);
};

document.querySelector("select").addEventListener("change",()=>{
    const selectBox = document.querySelector("select");
    n = selectBox.selectedIndex;
    document.querySelector("#rightInputBox").innerHTML= "";
    for(let i = 1; i<n ; i++){
        document.querySelector("#rightInputBox").innerHTML+=
        `<div class="inputBox">
        <p>Member${i+1} Name</p>
        <input class="textBox" type="text">
        </div>
        <div class="inputBox">
        <p>Member${i+1} Reg No</p>
        <input class="textBox regno" maxlength="9" type="text">
        </div>`;
    }
});