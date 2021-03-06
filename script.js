console.log('its connected')

const questions = [

    {
  
      question: 'Sorry, there is no STAR on the stage tonight!',
  
      answers: [
  
        { text: 'Trump', correct: true },
  
        { text: 'Kanye', correct: false }
  
      ]
  
    },
    {
  
        question: 'The concept of global warming was created by and for the Chinese in order to make U.S. manufacturing non-competitive.',
    
        answers: [
    
            { text: 'Trump', correct: true },
  
            { text: 'Kanye', correct: false }
    
        ]
    
      },
      {
  
        question: 'Have you ever thought you were in love with someone but then realized you were just staring in the mirror for 20 minutes?',
    
        answers: [
    
            { text: 'Trump', correct: false },
  
            { text: 'Kanye', correct: true}
    
        ]
    
      }
]

const totalQuestions = questions.length
let currentQuestionIndex
let score



const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainer = document.getElementById("question-container")
console.log (startButton)
const questionElement = document.getElementById('question')
console.log (questionElement)
const answerElement = document.getElementById('answers')
console.log(answerElement)
const badResult= document.getElementById('bad-result')
const goodResult= document.getElementById('good-result')


let shuffledQuestions

startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', ()=> {
    currentQuestionIndex ++
    nextQuestion()
})

function startGame(){
    console.log ('started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    score = 0
    questionContainer.classList.remove('hide')
   nextQuestion()
}



function nextQuestion(){
    resetState()
    showNextQuestion(shuffledQuestions[currentQuestionIndex])

}

function showNextQuestion(question){
questionElement.innerText = question.question
question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
        button.dataset.correct = answer.correct
      
    }
    button.addEventListener('click', selectAnswer)
    answerElement.appendChild(button)
})
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerElement.firstChild) {
        answerElement.removeChild (answerElement.firstChild)
    }

} 


 function selectAnswer(e){
     const selectedButton = e.target
     const correct = selectedButton.dataset.correct
     if (correct){updateScore()}
    //  Array.from(answerElement.children).forEach(button=> {
    //      setStatusClass (button, button.dataset.correct)
    //  })
     if(shuffledQuestions.length > currentQuestionIndex+1) {
        nextButton.classList.remove('hide')
     } else showResult() 
 }
 
 function updateScore(){
    score++
    document.getElementById("scoreDiv").innerHTML = `SCORE : ${score}`;
 }

 function showResult(){
    if (score >= 2) {
        questionContainer.classList.add("hide")
        successfulEnd()
        document.querySelector('.card h1').innerText = "You are a CHUMP"
        // startButton.innerText = "Want to restart?"
        // startButton.classList.remove('hide')
    }
    else {
       questionContainer.classList.add("hide")
       badEnd()
       document.querySelector('.card h1').innerText = "Next time"

    //    startButton.innerText = "Want to restart?"
    //    startButton.classList.remove('hide')
    }

 }
 function successfulEnd(){
    resetState()
     document.getElementById("scoreDiv").classList.remove('hide')
     document.getElementById("good-result").classList.remove('hide')
 }

 function badEnd(){
    resetState()
    document.getElementById("scoreDiv").classList.remove('hide')
    document.getElementById("bad-result").classList.remove('hide')
 }


 function setStatusClass(element,correct){
     clearStatusClass(element)
     if(correct) {
         element.classList.add('correct')
     } else {
         element.classList.add('wrong')
     }
 }

 function clearStatusClass(element){
     element.classList.remove('correct')
     element.classList.remove('wrong')
 }
 document.getElementById("scoreDiv").innerHTML = `SCORE : ${score}`;