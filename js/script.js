//This script holds the initalization and event handler functions for the interactive form


//Runs the 'initializaPage' to do the following, function is in initializePage.js
//1. Focus the name input on page loads
//2. Runs resetThemeSelection to reset the T-Shirt color selection field to default 'Choose Here'
//3. Hides T-Shirt Color Selection field
//4. Hides 'others' job roles (For JavaScript Progressive Enhancement Requirement)
//4. Hides 'paypal' payment option (For JavaScript Progressive Enhancement Requirement)
//4. Hides 'bitcoin' payment option (For JavaScript Progressive Enhancement Requirement)
initalizePage();






//This event handler sets the user selected Job Role as the Job Role selected
//If 'others' job role is selected, shows the hidden 'Other job role' text input field, hides this field if 'others' job role is not selected
$('#title').on('change', function() {

  const currentSelectorValue = this.value;
  const selectorElement = $('#other-title');

  (currentSelectorValue =='other')? selectorElement.show() : selectorElement.hide();

});







//This event handler sets the user selected T-Shirt Theme as the T-Shirt Theme selectedChecked//
//When 'Theme-JS Puns' or 'Theme-I Love' is selected, only then the respective color selection fields for each theme will be displayed
//When respective color selection field is displayed, the 'Select Theme' option in the themes field will be disabled
$('#design').on('change', function() {

  const currentSelectorTheme = this.value;


  $("#colors-js-puns").css('display','block');//Display color selection field
  ($("#design").prop('children'))[0].disabled = true; //Disable 'Select Theme' option in themes field

  //Shows respective color selection option when either JS puns or Heart Js is selected, if not, color selection field will be reseted to 'Choose Here'.
  //showThemeSelection function and resetThemeSelection function are located in themeSelectionFunctions.js
  (currentSelectorTheme =='js puns' || currentSelectorTheme =='heart js')? showThemeSelection(currentSelectorTheme) : resetThemeSelection();

});







//Declaration of global constants for activities selection
const regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Regex for valid email string
const regexAllDigits = /^\d+$/; //Regex for all numerical digits string
const activitesArray = $( ".activities" ).children(); //Reads all activities options available for selection
let activityTotalCost = 0;  //Global declaration for total costs of activities selected

//This event handler reads the activities the user selected and save the total cost as 'activityTotalCost' and displays it
$('.activities label').on('change', function() {

  const selectedActivityText = this.innerText;  //Gets user selected option innerHtml text
  const regex = /\—(.*?)\,/;  //Regex to extract Date and time of the event selected
  const activityCost = parseFloat(selectedActivityText.substr(selectedActivityText.lastIndexOf('$') + 1));  //Gets the cost of the activity cost the user checked
  const selectedChecked = !this.childNodes[0].checked;  //Checks whether the activity the user just checked was previous checked or not checked
  (selectedChecked == false)? activityTotalCost+=activityCost: activityTotalCost-=activityCost; //Subtracts or adds cost to global declaration 'activityTotalCost' based on whether the the selected activity was checked or unchecked

  $('#totalActivityCost').text('Total: $'+activityTotalCost); //Displays the current total activity cost

  //Active error display to user. If totalActivity cost is 0, inform the user that at least one activity must be chosen, hides the error message if at least one activity is chosen(totalactivity cost is not 0)
  //'showValidationError' and 'hideValidationError' is in validationAndErrorMsgFunctions.js
  (activityTotalCost==0) ? showValidationError('totalActivityCost','Please choose at least one activity.','activityError') :hideValidationError('totalActivityCost','activityError');

  //If selected activity is not 'Main Conference'
  if(this.childNodes[0].name != 'all'){

    //Gets the user selected activity date and time by regex
    const selectEventTimingAndDate = (regex.exec(selectedActivityText))[1];

    //Run through all activites options
    for(let i = 1 ; i < 7; i++){

        let currentActivityTimeAndDate;
        let currentActivity = null;
        currentActivity = activitesArray[i].innerText;

        //If user selected activity has a regex match
        if(regex.exec(currentActivity)){

            currentActivityTimeAndDate = (regex.exec(currentActivity))[1];

            if(selectedChecked == false){

              //Disables all other activites that has the same date and timing as the user selected activity
              //'disableClashEvents' function is in activitiesSelectionFunctions.js
              ((currentActivityTimeAndDate == selectEventTimingAndDate)&&(selectedActivityText!=currentActivity)) ? disableClashEvents(activitesArray[i]) : null;

            }else{
              //Enables all other activites that has the same date and timing as the user selected activity (unchecked)
              //'enableClashEvents' function is in activitiesSelectionFunctions.js
              ((currentActivityTimeAndDate == selectEventTimingAndDate)) ? enableClashEvents(activitesArray[i]) : null;

            }

        }

    }

  }

});






//This event handler shows the respective payment fields when the payment option is selected
//'showPaymentSelected' function is located in paymentSelectionFunctions.js
$('#payment').on('change', function() {

  const selectedPaymentType = $( "#payment option:selected" ).text();

  (selectedPaymentType == 'PayPal') ? showPaymentSelected('bitcoin','credit-card','paypal'):

  (selectedPaymentType == 'Bitcoin') ? showPaymentSelected('paypal','credit-card','bitcoin'):

  (selectedPaymentType == 'Credit Card') ? showPaymentSelected('paypal','bitcoin','credit-card'):

  null;

});






//This event handler checks whether required fields are input correctly, will only allow form submission when all required fields are input correctly when 'button' is pressed
$('button').click(function(event) {
  event.preventDefault();//Prevent default html submission

  const userInputName = $('#name').val(); //Gets user input 'name' field
  const userInputEmail = $('#mail').val();  //Gets user input 'email' field
  const userSelectedPaymentType = $( "#payment" ).val();  //Gets user input payment type
  const userInputCCNumber = $('#cc-num').val(); //Gets user input Credit Card number if 'credit card' payment type is selected
  //Checks whether user input credit card number is a valid credit card number
  const checkValidCCNumber = ((regexAllDigits.test(userInputCCNumber)) && userInputCCNumber.length>=13 && userInputCCNumber.length<=16);
  const userZipNumber = $('#zip').val();  //Gets user input Zip number if 'credit card' payment type is selected
  //Checks whether user input zip number is a valid zip number
  const checkValidZipNumber = ((regexAllDigits.test(userZipNumber)) && userZipNumber.length==5);
  const userCVVNumber = $('#cvv').val();  //Gets user input CVV number if 'credit card' payment type is selected
  //Checks whether user input CVV number is a valid CVV number
  const checkValidCVVNumber = ((regexAllDigits.test(userCVVNumber)) && userCVVNumber.length==3);
  let validSubmission = 0;  //Counter for valid form submmission, 'validSubmission' must add up to 4 for form to be submitted

  //Checks whether 'name' field is not empty, if empty, display error msg, if not, add 1 to validSubmission variable
  //'showValidationError' function is in validationAndErrorMsgFunction.js
  (userInputName=='')? showValidationError('name','Name cannot be empty.','nameError') : validSubmission++;

  //Checks whether 'email' field is not empty and is of valid email string, if false, display error msg, if not, add 1 to validSubmission variable
  //'showValidationError' function is in validationAndErrorMsgFunction.js
  (!regexEmail.test(userInputEmail)||userInputEmail=='')? showValidationError('mail','Please enter a valid email.','mailError') : validSubmission++;

  //Checks whether at least one activity is chosen (ie. totalActivityCost is not $0), if false, display error msg, if not, add 1 to validSubmission variable
  //'showValidationError' function is in validationAndErrorMsgFunction.js
  (activityTotalCost == 0)? showValidationError('totalActivityCost','Please choose at least one activity.','activityError') : validSubmission++ ;

  //If user selected paypal or bitcoin as payment option add 1 to validSubmission variable
  //If user selected credit card payment option,if all Credit Card Number, Zip Number and CVV numbers are valid, add 1 to validSubmission variable
  //If one of more of Credit Card Number, Zip Number and CVV is false, run 'checkValidCreditCard' function, located in validationAndErrorMsgFunction.js
  (userSelectedPaymentType == "paypal" || userSelectedPaymentType == "bitcoin")? validSubmission++ :
  (userSelectedPaymentType == "credit card" && (checkValidCCNumber&&checkValidZipNumber&&checkValidCVVNumber))? validSubmission++ :
  checkValidCreditCard(userInputCCNumber,userZipNumber,userCVVNumber);

  //Final Check: if validSubmission adds up to 4 (ie, all required fields are valid, submit form)
  (validSubmission==4)? $( "form" ).submit() : null ;

})






//The event handlers below checks dynamically as user input changes, when event handler register a change,
//will run the respective 'checkValid...' functions to check whether field is valid and display error msg if not valid, hides all error msg if current input is true
$('#name').on('input', function(event) {

    const inputName = $('#name').val();

    checkValidName(inputName);

});

$('#mail').on('input', function(event) {

    const inputEmail = $('#mail').val();

    checkValidEmail(inputEmail);

});

$('#cc-num').on('input', function(event) {

    const inputCCNo = $('#cc-num').val();

    checkValidCreditCardNumber(inputCCNo);

});

$('#zip').on('input', function(event) {

    const inputZip = $('#zip').val();

    checkValidZip(inputZip);

});

$('#cvv').on('input', function(event) {

    const inputCvv = $('#cvv').val();

    checkValidCVV(inputCvv);

});
