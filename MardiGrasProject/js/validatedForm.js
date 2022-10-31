const myForm = document.getElementById('my__form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('mail');
const textBox = document.getElementById('textBox');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

const firstNameErrorMessage = document.getElementById('firstNameErrorMessage');
const lastNameErrorMessage = document.getElementById('lastNameErrorMessage');
const emailErrorMessage = document.getElementById('emailErrorMessage');
const textAreaErrorMessage = document.getElementById('textAreaErrorMessage');

function validateFirstName(fn) {
    return fn.length > 0;
}

function validateLastName(ln) {
    return ln.length > 0;
}

function validateEmail(email) {
    return email.length > 0 && email.indexOf('@') != -1 && email.endsWith('.com');
}

function validateTextArea(text) {
    return text.length > 10;
}

submitBtn.addEventListener('click', () => {
    let isFn = validateFirstName(firstName.value);
    let isLn = validateLastName(lastName.value);
    let isMail = validateEmail(email.value);
    let isText = validateTextArea(textBox.value);

    let count = 0;
    if (isFn) {
        count += 1;
        firstNameErrorMessage.classList.add('hidden');
    } else {
        firstNameErrorMessage.classList.remove('hidden');
    }

    if (isLn) {
        count += 1;
        lastNameErrorMessage.classList.add('hidden');
    } else {
        lastNameErrorMessage.classList.remove('hidden');
    }

    if (isMail) {
        count += 1;
        emailErrorMessage.classList.add('hidden');
    } else {
        emailErrorMessage.classList.remove('hidden');
    }

    if (isText) {
        count += 1;
        textAreaErrorMessage.classList.add('hidden');
    } else {
        textAreaErrorMessage.classList.remove('hidden');
    }

    if (count == 4) {
        myForm.submit();
    }

});

resetBtn.addEventListener('click', () => {
    firstNameErrorMessage.classList.add('hidden');
    lastNameErrorMessage.classList.add('hidden');
    emailErrorMessage.classList.add('hidden');
    textAreaErrorMessage.classList.add('hidden');
});
