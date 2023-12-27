function submitQuiz(){
    const question=document.getElementById("question").value;
    const option1=document.getElementById("option1").value;
    const option2=document.getElementById("option2").value;
    const option3=document.getElementById("option3").value;
    const option4=document.getElementById("option4").value;
    const correctAnswer=document.getElementById("correctAnswer").value;
    const quizData={
        question:question,
        options:[option1,option2,option3,option4],
        correctAnswer:correctAnswer
    };
    const xhr=new XMLHttpRequest();
    xhr.open("POST","server.php?action=createQuiz",true);
    xhr.setRequestHeader("content-type","application/json");
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            console.log(xhr.responseText);
        }
    };
    const data=JSON.stringify(quizData);
    xhr.send(data);
}
function displayQuiz(quizData){
    const questio=document.getElementById("quizForm");
    quizForm.innerHTML="";
    quizData.forEach((question,index)=>{
        const questionDiv=document.createElement("div");
        questionDiv.innerHTML=`<p>${index+1}. ${question.question}</p>`;
        question.options.forEach((option, i)=>{
            const radio=document.createElement("input");
            radio.type="radio";
            radio.name=`question${index}`;
            radio.value=option;
            radio.reuired=true;

            const label=document.createElement("label");
            label.innerText=option;
            questionDiv.appendChild(radio);
            questionDiv.appendChild(label);
        });
        quizForm.appendChild(questionDiv);
    });
}

function deleteQuiz(){
    const quizId=getSelectedQuizId();
    const xhr=new XMLHttpRequest();
    xhr.open("PSOT",`server.php?action=deleteQuiz&id=${quizId}`,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            console.log(chr.responseText);
        }
    };
    xhr.send();
}

function getSelectedQuizId(){
    return 1;
}

function submitQuiz(){
    const quizForm=document.getElementById("quizForm");
    const formData=new FormData(quizForm);
    const answers={};
    formData.forEach((value,key)=>{
        answers[key]=value;
    });
    const xhr=new XMLHttpRequest();
xhr.open("POST","server.php?action=submitQuiz",true);
xhr.setRequestHeader("Content-type","application/json");
xhr.onreadystatechange=function(){
    if(xhr.readyState==4 && xhr.status==200){
        console.log(xhr.responseText);
    }
};
const data=JSON.stringify(answers);
xhr.send(data);
}

function fetchQuizzes(){
    const xhr=new XMLHttpRequest();
    xhr.open("GET","server.php?action=gtQuizzes",true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            const quizData=JSON.parse(xhr.responseText);
            displayQuiz(quizData);
        }
    };
    xhr.send();
}
document.getEventListener("DOMContentLoaded",function(){
    fetchQuizzes();
});