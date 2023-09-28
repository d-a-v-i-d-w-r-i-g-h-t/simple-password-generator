// Assignment Code (moving passwordText to global)
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");

// Add event listener to generate button
// this click starts the application
generateBtn.addEventListener("click", writePassword);


// Add event listener for <textarea> focus
// When <textarea> #password gets focus (after password creation), select all text
// This allows user to more easily copy the generated password
passwordText.addEventListener("focus", function() {
  passwordText.select();
});


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  if (password === null) {
    return;
  }
 // var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// main function returns generated password
// contains object variable with criteria and potential contents
// directs request for user input for various criteria
function generatePassword() {
  
  // object variable to contain user-selected password criteria, character contents, and character type
  var passwordCriteria = {
    lowercase: {
      inUse: false,
      content: "abcdefghijklmnopqrstuvwxyz",
      characterType: "lowercase"
    },
    uppercase: {
      inUse: false,
      content: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      characterType: "uppercase"
    },
    numeric: {
      inUse: false,
      content: "0123456789",
      characterType: "numeric"
    },
    special: {
      inUse: false,
      content: "!@#$%^&*()_+-=[]{}|;:,.<>?/~",
      characterType: "special"
    },
    passwordLength: 0
  }
  
  // using const o for passwordCriteria to make usage more clear and readable
  const o = passwordCriteria;


  // if getPasswordLength returns a null, the application will be terminated using these null checks
  o.passwordLength = getPasswordLength();
  if (o.passwordLength === null) {
    return null;
  }
  
  // set boolean for each character type passed as argument in choosePasswordCriteria
  var msg = "You must select at least one character type. Please try again.";
  var selectAtLeastOne = false;
  while (selectAtLeastOne === false) {
    o.lowercase.inUse = choosePasswordCriteria(o.lowercase.characterType, o.lowercase.content);
    o.uppercase.inUse = choosePasswordCriteria(o.uppercase.characterType, o.uppercase.content);
    o.numeric.inUse = choosePasswordCriteria(o.numeric.characterType, o.numeric.content);
    o.special.inUse = choosePasswordCriteria(o.special.characterType, o.special.content);
    if (o.lowercase.inUse ||
        o.uppercase.inUse ||
        o.numeric.inUse ||
        o.special.inUse === true) {
      selectAtLeastOne = true;
    } else {
      window.alert(msg);
    }
  }

  // ensure every selected character type is used at least once
  // add a random character to initialCharacters for each in-use character type
  // create a string with all in-use password characters for later use
  const emptyString = "";
  var initialCharacters = emptyString
  var allInUseCharacters = emptyString
  if (o.lowercase.inUse) {
    initialCharacters = initialCharacters + getRandomCharacter(o.lowercase.content);
    allInUseCharacters = allInUseCharacters + o.lowercase.content;
  }
  if (o.uppercase.inUse) {
    initialCharacters = initialCharacters + getRandomCharacter(o.uppercase.content);
    allInUseCharacters = allInUseCharacters + o.uppercase.content;
  }
  if (o.numeric.inUse) {
    initialCharacters = initialCharacters + getRandomCharacter(o.numeric.content);
    allInUseCharacters = allInUseCharacters + o.numeric.content;
  }
  if (o.special.inUse) {
    initialCharacters = initialCharacters + getRandomCharacter(o.special.content);
    allInUseCharacters = allInUseCharacters + o.special.content;
  }

  // calculate how many more characters are needed to complete password
  var numRemainingCharacters = o.passwordLength - initialCharacters.length;
  
  var buildPassword = initialCharacters;
  // add additional characters until length is correct
  // characters are randomly selected from string of all in-use characters
  for (var i = 0; i < numRemainingCharacters; i++) {
    buildPassword = buildPassword + getRandomCharacter(allInUseCharacters);
  }
  buildPassword = randomizeString(buildPassword);
  
  return buildPassword;
}

// takes an input string and builds a new randomized string
// by randomly taking one character at a time from input string
function randomizeString(inputStr) {
  var numChars = inputStr.length;
  var randomChar;
  var randomizedString = "";
  for (var i = 0; i < numChars; i++) {
    randomChar = getRandomCharacter(inputStr);
    randomizedString = randomizedString + randomChar;
    inputStr = inputStr.replace(randomChar,"");
  }
  return(randomizedString);
}

// generate a random index based on the string length
// get a single character from the input string
function getRandomCharacter(inputString) {
  var randomIndex = Math.floor(Math.random() * inputString.length);
  var randomCharacter = inputString[randomIndex];
  return randomCharacter;
}

// prompt user to confirm a given character type and return a boolean
// desired character type is passed as an argument, along with character type example
function choosePasswordCriteria(charType, charContent) {
  var msg = `Would you like your password to contain ${charType} characters?\n\n`;
  msg = msg + charContent;
  return window.confirm(msg);
}


// prompt user for a password length, perform data validation
// if input is invalid, inform user why and reprompt for input
function getPasswordLength() {
  const minLength = 8;
  const maxLength = 128
  var msgPrompt = "Welcome to the Password Generator\n\n";
  msgPrompt = `${msgPrompt}Please enter the desired password length,\n`;
  msgPrompt = `${msgPrompt}from ${minLength} to ${maxLength} characters for maximum security.`;
  var msgTooSmall = "Your entry is too small, please try again.";
  var msgTooLarge = "Your entry is too large, please try again.";
  var msgNaN = "Your entry is not a number, please try again.";
  var userInput;

  // while-loop repeats until user enters an appropriate numeric value
  var entryIsValid = false;
  while (entryIsValid === false) {
    userInput = window.prompt(msgPrompt);
    // selecting Cancel returns null which ultimately exits out of application
    // check if input is not a number, too large, or too small
    // inform user why input was invalid
    if (userInput === null) {
      return null;
    } else if (isNaN(userInput)) {
      window.alert(msgNaN);
    } else if (userInput > maxLength) {
      window.alert(msgTooLarge);
    } else if (userInput < minLength) {
      window.alert(msgTooSmall);
    } else {
      entryIsValid = true;
    }
  }
  return userInput;
}

