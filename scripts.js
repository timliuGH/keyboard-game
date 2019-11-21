const phrase = document.querySelector("#phrase");
const button = document.querySelector("button");

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
'International Travel'];

const bankSize = bank.length;

button.addEventListener("click", function() {
    const max = Math.floor(bankSize - 1);
    const index = Math.floor(Math.random() * (max + 1));
    phrase.textContent = bank[index];
});
