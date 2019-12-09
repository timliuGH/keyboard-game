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

button.addEventListener("click", function() {
    // Show/update score
    document.querySelector("#scoreDisplay").style.display = "block";
    if (button.textContent === "Next") {
        score += 1;
    } else {
        score = 0;
    }
    scoreSpan.innerHTML = score;

    // Change button text
    button.textContent = "Next";

    // Get next phrase
    const max = Math.floor(bankSize - 1);
    const index = Math.floor(Math.random() * (max + 1));
    phrase.textContent = bank[index];
});
