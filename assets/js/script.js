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
  return false
}



/////////////// REMOVE ERROR MESSAGE ON SUCCESS ////////////////
function showSucces(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  const span = formControl.querySelector("span");
  span.innerText = "";
  return true
}



//////////////// EMAIL STRING VALIDATION //////////////////////
function checkEmail(input) {
  const emailValue = /\S+@\S+\.\S+/

  if (emailValue.test(input.value.trim())) {
    showSucces(input);
  } else {
    showError(input, "Email is not invalid");
  }
  return
}

function checkPass(input) {
  const passValue = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/
  const passLength = /^.{6,12}/
  if (passValue.test(input.value.trim())) {
    showSucces(input);
  } else {

    showError(input, "Password must have atleast one UpperCase letter and one special character ");
    return
  }
  if (passLength.test(input.value.trim())) {
    showSucces(input);

  } else {
    showError(input, "Must be Greater than 6 letters")
    return

  }

}


/////////////////// REQUIRED FIELDS VALIDATION ///////////////////
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
      return

    } else {
      showSucces(input);
    }
  });
}



//////////////////// FUNCTION FOR CHECKING LENGTH //////////////////////

function checkLength(input, min, max) {

  try {

    if (input.value.length < min) {
      showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
      );
    } else if (input.value.length > max) {
      showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
      );
      return
    } else {
      showSucces(input);

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
    showSucces(input2, "")
  } else {
    showError(input2, "Passwords do not match")
  }
}

///////// SHOWING AND REMOVING ERRORS ON RUNTIME WITH KEYUP EVENT
fname.addEventListener("keyup", function (e) {
  checkLength(fname, 3, 15);

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

  checkRequired([fname, lname, email, password]);
  checkLength(fname, 3, 15);
  checkLength(lname, 3, 15);
  checkEmail(email);
  checkLength(password, 6, 12);
  checkPass(password)
  checkPasswordMatch(password, password2)
}



btn.addEventListener("click", function (e) {
  checkErr()

})




////// Prevent Default ///////