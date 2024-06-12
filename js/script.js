// Encapsulating the code inside an IIFE
(() => {
  const startBtn = document.querySelector(".start_btn button");
  const infoBox = document.querySelector(".info_box");
  const exitBtn = infoBox.querySelector(".buttons .quit");
  const continueBtn = infoBox.querySelector(".buttons .restart");
  const quizBox = document.querySelector(".quiz_box");
  const resultBox = document.querySelector(".result_box");
  const optionList = document.querySelector(".option_list");
  const timeLine = document.querySelector("header .time_line");
  const timeText = document.querySelector(".timer .time_left_txt");
  const timeCount = document.querySelector(".timer .timer_sec");
  const nextBtn = document.querySelector("footer .next_btn");
  const bottomQuesCounter = document.querySelector("footer .total_que");
  const quitQuizBtn = resultBox.querySelector(".buttons .quit");

  let timeValue = 15;
  let queCount = 0;
  let queNumb = 1;
  let userScore = 0;
  let counter;
  let counterLine;
  let widthValue = 0;

  const tickIconTag =
    '<div class="icon tick"><i class="fas fa-check"></i></div>';
  const crossIconTag =
    '<div class="icon cross"><i class="fas fa-times"></i></div>';

  const randomQuestions = shuffle(questions);

  // Event Listeners
  startBtn.addEventListener("click", () => {
    startBtn.classList.add("hideBtn");
    infoBox.classList.add("activeInfo");
  });

  exitBtn.addEventListener("click", () => {
    startBtn.classList.remove("hideBtn");
    infoBox.classList.remove("activeInfo");
  });

  continueBtn.addEventListener("click", () => {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(timeValue);
    startTimerLine(0);
  });

  quitQuizBtn.addEventListener("click", () => {
    window.location.reload();
  });

  nextBtn.addEventListener("click", () => {
    if (queCount < 3) {
      queCount++;
      queNumb++;
      showQuestions(queCount);
      queCounter(queNumb);
      clearInterval(counter);
      clearInterval(counterLine);
      startTimer(timeValue);
      startTimerLine(widthValue);
      timeText.textContent = "Time Left";
      nextBtn.classList.remove("show");
    } else {
      clearInterval(counter);
      clearInterval(counterLine);
      showResult();
    }
  });

  // Shuffle questions
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  // Show questions
  function showQuestions(index) {
    const queText = document.querySelector(".que_text");
    const question = questions[index];
    const options = question.options
      .map((option) => `<div class="option"><span>${option}</span></div>`)
      .join("");

    queText.innerHTML = `<span>${question.question}</span>`;
    optionList.innerHTML = options;

    const optionsElements = optionList.querySelectorAll(".option");
    optionsElements.forEach((option) => {
      option.setAttribute("onclick", "optionSelected(this)");
    });
  }

  // Option selected
  window.optionSelected = function (answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    const userAns = answer.textContent;
    const correctAns = questions[queCount].answer;
    const allOptions = optionList.children.length;

    if (userAns == correctAns) {
      userScore++;
      answer.classList.add("correct");
      answer.insertAdjacentHTML("beforeend", tickIconTag);
    } else {
      answer.classList.add("incorrect");
      answer.insertAdjacentHTML("beforeend", crossIconTag);
      [...optionList.children].forEach((option) => {
        if (option.textContent == correctAns) {
          option.classList.add("correct");
          option.insertAdjacentHTML("beforeend", tickIconTag);
        }
      });
    }

    [...optionList.children].forEach((option) => {
      option.classList.add("disabled");
    });

    nextBtn.classList.add("show");
  };

  // Show result
  function showResult() {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");
    const scoreText = resultBox.querySelector(".score_text");
    const scoreTag =
      userScore >= 2
        ? `<span>Congratulations 🎉 🎉, You got <p>${userScore}</p> out of <p>4</p></span> <p>You are now eligible to try our mystery box, good luck!</p>`
        : `<span>Oops ☹. You got only <p>${userScore}</p> out of <p>4</p></span><p>Sorry, you didn't pass. It’s time for you to learn more about Amirá!</p>`;
    scoreText.innerHTML = scoreTag;
  }

  // Start timer line
  function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
      timeCount.textContent = time; //changing the value of timeCount with time value
      time--; //decrement the time value
      if (time < 9) {
        //if timer is less than 9
        let addZero = timeCount.textContent;
        timeCount.textContent = "0" + addZero; //add a 0 before time value
      }
      if (time < 0) {
        //if timer is less than 0
        clearInterval(counter); //clear counter
        timeText.textContent = "Time Off"; //change the time text to time off
        const allOptions = option_list.children.length; //getting all option items
        let correcAns = questions[que_count].answer; //getting correct answer from array
        for (i = 0; i < allOptions; i++) {
          if (option_list.children[i].textContent == correcAns) {
            //if there is an option which is matched to an array answer
            option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
            option_list.children[i].insertAdjacentHTML(
              "beforeend",
              tickIconTag
            ); //adding tick icon to matched option
            console.log("Time Off: Auto selected correct answer.");
          }
        }
        for (i = 0; i < allOptions; i++) {
          option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
        }
        next_btn.classList.add("show"); //show the next button if user selected any option
      }
    }
  }

  function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
      time += 1; //upgrading time value with 1
      time_line.style.width = time + "px"; //increasing width of time_line with px by time value
      if (time > 549) {
        //if time value is greater than 549
        clearInterval(counterLine); //clear counterLine
      }
    }
  }

  function queCounter(number) {
    // Question counter logic here
  }
})();
