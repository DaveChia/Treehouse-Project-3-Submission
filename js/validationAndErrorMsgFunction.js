//This page holds all validation functions and display error message

//This function displays the respective error field at respective location if user input is not valid
function showValidationError (inputErrorType,inputErrorMsg,inputErrorLoc){

  $('#'+inputErrorType).css("border-color", "red");
  $('#'+inputErrorLoc).html(inputErrorMsg);;

}

//This function hides the respective error field at respective location if user input is valid
function hideValidationError (inputErrorType,inputErrorLoc){

  $('#'+inputErrorType).css("border-color", "#b0d3e2");
  $('#'+inputErrorLoc).html('');;

}

//This function checks and displays respective credit card error if all of credit card, zip number and CVV number is not valid
function checkValidCreditCard(inputCC,inputZip,inputCVV){

  checkValidCreditCardNumber(inputCC);  //Checks whether credit card number is valid
  checkValidZip(inputZip);  //Checks whether zip number is valid
  checkValidCVV(inputCVV);  //Checks whether CVV number is valid

}

//This function checks whether user input name is not empty, displays error if its empty, hides error if not empty;
function checkValidName(inputUserName){

  (inputUserName!="")? hideValidationError('name','nameError') : showValidationError('name','Name cannot be empty.','nameError');

}

//This function checks whether user input email is of valid email format, displays error if its not valid, hides error if valid
function checkValidEmail(inputUserEmail){

  (regexEmail.test(inputUserEmail))? hideValidationError('mail','mailError') : showValidationError('mail','Please enter a valid email.','mailError');

}

//This function checks whether user input credit card is valid, displays error if its not valid, hides error if valid. Conditional validation for submission is here
function checkValidCreditCardNumber(inputUserCCNo){

  (inputUserCCNo=="")? showValidationError('cc-num','Credit Card Number cannot be blank.','cc-numError') :

  (inputUserCCNo.length<13 || inputUserCCNo.length>16)? showValidationError('cc-num','Please enter a number that is between 13 and 16 digits long.','cc-numError') :

  (!regexAllDigits.test(inputUserCCNo))? showValidationError('cc-num','Credit Card number must only contain numerical numbers.','cc-numError') :

  hideValidationError('cc-num','cc-numError');

}

//This function checks whether user input zip is valid, displays error if its not valid, hides error if valid
function checkValidZip(inputUserZip){

  (regexAllDigits.test(inputUserZip)&& inputUserZip.length==5)? hideValidationError('zip','zipError') : showValidationError('zip','Please enter a valid zip Number.','zipError');

}

//This function checks whether user input CVV is valid, displays error if its not valid, hides error if valid
function checkValidCVV(inputUserCVV){

  (regexAllDigits.test(inputUserCVV)&& inputUserCVV.length==3)? hideValidationError('cvv','cvvError') : showValidationError('cvv','Please enter a valid CVV Number.','cvvError');

}
