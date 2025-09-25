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
const duration = 10_000;
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

const imageUrls = [
  `${IMG_PATH}start-w-shadow-12.png`,
  `${IMG_PATH}bottom-right-ogo.svg`,
  `${IMG_PATH}header.svg`,
  `${IMG_PATH}header-22.svg`,
  `${IMG_PATH}heart.png`,
  `${IMG_PATH}next-btn.svg`,
  `${IMG_PATH}GAME copy-09.png`,
  `${IMG_PATH}main-img3.svg`,
  `${IMG_PATH}GAME copy-14.png`,
  `${IMG_PATH}main-img-4.png`,
  `${IMG_PATH}GAME copy-11.png`,
  `${IMG_PATH}bottom-logo.svg`,
  `${IMG_PATH}bottom-logo-2.svg`,
  `${IMG_PATH}GAME copy-13.png`,
  `${IMG_PATH}GAME copy-12.png`,
  `${IMG_PATH}try-again.svg`,
  `${IMG_PATH}GAME copy-10.png`,
  `${IMG_PATH}GAME copy-07.png`,
  `${IMG_PATH}GAME copy-08.png`,
  `${IMG_PATH}building.png`,
  `${IMG_PATH}bg_start.png`,
  `${IMG_PATH}bg-game.png`,
];

const QUESTION_DETAILS = {
  question1: {
    reference: `Mach F, et al. 2019 ESC/EAS Guidelines for the management of dyslipidaemias: lipid modification to reduce
cardiovascular risk. Eur Heart J. 2020;41(1):111-88.`,
    headerImg: `${IMG_PATH}GAME copy-11.png`,
    question: `According to the ESC Guidelines, what is the
recommended LDL-C goal for patients with
established CVD?`,
    answers: [
      `&lt;100MG/DL(2.6MMOL/L)
`,
      `&lt;70M/DL (1.8MMOL/L)`,
      `&lt;55MG/DL (1.4MMOL/L) AND ≥50% REDUCTION FROM BASELINE`,
      `&lt;40 M/DL (1.0MMOL/L)`,
    ],
    correctAnswerIndex: 2,
  },
  question2: {
    reference: `Albackr HB et al.The Gulf Achievement of Cholesterol Targets in Out-Patients Study (GULF ACTION):
Design, Rationale, and Preliminary Results. Curr Vasc Pharmacol. 2023;21(4):285-292.
doi: 10.2174/1570161121666230710145604. PMID: 37431901`,
    headerImg: `${IMG_PATH}GAME copy-10.png`,
    question: `What percentage of patients in secondary prevention
fail to reach their LDL-C targets according to the Gulf
Action Study:`,
    answers: ["25%", "40%", "60%", "75%"],
    correctAnswerIndex: 3,
  },
  question3: {
    reference: `Mach F, et al. 2019 ESC/EAS Guidelines for the management of dyslipidaemias:
lipid modification to reduce cardiovascular risk. Eur Heart J. 2020;41(1):111-88.`,
    headerImg: `${IMG_PATH}GAME copy-11.png`,
    question: `Using the Guideline-provided estimates of the
LDL-C-lowering benefit of recommended lipid-lowering
regimens, what is the estimated total LDL-C reduction
with statin + ezetimibe + PCSK9 Inhibitor`,
    answers: ["~50%", "~65%", "~85%", "~45%"],
    correctAnswerIndex: 2,
  },
  question4: {
    reference: `Sabatine MS, et al. N Engl J Med. 2017;376:1713-1722.
Giugliano RP, et al. Lancet 2017; 390:1962-1971.`,
    headerImg: `${IMG_PATH}GAME copy-10.png`,
    question: `What did the FOURIER trial show about LDL-C levels
and cardiovascular risk in patients with established
ASCVD?`,
    answers: [
      `LOWERING LDL-C BELOW 100M/DL SHOWS NO ADDITIONAL CV RISK REDUCTION`,
      `CV RISK INCREASES WHEN LDL-C GOES BELOW 25MG/DL`,
      `THE LOWER THE LDL-C ACHIEVED WITH ADDITION OF REPATHA , THE GREATER THE CV
RISK REDUCTIONWITH NO FLOOR TO BENEFIT.`,
      `LDL-C SHOULD NOT BE REDUCED BELOW 50MG/DL.`,
    ],
    correctAnswerIndex: 2,
  },
  question5: {
    reference: `Clin Cardiol. 2014 Apr;37(4):195-203. doi: 10.1002/clc.22252. Epub 2014 Jan 30. PMID: 24481874; PMCID: PMC66495822.`,
    headerImg: `${IMG_PATH}GAME copy-07.png`,
    question: `Based on LAPLACE study , When added to statin
therapy, how much additional LDL-C reduction can
Repatha provide?`,
    answers: [`~25%`, `~50%`, `~60%`, `~75%`],
    correctAnswerIndex: 3,
  },
  question6: {
    reference: `Mach F, et al. 2019 ESC/EAS Guidelines for the management of dyslipidaemias:
lipid modification to reduce cardiovascular risk. Eur Heart J. 2020;41(1):111-88.`,
    headerImg: `${IMG_PATH}GAME copy-08.png`,
    question: `According to the ESC guidelines, why is it crucial to
initiate lipid-lowering therapy like Repatha early after a
recent myocardial infarction?`,
    answers: [
      "BECAUSE CHOLESTEROL LEVELS STABILIZE ONLY AFTER 6 MONTHS",
      "EARLY INITIATION LEADS TO FASTER ACHIEVEMENT OF LDL-C TARGETS AND IMPROVEDOUTCOMES",
      "TO REDUCE MEDICATION COSTS OVER TIME",
      "BECAUSE LIFESTYLE CHANGES TAKE YEARS TO SHOW EFFECT",
    ],
    correctAnswerIndex: 1,
  },
  question7: {
    reference: `Koskinas, C.K., Windecker S., Pedrazzini G., Mueller C., Cook S.,
Matter C.M., et al. J Am Coll Cardiol 74(20), pp. 2452-2462.`,
    headerImg: `${IMG_PATH}GAME copy-07.png`,
    question: `In the Evopacs study, what percentage of ACS patients
achieved the LDL-C targets of &lt;55m/dl after just one
month of initiating Repatha?`,
    answers: ["45%", "65%", "75%", "90%"],
    correctAnswerIndex: 3,
  },
  question8: {
    reference: `Chen H, Chen X. Front Cardiovasc Med. 2023;10:1138787`,
    headerImg: `${IMG_PATH}GAME copy-08.png`,
    question: `What are the key Benefits of initiating PCSK9-Inhibitors
like Repatha early in patients with a recent myocardial
infarction (MI)?`,
    answers: [
      `RAPID LDL-C REDUCTION AND DELAYED PLAQUE REGRESSION`,
      `ACHIEVEMENT OF LDL-C TARGETS`,
      `RAPID LDL-C REDUCTION, EARLY LDL-C TARGET ACHIEVEMENT , PLAQUE STABILIZATION
ANDCARDIOVASCULAR RISK REDUCTION`,
    ],
    correctAnswerIndex: 2,
    isThreeOptions: true,
  },
  question9: {
    reference: `Kasichayanula, S., Grover, A., Emery, M.G. et al. Clinical Pharmacokinetics and Pharmacodynamics of Evolocumab,
a PCSK9 Inhibitor. Clin Pharmacokinet 57, 769-779 (2018). <a href="https://doi.org/10.1007/s40262-017-0620-7" target="_blank" class="ref-link">https://doi.org/10.1007/s40262-017-0620-7.</a>`,
    headerImg: `${IMG_PATH}GAME copy-07.png`,
    question: `How soon after the first dose does Repatha achieve
maximum LDL-C reduction?`,
    answers: ["1 day", "4 weeks", "7 days", "2 weeks"],
    correctAnswerIndex: 2,
  },
};

const INFO_MAPPER = {
  4: {
    reference: "Sabatine MS et al. N Engl J Med 2017;376:1713-1722.",
    topLightHeader: "For Adult Patients With Established CVD",
    topBoldHeader: ["WE NEED TO DO BETTER TO", "REDUCE THE RISK OF CV EVENTS"],
    mainTextBold: "LOWEST IS BEST",
    mainTextLight: `DON'T WAIT ACT NOW. <br> ADD REPATHA<sup>®</sup>`,
    bottomLightText: `Get your patients to the LDL-C target to protect them from another MI tomorrow<sup>1</sup>`,
    imgSrc: `${IMG_PATH}heart.png`,
  },
  9: {
        reference: `Repatha<sup>®</sup> (evolocumab) prescribing information, Amgen. Sabatine MS et al. N Engl J Med 2017;376:1713-1722.`,
    topLightHeader: "For Adult Patients With Recent CV Events The Race Against Time",
    topBoldHeader: ["TO REDUCE RISK OF AN MI, STROKE,", `OR CORONARY REVASCULARIZATION<sup>1</sup>`],
    mainTextBold: "EARLIER IS BETTER",
    mainTextLight: `DON'T WAIT ACT NOW. <br> ADD REPATHA<sup>®</sup>`,
    bottomLightText: `Get your patients to the LDL-C target to protect
them from another MI<sup>2</sup>`,
    imgSrc: `${IMG_PATH}building.png`,
  },
};




