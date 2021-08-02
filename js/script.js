// GLOBAL VARIABLES
const form = document.querySelector("form")
const nameField = document.querySelector("#name")
const email = document.querySelector('#email')
const jobTitle = document.getElementById('title')
const otherJob = document.getElementById('other-job-role')
const color = document.querySelector("#color")
const design = document.querySelector("#design")
const activitiesFieldSet = document.querySelector("#activities")
const activities = document.querySelectorAll('#activities input')
const totalCost = document.querySelector("#activities-cost")
const payment = document.querySelector('#payment')
const cc = document.querySelector('#credit-card')
const ccNum = document.querySelector('#cc-num')
const pp = document.querySelector('#paypal')
const bc = document.querySelector('#bitcoin')
const zip = document.querySelector('#zip')
const cvv = document.querySelector('#cvv')


// Cause the Name input field to be automatically selected so user can begin typing immediately
nameField.focus()

// Allow user to input text into #other-job-role field if they select "Other" in Job Role dropdown
otherJob.style.display = "none"
jobTitle.addEventListener("change", () => {
    if (jobTitle.value === "other") {
        otherJob.style.display = "block"
    } else {
        otherJob.style.display = "none"
    }
})

// Disable the color select field until a design is selected
color.disabled = true

// When the user does anything with the Design selector, we listen
design.addEventListener("change", () => {
    
    // Enable the color selector but hide all the options so we can enable
    // specific ones later
    color.disabled = false
    let colorOptions = color.options
    for (let i=0; i<colorOptions.length; i++) {
        colorOptions[i].hidden = true
    }

    // If the design value is 'js puns', loop through colors and find matches
    // then unhide them so only matches are visible in the design options
    if (design.value === "js puns") {
        colorOptions = document.querySelectorAll('[data-theme="js puns"]')
        colorOptions[0].selected = true
        for (let i=0; i<colorOptions.length;i++) {
            colorOptions[i].hidden = false
        }
    } else {
        // If the design value is 'heart js', loop through colors and find matches
        // then unhide them so only matches are visible in the design options 
        colorOptions = document.querySelectorAll('[data-theme="heart js"]')
        colorOptions[0].selected = true
        for (let i=0;i<colorOptions.length;i++) {
            colorOptions[i].hidden = false
        }
    }
})


// initialize the cost value
let cost = 0

// When anything in the activity field is changed, we check if the target  
// 1) Is checked
// 2) The cost associated in the dataset
activitiesFieldSet.addEventListener("change", (e) => {
    const eventCost = parseInt(e.target.dataset.cost)
    console.log(eventCost)
    if (e.target.checked) {
        // then we add it to the totalCost variable and display it
        cost += eventCost
    } else {
        // or we subtract it if the event target is unchecked
        if (cost >= eventCost) {
            cost -= eventCost
        }
    }
    // then display it on the page
    totalCost.textContent = `Total: $${cost}`
})


activitiesFieldSet.addEventListener('focus', (e) => {
    e.target.parentNode.className = 'focus'
}, true)

activitiesFieldSet.addEventListener('blur', (e) => {
    e.target.parentNode.className = ''
}, true)

activitiesFieldSet.addEventListener("change", (e) => {
    for (i=0; i<activities.length;i++) {
        if (activities[i] !== e.target) {
            if (activities[i].dataset.dayAndTime == e.target.dataset.dayAndTime) {
                activities[i].disabled = true
                activities[i].parentElement.className = 'disabled'
            }
            if (e.target.checked === false) {
                activities[i].disabled = false
                activities[i].parentElement.className = ''
            }
        }
    }
    activitiesValidation()
})


// Ensure the 'I'm going to pay with:' box is automatically selected to 
// Credit Card
payment.value = "credit-card"

// Hide PayPal and Bitcoin payment selections by default
function hidePaymentsDefault() {
    pp.style.display = 'none'
    bc.style.display = 'none'
    cc.style.display = 'block'
}
hidePaymentsDefault()

// Listen for whate selection is made in Payment dropdown box and show
// appropriate payment boxes while hiding the inappopriate ones
payment.addEventListener('change', () => {
    if (payment.value === 'paypal') {
        cc.style.display = 'none'
        pp.style.display = 'block'
    } else if (payment.value === 'bitcoin') {
        pp.style.display = 'none'
        bc.style.display = 'block'
    } else {
        hidePaymentsDefault()
    }
})

// ---------------------
//      FORM VALIDATION
// ---------------------

//check if name input box has any value
function nameValidation() {
    if (nameField.value) {
        nameField.parentElement.className = 'valid'
        nameField.parentElement.lastElementChild.style.display = 'none'
        return true
    } else {
        nameField.parentElement.className = 'not-valid'
        nameField.parentElement.lastElementChild.style.display = "block"
        nameField.focus()
        return false
    }
}

//check if email input box has any value and that it matches a typical email address format
function emailValidation() {
    if (email.value && /^\w{2,}@\w{2,}\.com$/.test(email.value)) {
        email.parentElement.className = 'valid'
        email.parentElement.lastElementChild.style.display = "none"
        return true
    } else {
        if (email.value) {
            email.nextElementSibling.textContent = 'Email address must be formatted correctly'
        } else {
            email.nextElementSibling.textContent = 'Please enter your email'
        }
        email.parentElement.className = 'not-valid'
        email.parentElement.lastElementChild.style.display = "block"
        email.focus()
        return false
    }
}


//make sure at least one activity is selected by ensuring Cost is more than $0
function activitiesValidation() {
    if (cost > 0) {
        activitiesFieldSet.firstElementChild.className = 'valid'
        activitiesFieldSet.lastElementChild.className = "none"
        return true
    } else {
        activitiesFieldSet.firstElementChild.className = 'not-valid'
        activitiesFieldSet.lastElementChild.className = "block"
        activitiesFieldSet.focus()
        return false
    }
}

//check if credit card input box matches typical credit card format
function ccValidation() {
    const ccNumValidated = /^[0-9]{13,16}$/.test(ccNum.value);
    if (ccNumValidated) {
        ccNum.parentElement.className = 'valid'
        ccNum.parentElement.lastElementChild.style.display = "none"
        return true
    } else
        ccNum.parentElement.className = 'not-valid'
        ccNum.parentElement.lastElementChild.className = "block"
        ccNum.focus()
        return false
}

//check if zip code input box matches typical zip code format
function zipValidation() {
    const zipNumValidated = /^[0-9]{5}$/.test(zip.value)
    if (zipNumValidated) {
        zip.parentElement.className = 'valid'
        zip.parentElement.lastElementChild.style.display = "none"
        return true
    } else {
        zip.parentElement.className = 'not-valid'
        zip.parentElement.lastElementChild.className = "block"
        zip.focus()
        return false
    }
}


//check if cvv input box matches typical cvv format
function cvvValidation() {
    const cvvNumValidated = /^[0-9]{3}/.test(cvv.value)
    if (cvvNumValidated) {
        cvv.parentElement.className = 'valid'
        cvv.parentElement.lastElementChild.style.display = "none"
        return true
    } else {
        cvv.parentElement.className = 'not-valid'
        cvv.parentElement.lastElementChild.className = "block"
        cvv.focus()
        return false
    }
}

//Real-time error handling on keyup
email.addEventListener('keyup', () => {
    emailValidation()
})

cc.addEventListener('keyup', () => {
    ccValidation()
})

zip.addEventListener('keyup', () => {
    zipValidation()
})

cvv.addEventListener('keyup', () => {
    cvvValidation()
})


//when the form is submited, see if any Validators returned false. If so, prevent the form from submitting
//Only check credit card validators if the credit card payment method is selected
form.addEventListener('submit', (e) => {
    if (!nameValidation()) {
        e.preventDefault()
    } 
    if (!emailValidation()) {
        e.preventDefault()
    }
    if (!activitiesValidation()) {
        e.preventDefault()
    }
    if (payment.value === 'credit-card') {
        if (!ccValidation()) {
            e.preventDefault()
        }
        if (!zipValidation()) {
            e.preventDefault()
        }
        if (!cvvValidation()) {
            e.preventDefault()
        }
    }
})