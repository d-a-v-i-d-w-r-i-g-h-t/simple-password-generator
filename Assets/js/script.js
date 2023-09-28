// Assignment Code (moving passwordText to global)
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");


// Add event listener to generate button
// This click starts the application
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


// generatePassword function returns generated password
function generatePassword() {
  
  // object variable contains user-selected password criteria, character contents, and character type
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

  // If getPasswordLength returns a null, the function will be terminated
  // Similar null check appears in function writePassword to cleanly exit the application
  o.passwordLength = getPasswordLength();
  if (o.passwordLength === null) {
    return null;
  }
  
  // Set boolean for each character type passed as argument in choosePasswordCriteria
  // Data validation using while-loop -- loop repeats until input meets criteria
  // User is informed why their input is invalid, in this case they must select at least one character type
  var msg = "You must select at least one character type. Please try again.";
  var selectAtLeastOne = false;
  while (selectAtLeastOne === false) {
    // Use function to request user input for selection of various character types
    o.lowercase.inUse = choosePasswordCriteria(o.lowercase.characterType, o.lowercase.content);
    o.uppercase.inUse = choosePasswordCriteria(o.uppercase.characterType, o.uppercase.content);
    o.numeric.inUse = choosePasswordCriteria(o.numeric.characterType, o.numeric.content);
    o.special.inUse = choosePasswordCriteria(o.special.characterType, o.special.content);
    // Check if user selected at least one character type
    if (o.lowercase.inUse ||
        o.uppercase.inUse ||
        o.numeric.inUse ||
        o.special.inUse === true) {
      selectAtLeastOne = true;
    } else {
      // Alert user why their (lack of) selection is invalid
      window.alert(msg);
    }
  }

  // Ensure every selected character type is used at least once:
  // Add a random character to initialCharacters for each in-use character type
  // At the same time, create a string with all in-use password characters for later use
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

  // Calculate how many more characters are needed to complete the password
  var numRemainingCharacters = o.passwordLength - initialCharacters.length;
  
  // Start building the password
  var buildPassword = initialCharacters;
  // With for-loop, add additional characters until password length is correct
  // Characters are randomly selected from string of all in-use characters
  for (var i = 0; i < numRemainingCharacters; i++) {
    buildPassword = buildPassword + getRandomCharacter(allInUseCharacters);
  }
  // Shuffle password so that initial character types don't always follow the same order
  // based on which types are selected (lowercase, uppercase, numeric, special)
  buildPassword = randomizeString(buildPassword);
  
  return buildPassword;
}


// Shuffle an input string and create a new randomized string with the result,
// by randomly taking one character at a time from input string
function randomizeString(inputStr) {
  var numChars = inputStr.length;
  var randomChar;
  var randomizedString = "";
  // Use for-loop to randomly remove characters one-by-one from the input string
  // and add them to the end of a new string
  for (var i = 0; i < numChars; i++) {
    randomChar = getRandomCharacter(inputStr);
    randomizedString = randomizedString + randomChar;
    // Remove the "used" character from the input string
    // Only one instance of the "used" character will be removed if there are duplicates
    inputStr = inputStr.replace(randomChar,"");
  }
  return(randomizedString);
}


// Generate a random index based on the string length
// Return a single random character from the input string
function getRandomCharacter(inputString) {
  var randomIndex = Math.floor(Math.random() * inputString.length);
  var randomCharacter = inputString[randomIndex];
  return randomCharacter;
}


// Prompt user to confirm usage of a given character type and return a boolean
// The desired character type is passed as an argument, along with the set of characters for user reference
function choosePasswordCriteria(charType, charContent) {
  var msg = `Would you like your password to contain ${charType} characters?\n\n`;
  msg = msg + charContent;
  return window.confirm(msg);
}


// Prompt user for a password length, perform data validation
// Use a while-loop to repeat request until valid input has been entered
// If input is invalid, inform user why and reprompt for input
function getPasswordLength() {
  // Length criteria are stored as constant values
  const minLength = 8;
  const maxLength = 128
  var msgPrompt = "Welcome to the Password Generator\n\n";
  msgPrompt = `${msgPrompt}Please enter the desired password length,\n`;
  msgPrompt = `${msgPrompt}from ${minLength} to ${maxLength} characters for maximum security.`;
  var msgTooSmall = "Your entry is too small, please try again.";
  var msgTooLarge = "Your entry is too large, please try again.";
  var msgNaN = "Your entry is not a number, please try again.";
  var userInput;

  // The while-loop repeats until user enters an appropriate numeric value
  var entryIsValid = false;
  while (entryIsValid === false) {
    userInput = window.prompt(msgPrompt);
    // Selecting Cancel returns null which ultimately exits out of application
    //   due to other null tests in calling functions
    // Check if input is not a number, too large, or too small
    // Inform user why input was invalid
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

