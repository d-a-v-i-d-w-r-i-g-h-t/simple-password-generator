// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  if (password === null) {
    return;
  }
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {
  
  // object variable to contain user-selected password criteria, character contents, and character type
  var passwordGen = {
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
  
  // using const o for passwordGen to make this a bit more clear and readable
  const o = passwordGen;


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
// calculate number of character types being used to later determine how many more characters are necessary
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
  console.log("initial characters: " + initialCharacters);
  console.log("all in-use characters: " + allInUseCharacters);

  // var buildPassword = emptyString
  // var numInitialCharacters = initialCharacters.length;
  // var passwordChar;
  // for (var i = 0; i < numInitialCharacters; i++) {
  //   passwordChar = getRandomCharacter(initialCharacters);
  //   buildPassword = buildPassword + passwordChar;
  //   initialCharacters = initialCharacters.replace(passwordChar,emptyString);
  // }



  // calculate how many more characters are needed
  var numRemainingCharacters = o.passwordLength - initialCharacters.length;
  
  var buildPassword = initialCharacters;
  // add additional characters until we have enough
  for (var i = 0; i < numRemainingCharacters; i++) {
    buildPassword = buildPassword + getRandomCharacter(allInUseCharacters);
  }
  console.log(buildPassword);
  buildPassword = randomizeString(buildPassword);
  console.log(buildPassword);
  return buildPassword;

}

function randomizeString(inputStr) {
  var numChars = inputStr.length;
  var randomChar;
  var randomString = "";
  for (var i = 0; i < numChars; i++) {
    randomChar = getRandomCharacter(inputStr);
    randomString = randomString + randomChar;
    inputStr = inputStr.replace(randomChar,"");
  }
  return(randomString);
}

// generate a random index based on the string length
// get a single character from the input string
function getRandomCharacter(inputString) {
  var randomIndex = Math.floor(Math.random() * inputString.length);
  var randomCharacter = inputString[randomIndex];
  return randomCharacter;
}

// generic function to confirm a character type and return a boolean
function choosePasswordCriteria(charType, charContent) {
  var msg = `Would you like your password to contain ${charType} characters?\n\n`;
  msg = msg + charContent;
  return window.confirm(msg);
}



function getPasswordLength() {
  const minLength = 8;
  const maxLength = 128
  var msgPrompt = "Welcome to the Password Generator\n\n";
  msgPrompt = `${msgPrompt}Please enter the desired password length,\n`;
  msgPrompt = `${msgPrompt}from 8 to 128 characters for maximum security.`;
  var msgTooSmall = "Your entry is too small, please try again.";
  var msgTooLarge = "Your entry is too large, please try again.";
  var msgNaN = "Your entry is not a number, please try again.";
  var userInput;

  var entryIsValid = false;
  while (entryIsValid === false) {
    userInput = window.prompt(msgPrompt);
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

