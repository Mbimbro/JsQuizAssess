window.addEventListener('DOMContentLoaded', () => {
    const start = document.querySelector('#start');
    const quizBlock = document.querySelector('#quizBlock');
    const submitButton = document.querySelector('#btnSubmit');
    const resetButton = document.querySelector('#btnReset');
    const timeElement = document.querySelector('#time');
    const scoreElement = document.querySelector('#score');
   
    
    //set the duration of the quiz in seconds
    const quizDuration = 60;
    let timeRemaining = quizDuration;
    let countdownInterval;

    start.addEventListener('click', function (e) {
      document.querySelector('#quizBlock').style.display = 'block';
      start.style.display = 'none';
    
    //start the countdown timer
    countdownInterval = setInterval(updateTime, 1000);
    });

    //function to update the time remaining
    const updateTime = () => {
        if(timeRemaining > 0) {
            timeRemaining --;
            timeElement.innerText = formatTime(timeRemaining);
        } else {
            //End the quiz when time is up
            clearInterval(countdownInterval);
            timeElement.style.color = 'red';
            timeElement.innerText = 'Sorry, Time is up!';
            calculateScore();
            highlightCorrectAnswers();
        }
    };

    // Function to format the time as mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

    // Submit button event listener
  submitButton.addEventListener('click', () => {
    calculateScore();
  });

  // Reset button event listener
  resetButton.addEventListener('click', () => {
    location.reload();
  });
    // quizArray QUESTIONS & ANSWERS
    // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
    // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
    const quizArray = [
      {
        q: 'Which is the third planet from the sun?',
        o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
        a: 1, // array index 1 - so Earth is the correct answer here
      },
      {
        q: 'Which is the largest ocean on Earth?',
        o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        a: 3,
      },
      {
        q: 'What is the capital of Australia?',
        o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
        a: 1,
      },
      {
        q: "Which is the highest number on a standard roulette wheel?",
        o: ["22", "24", "32", "36"],
        a: 3,
      },
      {
        q: "What is the standard distance between the target and archer in Olympics?",
        o: ["50 meters", "70 meters", "100 meters", "120 meters"],
        a: 1,
      }
    ];
    
    // Function to display the quiz questions and answers from the object
    const displayQuiz = () => {
      const quizWrap = document.querySelector('#quizWrap');
      let quizDisplay = '';
      quizArray.map((quizItem, index) => {
        quizDisplay += `<ul class="list-group">
                       Q - ${quizItem.q}
                        <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                        <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                        <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                        <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                        </ul>
                        <div>&nbsp;</div>`;
        quizWrap.innerHTML = quizDisplay;
      });
    };
    

    // Calculate the score
const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        let liElement = document.querySelector('#' + li);
        let radioElement = document.querySelector('#' + r);
  
        if (quizItem.a == i) {
          liElement.classList.add('correct-answer');
        }
        if (radioElement.checked) {
            // Code for task 1 goes here
            console.log('Answer checked', li);
            if (quizItem.a == i) {
              score++;
            } else {
              liElement.classList.add('wrong-answer');
            }
          }
        }
        
      });
    
    scoreElement.innerHTML = 'Your Score is : ' + score + '/' + quizArray.length;
//console.log('Score', score); 
};
  
    
    // Call the displayQuiz function
    displayQuiz();
  });
  