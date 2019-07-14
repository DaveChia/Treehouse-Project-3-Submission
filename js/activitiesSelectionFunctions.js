//The functions here are for activities selection

//This function disables all other activites that has the same date and time as the user selected activity
function disableClashEvents(inputActivity, inputActivityCost){

  inputActivity.style.color = 'gray';
  inputActivity.childNodes[0].disabled = true;

}

//This function enables all other activites that has the same date and time as the user selected activity
function enableClashEvents(inputActivity,inputActivityCost){

  inputActivity.style.color = 'black';
  inputActivity.childNodes[0].disabled = false;

}
