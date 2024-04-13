const nameInput = document.getElementById('name');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');
const stateInput = document.getElementById('state');
const zipInput = document.getElementById('zip');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const internetCheckbox = document.getElementById('internet');
const friendCheckbox = document.getElementById('friend');
const localCheckbox = document.getElementById('local');
const commentsTextarea = document.getElementById('comments');

const availableFields = [
    nameInput,
    addressInput,
    cityInput,
    stateInput,
    zipInput,
    phoneInput,
    emailInput,
    internetCheckbox,
    friendCheckbox,
    localCheckbox,
    commentsTextarea
];

var regexPatterns = {
    zip: /^\d{5}(?:[-\s]\d{4})?$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/,
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
};

var stateAbbreviations = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
                          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
                          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
                          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
                          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];


function makeInvalid(element, errorMessage) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = errorMessage;
    inputControl.classList.add('invalid');
    inputControl.classList.remove('valid');
}

function makeValid(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('valid');
    inputControl.classList.remove('invalid');
}

function validateName() {
    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
        makeInvalid(nameInput, "Name is Required");
    } else {
        makeValid(nameInput);
    }
}

function validateAddress() {
    const addressValue = addressInput.value.trim();
    if (addressValue === '') {
        makeInvalid(addressInput, "Address is Required");
    } else {
        makeValid(addressInput);
    }
}

function validateCity() {
    const cityValue = cityInput.value.trim();
    if (cityValue === '') {
        makeInvalid(cityInput, "City is Required");
    } else {
        makeValid(cityInput);
    }
}

function validateState() {
    const stateValue = stateInput.value.trim();
    if (stateValue === '') {
        makeInvalid(stateInput, "State is Required");
    } else if (!stateAbbreviations.includes(stateValue.toUpperCase())) {
        makeInvalid(stateInput, "Use a valid State Abbreviation");
    }
    else {
        makeValid(stateInput);
    }
}

function validateZip() {
    const zipValue = zipInput.value.trim();
    if (zipValue === '') {
        makeInvalid(zipInput, "Zip is Required");
    } else if (!regexPatterns.zip.test(zipValue)) {
        makeInvalid(zipInput, "Use a valid Zip Code");
    }
    else {
        makeValid(zipInput);
    }
}

function validatePhone() {
    const phoneValue = phoneInput.value.trim();
    if (phoneValue === '') {
        makeInvalid(phoneInput, "Phone is Required");
    } else if (!regexPatterns.phone.test(phoneValue)) {
        makeInvalid(phoneInput, "Use a valid Phone Number");
    }
    else {
        makeValid(phoneInput);
    }
}

function validateEmail() {
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
        makeInvalid(emailInput, "Email is Required");
    } else if (!regexPatterns.email.test(emailValue)) {
        makeInvalid(emailInput, "Use a valid Email Address");
    } else {
        makeValid(emailInput);
    }
}

function validateCheckbox() {
    const checkboxes = document.querySelectorAll('#checkbox input[type="checkbox"]');
    let checked = false;

    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            checked = true;
        }
    });

    if (!checked) {
        makeInvalid(checkboxes[0], "Select at least one option");
    } else {
        makeValid(checkboxes[0]);
    }
}

function validateComments() {
    const commentsValue = commentsTextarea.value.trim();
    if (commentsValue.length > 500) {
        makeInvalid(commentsTextarea, "Comments should not exceed 500 characters");
    } else {
        makeValid(commentsTextarea);
    }
}

const validFields = [validateName, validateAddress, validateCity, validateState, 
                    validateZip, validatePhone, validateEmail, validateCheckbox, validateComments];

function validateForm() {
    validFields.forEach(func => func());

    for (const element of availableFields) {
        if (element.parentElement.classList.contains('invalid')) {
            return false;
        }
    }
    return true;
}


function initValidation(formSelector) {
    var form = document.querySelector(formSelector);

    function validateFormOnSubmit(event) {
        if (!validateForm()) {
            event.preventDefault();
        }
    }

    availableFields.forEach(function(field, index) {
        field.addEventListener('blur', function() {
            validFields[index]();
        });
    });

    form.addEventListener('submit', validateFormOnSubmit);
}
