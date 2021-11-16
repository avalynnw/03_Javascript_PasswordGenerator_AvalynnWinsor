// Assignment Code
var generateBtn = document.querySelector("#generate");
var copyBtn = document.querySelector("#copy");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

function generatePassword() {

  //global declarations
  let password = "null";
  let counter = 0;
  let password_length = 0;
  let password_array = [];
  let password_pool_array = [];

  //seed arrays
  let numbers_array = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
  ];
  let special_characters_array = [
    " ",
    "!",
    "\"",
    "#",
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    ".",
    "/",
    ":",
    ";",
    "<",
    "=",
    ">",
    "?", 
    "@",
    "[",
    "\\",
    "]",
    "^",
    "_",
    "`",
    "{",
    "|",
    "}",
    "~"
  ]
  let lowercase_letters_array = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ]
  let uppercase_letters_array = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ]

  //while loop to ensure a correct length is entered
  while (counter == 0) {
    password_length = prompt("How many characters would you like your password? Choose betweem 8 and 128", "");
    //if the prompt is cancelled, exits program
    if (password_length == null) {
      password = "User cancelled the prompt.";
      break;
    } 
    //if the password is the correct length, continue with the program
    if (password_length > 7 && password_length < 129) {
      counter++
      //obtain password specifications
      var contain_numbers = confirm("Will this contain numbers?");
      var special_characters = confirm("Will this contain special characters?")
      var uppercase_letters = confirm("Will this contain Uppercase letters?")
      var lowercase_letters = confirm("Will this contain Lowercase letters?");

      //if they are requested, adds the seed arrays to the password pool
      if (contain_numbers == 1) {
        password_pool_array.push(...numbers_array)
      }
      if (special_characters == 1) {
        password_pool_array.push(...special_characters_array)
      }
      if (uppercase_letters == 1) {
        password_pool_array.push(...uppercase_letters_array)
      }
      if (lowercase_letters == 1) {
        password_pool_array.push(...lowercase_letters_array)
      }

      //randomly create a password array from the password pool
      for (i=0;i<password_length;i++) {
        let random_value = password_pool_array[Math.floor(Math.random() * password_pool_array.length)];
        password_array.push(random_value);
      }

      //if the password array does not include at least one number when it was asked for, this adds one in
      if (contain_numbers == 1) {
        if (!password_array.some(r => numbers_array.includes(r))){
          const randomElement = numbers_array[Math.floor(Math.random() * numbers_array.length)];
          let removedItem = password_array.splice(-1,1);
          password_array.push(randomElement);
        }
      }

      //if the password array does not include at least one special chracter when it was asked for, this adds one in
      if (special_characters == 1) {
        if (!password_array.some(r => special_characters_array.includes(r))){
          const randomElement = special_characters_array[Math.floor(Math.random() * special_characters_array.length)];
          let removedItem = password_array.splice(-2,1);
          password_array.push(randomElement);
        }
      }

      //if the password array does not include at least one uppercase letter when it was asked for, this adds one in
      if (uppercase_letters == 1) {
        if (!password_array.some(r => uppercase_letters_array.includes(r))){
          const randomElement = uppercase_letters_array[Math.floor(Math.random() * uppercase_letters_array.length)];
          let removedItem = password_array.splice(-3,1);
          password_array.push(randomElement);
        }
      }

      //if the password array does not include at least one lowercase letter when it was asked for, this adds one in
      if (lowercase_letters == 1) {
        if (!password_array.some(r => lowercase_letters_array.includes(r))){
          const randomElement = lowercase_letters_array[Math.floor(Math.random() * lowercase_letters_array.length)];
          let removedItem = password_array.splice(-4,1);
          password_array.push(randomElement);
        }
      }

      //randomizes the password array one last time
      shuffle(password_array);
      //creates a password string from the password array
      password = password_array.join("");
    }
    else {
      counter=0;
    }
  } 



  //returns password to the function
  return password;
}


//function to shuffle an array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}


//function to copy to clipboard
function copy_to_clipboard() {
  var copyText = document.getElementById("password");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value)
  document.execCommand('copy');
  alert("Password copied to clipboard!");
}


// Add event listener to generate button and copy button
generateBtn.addEventListener("click", writePassword);
copyBtn.addEventListener('click',copy_to_clipboard);



