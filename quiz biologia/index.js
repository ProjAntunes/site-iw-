const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Qual quais são os principais metas da ods 14",
    answers: [
      { text: "Reduzir a emissão de CO2", correct: false },
      { text: "essa ods não existe", correct: false },
      { text: "previnir a poluição marinha", correct: true },
      { text: "Erradicar a fome", correct: false }
    ]
  },
  {
    question: "quais são os desafios para resolver os problemas da vida marinha ",
    answers: [
      { text: "sobrepesca,e poluição marinha", correct: true },
      { text: "Desigualdade de genero e acesso a educação", correct: false },
      { text: "altos niveis de poluição na terra", correct: false },
      { text: "Os varios paises que passam fome", correct: false }
    ]
  },
  {
    question: 'Qual é o impacto do plastica nos oceanos?',
    answers: [
      { text: 'plastico nos oceano pode sufucar ferir a vida marinha', correct: true },
      { text: 'O plastico se desolve rapidamente', correct: false },
      { text: 'nenhum, o plastico nao causa nenhum dano', correct: false },
      { text: "Nenhuma das alternativas", correct: false }
    ]
  },
  {
    question: 'além de promover a conservação dos ecossistemas marinhos e a gestão sustentável das zonas pesqueiras até 2020,isso aconteceu ?',
    answers: [
      { text: "falso", correct: false },
      { text: "Verdadeiro", correct: true }
    ]
  },
  {
    question: 'como reduzir os niveis de poluição nos oceanos',
    answers: [
      { text: 'usando energia renovável, e contribuindo na economia', correct: false },
      { text: 'reduzindo o uso de plastico descartaveis ', correct: true },
      { text: 'continuar com abitos de jogar lixo no mar', correct: false },
      { text: 'comprando produtos caros', correct: false }
    ]
  },
]

JSON
{
"editor.wordWrap"; "off"
}