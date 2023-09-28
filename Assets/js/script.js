// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
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


}

function getPasswordLength() {
  var msg = "Please enter password length\nMinimum 8 characters, maximum 128 characters";
  var response = window.prompt(msg);
  
  
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
