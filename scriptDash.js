import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getDatabase,ref,set,onValue,get} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getStorage,ref as StorageRef,uploadBytes } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
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
const storage = getStorage(app);

if(sessionStorage.getItem("loggedUser") == null ){
    window.location.href = "./login.html";
}else{

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

    
    let loggedUser = sessionStorage.getItem("loggedUser");
    let profileDataaseRef = ref(database,"Profile/"+loggedUser);
    let user;
    document.addEventListener("DOMContentLoaded",()=>{ 
        
        let CurrentSectiondatabaseRef = ref(database,"Information/Current Section");
        onValue(CurrentSectiondatabaseRef,(snapshot)=>{
            let currSession = snapshot.val();
            document.getElementById("currSec").innerHTML = currSession;
        });

        onValue(profileDataaseRef,(snapshot)=>{
            user = snapshot.val();

            document.getElementById("TeamDetail").innerHTML = `<p>${user["Team Name"]}</p>`;

            document.getElementById("teamBox").innerHTML = `<p>${user["Leader Reg No"]} - Team Leader</p>`;

            for(let i = 1;i<user["Team Size"];i++){
                document.getElementById("teamBox").innerHTML += `<p>${user["Reg"+(i+1)]} - ${user["Name"+(i+1)]}</p>`;
            }

            document.getElementById("titleVal").innerHTML =`<p>Title: ${user["Biometric Chosen"]}</p>`;

            if(user["Generated"] == false){
                document.getElementById("Generate").style.display = "block";
                document.getElementById("Question").style.display = "none";
                document.getElementById("GenBtn").style.display = "block";

            }else{
                document.getElementById("Question").innerHTML = user["Question"];
                document.getElementById("Generate").style.display = "none";
                document.getElementById("Question").style.display = "block";
                document.getElementById("GenBtn").style.display = "none";
            }
            const targetDate = new Date("2024-04-28T14:35:00").getTime();
            const now = new Date().getTime();
            const distance = targetDate - now;
            if(user["Uploaded"] == false && distance <= 0 ){
                document.getElementById("uploadBtn").disabled = false;
            }else{
                document.getElementById("uploadBtn").disabled = true;
            }
        });
    });

    document.getElementById("GenBtn").addEventListener("click", async () => {
        const questionDatabase = ref(database, "Questions");
        let i = 1;
    
        async function allocateQuestion() {
            if (i < 30) {
                const snapshot = await get(questionDatabase,"value");
                const Questions = snapshot.val();
                
                if (Questions["Question" + i]) {
                    const UserQuesRef = ref(database, `Profile/${loggedUser}/Question`);
                    const UserQuesGenRef = ref(database, `Profile/${loggedUser}/Generated`);
                    const questionSelectedRef = ref(database, `Questions/Question${i}`);
                    
                    await set(UserQuesRef, Questions["Question" + i]);
                    await set(UserQuesGenRef, true);
                    await set(questionSelectedRef, null);
                    
                    console.log("Question allocated to user.");
                    return;
                } else {
                    i++;
                    await allocateQuestion();
                }
            } else {
                console.log("No more questions available.");
            }
        }
    
        await allocateQuestion();
    });
    
    document.getElementById("SelectBtn").addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file.type !== 'application/pdf') {
          alert('Please select a PDF file.');
          e.target.value = "";
          return;
        }
    });

    document.getElementById("uploadBtn").addEventListener("click",()=>{
        const file = document.getElementById("SelectBtn").files[0];
        if(file){
            const storageRef = StorageRef(storage, user["Leader Reg No"]+"_Review_Final");
            uploadBytes(storageRef, file).then((snapshot) => {
                const FileAcceptedRef = ref(database,"Profile/" + loggedUser + "/Uploaded");
                set(FileAcceptedRef,true);
                document.getElementById("SelectBtn").value ="";
                alert('File uploaded successfully');
            });
        }else{
            alert("Please Select a file");
        }
    });

    document.getElementById("driveBtn").addEventListener("click",()=>{
        alert("Make a folder by your Biometric & Team Name and Upload everything related to the hackathon");
        window.location.href= "https://drive.google.com/drive/folders/1Nl-Wg1YFRDcHulGBln-YRvL-1O6fK-HN";
    });
    
}