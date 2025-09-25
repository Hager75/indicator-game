// show loader and hide it
function toggleLoader(show) {
  show ? BODY.classList.remove("loaded") : BODY.classList.add("loaded");
}

function showHidePages(pageWillHide, pageWillShow, displayType = "flex") {
  pageWillShow.style.display = displayType;
  pageWillHide.style.display = "none";
}

function startSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function gotoNextPage() {
  switch (currentPage) {
    case 1:
      HOME_ROUND_CONTAINER.style.display = "flex";
      GAME_HEADER_CONTAINER.style.display = "flex";
      ITEMS_FIRST_ROUND.forEach((item) => {
        item.style.display = "flex";
      });
      showHidePages(START_PAGE, GAME_PAGE, "block");
      break;
    case 2:
      showHidePages(HOME_ROUND_CONTAINER, QUESTION_ANSWERS_CONTAINER);
      startTimer();
      currentQuestionPage++;
      break;
    case 8:
      showHidePages(HOME_ROUND_CONTAINER, QUESTION_ANSWERS_CONTAINER);
      resumeIndicator();
      currentQuestionPage++;
      document.querySelector(".success")?.classList?.remove("success");
      document.querySelector(".error")?.classList?.remove("error");
      const nextKey = `question${currentQuestionPage}`;
      const nextQuestion = QUESTION_DETAILS[nextKey];
      updateQuestionUI(nextQuestion);
      enableAnswers();
      break;
    default:
      break;
  }
  console.log(currentPage);

  currentPage++;
}

function goToNextRound() {
  if (currentQuestionPage === 4) {
    currentPage++;
    HOME_ROUND_CONTAINER.style.display = "flex";
    GAME_HEADER_CONTAINER.style.display = "flex";
    ITEMS_FIRST_ROUND.forEach((item) => {
      item.style.display = "none";
    });
    ITEMS_SECOND_ROUND.forEach((item) => {
      item.style.display = "flex";
    });

    INFO_CONTAINER.style.display = "none";
    ROUNDE_GAME_CONTAINER.classList.add("round-two");
    REFERENCE.innerHTML = `Mach F, et al. 2019 ESC/EAS Guidelines for the management of dyslipidaemias:
  lipid modification to reduce cardiovascular risk. Eur Heart J. 2020;41(1):111-88.`;
    REFERENCE_CONTAINER.classList.remove("info-ref");
  } else {
    endQuiz();
  }
}

// event listeners

NEXT_INFO_BTN.addEventListener("click", goToNextRound);
TRY_AGAIN.addEventListener("click", () => {
  location.reload();
});

START_BTN.addEventListener("click", gotoNextPage);

NEXT_BTN.forEach((btn) => {
  btn.addEventListener("click", gotoNextPage);
});

ANSWER_ITEMS.forEach((answer, index) => {
  answer.addEventListener("click", () => {
    checkAnswer(index);
  });
});

// indicator functions

function startTimer() {
  startTime = performance.now();
  pausedTime = 0;
  rafId = requestAnimationFrame(animate);
}

function animate(now) {
  if (paused) {
    rafId = requestAnimationFrame(animate);
    return;
  }

  const elapsed = now - startTime - pausedTime;
  const progress = Math.min(elapsed / duration, 1); // 0 → 1
  INDICATOR.style.height = progress * 100 + "%";

  if (progress < 1) {
    rafId = requestAnimationFrame(animate);
  } else if (!gameEnded) {
    setTimeout(() => {
      cancelAnimationFrame(rafId);
      gameEnded = true;
      endQuiz();
    }, 500);
  }
}

function pauseIndicator() {
  paused = true;
  pauseStart = performance.now();
}

function resumeIndicator() {
  paused = false;
  pausedTime += performance.now() - pauseStart;
  rafId = requestAnimationFrame(animate);
}

function lowerIndicator() {
  const targetPercent = 10; // Always drop to 10%
  cancelAnimationFrame(rafId);
  clearTimeout(lowerTimeout);
  INDICATOR.style.height = `${targetPercent}%`;

  const now = performance.now();
  pausedTime = 0;
  startTime = now - (targetPercent / 100) * duration;

  lowerTimeout = setTimeout(() => {
    rafId = requestAnimationFrame(animate);
  }, 500); // adjust delay to match your CSS transition duration
}

function checkAnswer(index) {
  currentPage++;
  const questionKey = `question${currentQuestionPage}`;
  const question = QUESTION_DETAILS[questionKey];
  if (!question) return;

  disableAnswers();

  const correctIndex = question.correctAnswerIndex;
  const isCorrect = index === correctIndex;

  handleAnswerFeedback(index, correctIndex, isCorrect);
  setTimeout(() => goToNextQuestion(index, correctIndex), 1000);
}

/* ---------------- Helper Functions ---------------- */

function disableAnswers() {
  ANSWER_ITEMS.forEach((item) => item.classList.add("disabled"));
}

function enableAnswers() {
  ANSWER_ITEMS.forEach((item) => item.classList.remove("disabled"));
}

function handleAnswerFeedback(selectedIndex, correctIndex, isCorrect) {
  if (isCorrect) {
    lowerIndicator();
    startSound(CORRECT_SOUND);
    ANSWER_ITEMS[selectedIndex].classList.add("success");
    correctCountAnswers++;
  } else {
    startSound(ERROR_SOUND);
    ANSWER_ITEMS[correctIndex].classList.add("success");
    ANSWER_ITEMS[selectedIndex].classList.add("error");
  }
}

function clearAnswerFeedback(selectedIndex, correctIndex) {
  ANSWER_ITEMS[correctIndex].classList.remove("success");
  ANSWER_ITEMS[selectedIndex].classList.remove("error");
}

function showInfoPage() {
  HOME_ROUND_CONTAINER.style.display = "none";
  GAME_HEADER_CONTAINER.style.display = "none";
  QUESTION_ANSWERS_CONTAINER.style.display = "none";
  INFO_CONTAINER.style.display = "flex";
  REFERENCE.innerHTML = INFO_MAPPER[currentQuestionPage].reference;
  INFO_TEXT_TOP_LIGHT.innerHTML =
    INFO_MAPPER[currentQuestionPage].topLightHeader;
  INFO_TEXT_TOP_BOLD.forEach((item, i) => {
    item.innerHTML = INFO_MAPPER[currentQuestionPage].topBoldHeader[i];
  });
  INFO_MAIN_TEXT_BOLD.innerHTML = INFO_MAPPER[currentQuestionPage].mainTextBold;
  INFO_MAIN_TEXT_LIGHT.innerHTML =
    INFO_MAPPER[currentQuestionPage].mainTextLight;
  INFO_TEXT_BOTTOM.innerHTML = INFO_MAPPER[currentQuestionPage].bottomLightText;
  INFO_IMG_ICON.src = INFO_MAPPER[currentQuestionPage].imgSrc;
  REFERENCE_CONTAINER.classList.add("info-ref");
}

function goToNextQuestion(selectedIndex, correctIndex) {
  if (gameEnded) {
    endQuiz();
    return;
  }
  if (!gameEnded && (currentQuestionPage === 9 || currentQuestionPage === 4)) {
    showInfoPage();
    pauseIndicator();
    return;
  }
  clearAnswerFeedback(selectedIndex, correctIndex);

  currentQuestionPage++;
  const nextKey = `question${currentQuestionPage}`;
  const nextQuestion = QUESTION_DETAILS[nextKey];
  updateQuestionUI(nextQuestion);
  enableAnswers();
}

function updateQuestionUI(question) {
  QUESTION_IMG.src = question.headerImg;
  QUESTIONS_HEADER.textContent = question.question;
  REFERENCE.innerHTML = question.reference;

  if(question.isThreeOptions){
    ANSWER_ITEMS[3].classList.add('hidden');
  }else {
    ANSWER_ITEMS[3].classList.remove('hidden');
  }
  ANSWER_ITEMS.forEach((item, i) => {
    item.querySelector(".answer__text").textContent = question.answers[i];
  });
}

function endQuiz() {
  rafId && cancelAnimationFrame(rafId);
  lowerTimeout && clearTimeout(lowerTimeout);
  if (correctCountAnswers > 4) {
    showHidePages(LOSER, WINNER);
  } else {
    showHidePages(WINNER, LOSER);
  }
  showHidePages(GAME_PAGE, RESULT_PAGE, "block");
}


document.addEventListener("DOMContentLoaded", () => {
  toggleLoader(true);
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
    img.onload = img.onerror = () => {
      loadedCount++;
      if (loadedCount === imageUrls.length) {
        toggleLoader(false);
      }
    };
  });
});