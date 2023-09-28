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
  

  // if getPasswordLength returns a null, the application will be terminated using these null checks
  passwordGen.passwordLength = getPasswordLength();
  if (passwordGen.passwordLength === null) {
    return null;
  }
  
  // set boolean for each character type passed as argument in choosePasswordCriteria
  // using const o to make this a bit more clear and readable
  const o = passwordGen;
  o.lowercase.inUse = choosePasswordCriteria(o.lowercase.characterType, o.lowercase.content);
  o.uppercase.inUse = choosePasswordCriteria(o.uppercase.characterType, o.uppercase.content);
  o.numeric.inUse = choosePasswordCriteria(o.numeric.characterType, o.numeric.content);
  o.special.inUse = choosePasswordCriteria(o.special.characterType, o.special.content);

  var numCharTypes = 0;
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
  msgPrompt = `${msgPrompt}"from 8 to 128 characters for maximum security.`;
  var msgTooSmall = "Your entry is too small, please try again.";
  var msgTooLarge = "Your entry is too large, please try again.";
  var msgNaN = "Your entry is not a number, please try again.";
  var response;

  var entryIsValid = false;
  while (entryIsValid === false) {
    response = window.prompt(msgPrompt);
    if (response === null) {
      return null;
    } else if (isNaN(response)) {
      window.alert(msgNaN);
    } else if (response >= maxLength) {
      window.alert(msgTooLarge);
    } else if (response <= minLength) {
      window.alert(msgTooSmall);
    } else {
      entryIsValid = true;
    }
  }
}

// 1. User clicks button, calls function writePassword()
// 2. writePassword calls function generatePassword()
// 3. generatePassword calls function getPasswordCriteria()
// 4. prompt user for length
// 5. prompt user for lowercase, uppercase, numeric, special
// 6. call createPassword()
// 7. add one random character from each type to password
// 8. fill in remaining chars randomized from selected criteria
// 9. return completed password
// 10. write password to document using queryselector
// 
