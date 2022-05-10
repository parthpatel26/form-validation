//////////////// GET INPUT VALUES IN A VARIABLE ////////////////////

const form = document.getElementById("form");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const submit = document.getElementById("submit")
const info = document.getElementById("info")
const btn = document.getElementById("btn")


///////////////// PRINT ERROR MESSAGE ///////////////////////////
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const span = formControl.querySelector("span");
  span.innerText = message;
  return true;

}



/////////////// REMOVE ERROR MESSAGE ON SUCCESS ////////////////
function showSucces(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  const span = formControl.querySelector("span");
  span.innerText = "";
  return false;
}



//////////////// EMAIL STRING VALIDATION //////////////////////
function checkEmail(input) {
  const emailValue = /\S+@\S+\.\S+/

  if (emailValue.test(input.value.trim())) {
    return showSucces(input);
  } else {
    return showError(input, "Email is not invalid");
  }
}

function checkPass(input) {
  const passValue = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,12}/
  const passLength = /^.{6,12}/
  if (passValue.test(input.value.trim())) {
    return showSucces(input);
  } else {
    return showError(input, "Password must have atleast one UpperCase letter and one special character ");
  }
}


/////////////////// REQUIRED FIELDS VALIDATION ///////////////////
function checkRequired(inputArr) {
	var error = 0;
  inputArr.forEach(function (input) {
    if (input.value.trim() !== "") {
      showSucces(input);
    } else {
			error++;
      showError(input, `${getFieldName(input)} is required`);
    }
  });
	return error;
}



//////////////////// FUNCTION FOR CHECKING LENGTH //////////////////////

function checkLength(input, min, max) {

  try {

    if (input.value.length < min) {
      return showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
      );
    } else if (input.value.length > max) {
      return showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
      );

    } else {
      return showSucces(input);
    }
  } catch (e) {
    alert(e);
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);

}


////////////  FUNCTION FOR MATCHING PASSWORD AND CONFIRM PASSWORD  ////////////
function checkPasswordMatch(input1, input2) {
  if (input1.value === input2.value) {
    return showSucces(input2, "");
  } else {
    return showError(input2, "Confirm Password do not match");
  }
}

///////// SHOWING AND REMOVING ERRORS ON RUNTIME WITH KEYUP EVENT
fname.addEventListener("blur", function (e) {
  if(fname.value !== "")
    checkLength(fname, 3, 15);
	else checkRequired([fname]);

})

lname.addEventListener("keyup", function (e) {
  checkLength(lname, 3, 15);

})
email.addEventListener("keyup", function (e) {
  checkEmail(email);
})

password.addEventListener("keyup", function (e) {
  checkPasswordMatch(password, password2)
  checkPass(password)

})

password2.addEventListener("keyup", function (e) {
  checkPasswordMatch(password, password2)
})


///////////////  CAPITALIZE FIRST LETTER /////////////////////

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



////// GETTING FORM DATA IN SPECIFIED ELEMENTS //////
function printData() {

  const getFullName = document.getElementById("getFullName")
  const getEmail = document.getElementById("getEmail")
  const getPass = document.getElementById("getPassword")
  const getFname = fname.value
  const getLname = lname.value
  getFullName.innerHTML = capitalizeFirstLetter(getFname) + " " + capitalizeFirstLetter(getLname)
  getEmail.innerHTML = email.value
  getPass.innerHTML = password.value
}


////// PRINTING FORM DATA IN INFORMATION SECTION //////



function checkErr() {

  checkLength(fname, 3, 15);
  checkLength(lname, 3, 15);
  checkEmail(email);
  checkLength(password, 6, 12);
  checkPass(password)

}


function preSubmit() {
	var errorCode = 0;

	var requireItems = [fname, lname, email, password, password2];
	errorCode = checkRequired(requireItems);
  console.log("You have "+errorCode+" require error!");
  if(errorCode > 0){
    return false;
  }
	
  if(checkLength(fname, 3, 15)){
		errorCode++;
  }
  if(checkLength(lname, 3, 15)){
		errorCode++;
  }
  if(checkEmail(email)){
		errorCode++;
  }
  if(checkPass(password)){
		errorCode++;
  }
  if(checkPasswordMatch(password, password2)){
		errorCode++;
  }

	if(errorCode === 0){
    printData();
  }
	else{
  	console.log("You have "+errorCode+" error!");
  }
}


btn.addEventListener("click", function (e) {
  preSubmit()
})




////// Prevent Default ///////
