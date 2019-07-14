//This function resets the page on page load 
//1. Focus the name input on page loads
//2. Runs resetThemeSelection to reset the T-Shirt color selection field to default 'Choose Here'
//3. Hides T-Shirt Color Selection field
//4. Hides 'others' job roles (For JavaScript Progressive Enhancement Requirement)
//4. Hides 'paypal' payment option (For JavaScript Progressive Enhancement Requirement)
//4. Hides 'bitcoin' payment option (For JavaScript Progressive Enhancement Requirement)


function initalizePage(){

  $("#name").focus();
  resetThemeSelection();
  $("#colors-js-puns").css('display','none');
  $("#other-title").css('display','none');
  $("#paypal").css('display','none');
  $("#bitcoin").css('display','none');

}
