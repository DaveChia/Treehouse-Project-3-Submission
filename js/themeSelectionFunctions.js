//The functions here are used for theme selection in the interactive form


//This function resets the color selection field to 'Choose Here'
function resetThemeSelection(){

  $("#color option").css('display','none');
  $('#color').val('first');

}

//This function shows the respective color options when 'js puns' or 'heart js' is selected
function showThemeSelection(inputTheme){

  let themeArray = [];

  (inputTheme =='js puns')? themeArray = ["cornflowerblue","darkslategrey","gold"] : themeArray = ["tomato","steelblue","dimgrey"];

  resetThemeSelection();

  themeArray.forEach(function(entry) {
      $('#color option[value='+entry+']').css('display','block');
  });

}
