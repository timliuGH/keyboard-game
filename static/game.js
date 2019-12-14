const phrase = document.querySelector("#phrase");
const button = document.querySelector("button");
const scoreSpan = document.querySelector("#scoreValue");
let score = 0;

const bank = ['Blueberry Jam',
'Strawberry Lemonade',
'Pineapple Pizza',
'Emperor Penguin',
'Jack Russell Terrier',
'Rotten Banana',
'Peach Cobbler',
'Grocery Store',
'Marble Counter',
'Breakfast Burrito',
'Water Bottle',
'Hiking Trail',
'Tidal Wave',
'Ghostbuster',
'Blockbuster Movie',
'Piggy Bank',
'Masking Tape',
'Wide Screen Television',
'Phone Number',
'Window Blinders',
'Movie Tickets',
'Most Definitely',
'International Travel',
'Cleaning Products',
'Water Buffalo',
'Diamond Chandelier',
'Miniature Golf',
'Important Information',
'Ancient Architecture',
'Breathable Bikini',
'Collapsible Chair',
'Delicious Dessert',
'Enormous Elephant',
'Fiesty Flamingo',
'Goodness Gracious',
'Humongous Horseradish',
'Interesting Information',
'Jungle Juice',
'Kicking Kangaroo',
'Lemon Lime Lollipop',
'Multibillionaire Mongoose',
'Normally Notorious',
'Orange Orangutan',
'Political Popsicle',
'Quarantined Quail',
'Robust Riverboat',
'Silver Stalactite',
'Tarantula Torpedo',
'Unbelievable Underwear',
'Vomiting Vampire',
'Wonderful Werewolf',
'Excellent Eggs',
'Yummy Yellow Yam',
'Zillionaire Zebra',
'Baby Octopus'];

const bankSize = bank.length;

let mins = 0.1;
let secs = mins * 60;

function countdown() {
  mins = 0.05;
  secs = mins * 60;
  setTimeout('Decrement()', 60);
}

function Decrement() {
  if (document.getElementById) {
    minutes = document.getElementById("minutes");
    seconds = document.getElementById("seconds");
    if (seconds < 59) {
      seconds.value = secs;
    } else {
      minutes.value = getMins();
      seconds.value = getSecs();
    }

    if (mins < 1 && secs == 20) {
      minutes.style.color = "red";
      seconds.style.color = "red";
    }

    if (mins == 0 && secs == 0) {
      console.log(`mins: ${mins} secs: ${secs}`);
      button.textContent = "Play Again!";
      button.addEventListener("click", countdown);
      minutes.value = 0;
      seconds.value = 0;
    } else {
      secs--;
      setTimeout('Decrement()', 1000);
    }
  }
}

function getMins() {
  mins = Math.floor(secs / 60);
  return mins;
}

function getSecs() {
  return secs - Math.round(mins * 60);
}

button.addEventListener("click", function() {
    // Initially,




    // Show/update score
    document.querySelector("#scoreDisplay").style.display = "block";
    if (button.textContent === "Next") {
        score += 1;
    // } else if (button.textContent === "Play Again!") {
    //     score = 0;
    //     button.removeEventListener("click", countdown);
    } else {
        score = 0;
    }
    scoreSpan.innerHTML = score;

    // Change button text
    button.textContent = "Next";
    button.removeEventListener("click", countdown);

    // Remove onlick
    button.onclick = null;

    document.querySelector("#timer").style.display = "block";

    // Get next phrase
    const max = Math.floor(bankSize - 1);
    const index = Math.floor(Math.random() * (max + 1));
    phrase.textContent = bank[index];
});
