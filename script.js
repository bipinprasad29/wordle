let getid = (id) => document.getElementById(id);

let inputWord = getid("input"),
  btn = getid("btn"),
  gamestatus = getid("gamestatus"),
  resetbtn = getid("reset");

let win = false;
let count = 0;
const WORD_LENGTH = 5;
let attempt = 0;
let dictionary, randomWord;

(async () => {
  const data = await fetch("/word.json");
  const res = await data.json();
  dictionary = [...res];
  randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];
})();

const gameStatus = () => {
  win
    ? (gamestatus.innerHTML = "You Won")
    : (gamestatus.innerHTML = "You Lose Try Again");
};

const handleClick = () => {
  if (inputWord.value === "" || win === true || inputWord.value.length < 5)
    return;
  console.log(randomWord);
  let rightWord = 0;
  let randomWordArr = [...randomWord.toLowerCase()],
    inputWordArr = [...inputWord.value.toLowerCase()];
  let col = document.querySelectorAll(".col");
  for (i = 0; i < inputWordArr.length; i++) {
    col[i + count].innerHTML = inputWordArr[i];

    if (inputWordArr[i] === randomWordArr[i]) {
      col[i + count].classList.add("correct");
      rightWord++;
    } else if (randomWordArr.includes(inputWordArr[i])) {
      col[i + count].classList.add("wrong-loacation");
    } else {
      col[i + count].classList.add("wrong");
    }
  }
  if (rightWord === 5) {
    for (i = 0; i < inputWordArr.length; i++) {
      win = true;
      col[i + count].classList.add("win");
    }
  }
  count += 5;

  if ((count == 30 && win === false) || win === true) {
    gameStatus();
  }
  inputWord.value = "";
};

const resetbtnlogic = () => {
  let col = document.querySelectorAll(".col");
  let correct = document.querySelectorAll(".correct");
  let wrong = document.querySelectorAll(".wrong");
  let wronglocation = document.querySelectorAll(".wrong-loacation");
  gamestatus.innerHTML = "";
  col.forEach((elm, ind) => {
    correct[ind] ? correct[ind].classList.remove("correct") : "";
    wrong[ind] ? wrong[ind].classList.remove("wrong") : "";
    wronglocation[ind]
      ? wronglocation[ind].classList.remove("wrong-loacation")
      : "";
    elm.innerHTML = " ";
  });

  randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];
  count = 0;
  win = false;
};

btn.addEventListener("click", () => handleClick());

window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleClick();
  }
});
resetbtn.addEventListener("click", () => resetbtnlogic());
