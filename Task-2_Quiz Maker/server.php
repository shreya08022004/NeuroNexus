<?php
$host='localhost';
$db='online_quiz';
$user='root';
$pass='HelloShreya&008';
$dsn="mysql:$host;dbname=$db;charset=utf8mb4";
$options=[
    PDO::ATTR_EMULATE_PREPARES   => false,
    PDO::ATTR_ERRMODE            => PD0::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];
try{
    $pdo=new PDO($dsn, $user,$pass,$options);
} catch(Exception $e){
    error_log($e->getMessage());
    exit('Database connextion failed');
}

if($_SERVER['REQUEST_METHOD']==='POST'){
    $action=$GET['action']??'';

    if($action==='createQuiz'){
        $quizData=json_decode(file_get_contents('php://input'),true);
        createQuiz($quizData);
        echo 'Quiz created successfully!';
    }elseif($action==='submitQuiz'){
        $answers=json_decode(file_get_contents('php://input'),true);
        $score=calculateScore($answers);
        echo "Your score: $score";
    }
}

function createQuiz($quizData){
    global $pdo;
    $question=$quizData['question'];
    $options=$quizData['options'];
    $correctAnswer=$quizData['correctAnswer'];
    $stmt=$pdo->prepare("INSERT INTO quizzes(question,option1,option2,option3,option4,correct_answer) VALUES(?,?,?,?,?,?)");
    $stmt->execute([$question,$options[0],$options[1],$options[2],$options[3],$correctAnswer]);

}
if($_SERVER['REQUEST_METHOD']==='POST'){
    $action=$_GET['action']??'';
    if($action==='createQuiz'){
        $quizData=json_decode(file_get_contents('php://input'),true);
        createQuiz($quizData);
        echo 'Quiz created successfully!';
    }elseif($action==='submitQuiz'){
        $answers=json_decode(file_get_contents('php://input'),true);
        $score=calculateScore($answers);
        echo "Your Score: $score";
    }elseif($action==='deleteQuiz'){
        $quizId=$_GET['id']??0;
        deleteQuiz($quizId);
        echo 'Quiz deleted';
    }
}

function deleteQuiz($quizId){
    global $pdo;
    $stmt=$pdo->prepare("DELETE FROM quizzes WHERE id=?");
    $stmt->execute([$quizId]);
}

function getQuizzes(){
    global $pdo;
    $stmt=$pdo->quesry("SELECT * FROM quizzes");
    return $stmt->fetchAll();
}

function calculateScore($answers){
    global $pdo;
    $score=0;
    foreach($answers as $question => $selectedOption){
        $stmt=$pdo->prepare("SELECT correct_answer FROM quizzes WHERE id=?");
        $stmt=execute([$question]);
        $correctAnswer=$stmt->fetchcolumn();

        if($selectedoption===$correctAnswer)
        {
            $score++;
        }
    }
    return $score;
}
?>