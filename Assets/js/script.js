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
  var passwordCriteria = {
    length: 0,
    lowercase: false,
    uppercase: false,
    numeric: false,
    special: false
  }
  
  passwordCriteria.length = getPasswordLength();
  if (passwordCriteria.length === null) {
    return null;
  }

}

function getPasswordLength() {
  const minLength = 8;
  const maxLength = 128
  var msgPrompt = "Welcome to the Password Generator\n\n";
  msgPrompt = msgPrompt + "Please enter the desired password length,\n";
  msgPrompt = msgPrompt + "from 8 to 128 characters for maximum security.";
  var msgTooSmall = "Your entry is too small, please try again.";
  var msgTooLarge = "Your entry is too large, please try again.";
  var msgNaN = "Your entry is not a number, please try again.";
  var response = "";

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
  console.log(response);

  
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
