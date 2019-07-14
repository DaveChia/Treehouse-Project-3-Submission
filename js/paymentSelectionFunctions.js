//This function displays the payment option the user selected and hides all other option

function showPaymentSelected(hideChoice1,hideChoice2,showChoice){

  $('#'+showChoice).show();
  $('#'+hideChoice1).hide();
  $('#'+hideChoice2).hide();

}
