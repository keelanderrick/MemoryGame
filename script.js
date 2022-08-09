const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    newDiv.style.backgroundColor = "white";

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


let selected = "none" // current game state
let firstSelected;    // first card clicked
let matched = 0       // current number of matches

function handleCardClick(event) {
  var clicked = event.target
  if(clicked.style.backgroundColor === "white") { // if we clicked on an unselected tile, proceed, preventing clicking the same tile twice
    if(selected === "none") { // if no tile is currently selected 
      selected = clicked.className; // then we'll set current game state to the color clicked
      firstSelected = clicked;  // , set the clicked tile to be the selected tile
      clicked.style.backgroundColor = clicked.className; // and change the color of clicked tile

    } else if (selected === event.target.className) { // if the selected tile's color matches the currently selected color
      selected = "none";  // reset game state to having no tile selected
      clicked.style.backgroundColor = clicked.className; // update the color of the clicked tile
      matched += 2; // increment the number of matches
      if(matched === 10) { // check for game over
        console.log("You win!")
      }
    } else if (selected === "timeout") { // if we're in a timeout state, do nothing
      console.log("timeout");
    } else {  // if the tile we clicked on was unselected and not a match and we already had a tile selected
      selected = "timeout"; // we'll change the game state to timeout
      clicked.style.backgroundColor = clicked.className; // update the color of the clicked tile
      setTimeout(function() { // then, 1 second later, reset the game state so that no tile is selected, and reset the color of the two clicked tiles to w hite
        selected = "none";
        clicked.style.backgroundColor = "white"
        firstSelected.style.backgroundColor = "white"
      }, 1000)
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */