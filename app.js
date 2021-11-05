"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTrait(people);
      break;
    default:
      app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName.toLowerCase() === firstName.toLowerCase() && potentialMatch.lastName.toLowerCase() === lastName.toLowerCase()){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson[0];
}

function searchByTrait(people){
  var traitChosen = people;
  var foundPerson;
  if(traitChosen.length > 1){
    let traitsearch = parseInt(promptFor(`What trait would you like to search this person by?
    \nType "1" for Eye Color.
    \nType "2" for Height.
    \nType "3" for Weight.
    \nType "4" for Gender.
    \nType "5" for Occupation.
    \nType "6" if Person is Known.`, autoValid));
      switch (traitsearch) {
      case 1 :
      traitChosen = searchByEyeColor(traitChosen)
      break;
      case 2 :
      traitChosen = searchByHeight(traitChosen)
      break;
      case 3 :
      traitChosen = searchByWeight(traitChosen)
      case 4 :
      traitChosen = searchByGender(traitChosen)
      case 5 :
      traitChosen = searchByOccupation(traitChosen)
      case 6 :
      traitChosen = searchByName(traitChosen)
      break;
      default:
      alert('Please enter a valid trait'); 
      break;
    }
  }else{
    return traitChosen[0];
  }
}
//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let eyecolor = promptFor("What is the person's eyecolor?", autoValid).toLowerCase();
  
  let foundPerson = people.filter(function(potentialMatch){
    if (potentialMatch.eyeColor === eyecolor){
      return true;
    }
    else{
      return false;
    }
  })
  displayPeople(foundPerson);
  if(people.length > 1){
    searchByTrait(foundPerson);
  }else{
    return foundPerson;
  }
}

//TODO: add other trait filter functions here.
function searchByHeight(people){
  let heightSearch = parseInt(promptFor("What is the person's height(in)?",autoValid));
  let heightFiltered = people.filter(function(potentialHeightMatch){
    if (potentialHeightMatch.height === heightSearch){
    return true;
  }
  else{
    return false;
  }
  })
  displayPeople(heightFiltered);
  if(people.length > 1){
    searchByTrait(heightFiltered);
  }else{
    return heightFiltered;
  }
}

function searchByWeight(people){
  let weightSearch = parseInt(promptFor("What is the person's weight(lbs)?",autoValid));
  let weightFiltered = people.filter(function(potentialWeightMatch){
    if (potentialWeightMatch.weight === parseInt(weightSearch)){
    return true;
  }
  else{
    return false;
  }
  })
  displayPeople(weightFiltered);
  if(people.length > 1){
    searchByTrait(weightFiltered)
  }
}

function searchByGender(people){
  let genderSearch = promptFor("What is the person's gender?",autoValid);
  let genderFiltered = people.filter(function(potentialGenderMatch){
    if (potentialGenderMatch.gender.toLowerCase() === genderSearch){
    return true;
  }
  else{
    return false;
  }
  })
  displayPeople(genderFiltered);
  if(people.length > 1){
    searchByTrait(genderFiltered)
  }
}

function searchByOccupation(people){
  let OccupationSearch = promptFor("What is the person's eye color?",autoValid);
  let OccupationFiltered = people.filter(function(potentialOccupationMatch){
    if (potentialOccupationMatch.Occupation.toLowerCase() === OccupationSearch){
    return true;
  }
  else{
    return false;
  }
  })
  displayPeople(OccupationFiltered);
  if(people.length > 1){
    searchByTrait(OccupationFiltered)
  }
}

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Age: " + person.age + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
  return mainMenu(person,people)
}
//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion