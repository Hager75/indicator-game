// variableds
const BODY = document.getElementById("main-body");
const START_PAGE = document.querySelector(".start-page");
const START_BTN = document.querySelector(".start_btn");
const GAME_PAGE = document.querySelector(".game-page");
const NEXT_BTN = document.querySelectorAll(".next-btn");
const NEXT_INFO_BTN = document.querySelector(".next-info-btn");
const FIRST_INFO_CONTAINER = document.querySelector(".first-info");
const QUESTION_TEXT = document.querySelector(".question-text");
const QUESTION_IMG = document.querySelector(".question-image");
const REFERENCE = document.querySelector(".reference");
const REFERENCE_CONTAINER = document.querySelector(".ref");
const QUESTIONS_HEADER = document.querySelector(".header-blue__text");
const ANSWERS_CONTAINER = document.querySelector(".answers-container");
const ANSWERS_TEXT = ANSWERS_CONTAINER.querySelectorAll(".answer__text");
const INDICATOR = document.querySelector(".increase-indicator");
const HOME_ROUND_CONTAINER = document.querySelector(".home-round-container");
const GAME_HEADER_CONTAINER = document.querySelector(".game__header");
const INFO_CONTAINER = document.querySelector(".info");
const QUESTION_ANSWERS_CONTAINER = document.querySelector(".q-graph-container");
const ITEMS_FIRST_ROUND = document.querySelectorAll(".gameItem-roundOne");
const ITEMS_SECOND_ROUND = document.querySelectorAll(".gameItem-roundTwo");
const ANSWER_ITEMS = ANSWERS_CONTAINER.querySelectorAll(".answer-item");
const CORRECT_SOUND = new Audio("./sounds/correct.mp3");
const ERROR_SOUND = new Audio("./sounds/wrong.mp3");
const WIN_SOUND = new Audio("./sounds/win.mp3");
const LOSE_SOUND = new Audio("./sounds/lose.mp3");

const INFO_TEXT_TOP_LIGHT = document.querySelector(".game__header--light");
const INFO_TEXT_TOP_BOLD = document.querySelectorAll(".game__header--bold");
const INFO_IMG_ICON = document.querySelector(".info_heart-img img");
const INFO_MAIN_TEXT_BOLD = document.querySelector(".info__text--bold");
const INFO_MAIN_TEXT_LIGHT = document.querySelector(".info__text--light");
const INFO_TEXT_BOTTOM = document.querySelector(".info-bottom");
const ROUNDE_GAME_CONTAINER = document.querySelector(".game__main");
const RESULT_PAGE  = document.querySelector(".result-page");
const LOSER  = document.querySelector(".result-lose");
const WINNER  = document.querySelector(".result-win");
const TRY_AGAIN  = document.querySelector(".try-again-container img");

let currentPage = 1;
const duration = 30_000;
let startTime = 0;
let pausedTime = 0;
let paused = false;
let pauseStart = 0;
let rafId;
let lowerTimeout;
let gameEnded = false;
let currentQuestionPage = 0;
let correctCountAnswers = 0;
let loadedCount = 0;
const IMG_PATH = "./images/";



