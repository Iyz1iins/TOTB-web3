function showRegistrationForm() {
  var formContainer = document.getElementById('registrationFormContainer');
  formContainer.innerHTML = `
    <form autocomplete="off" class="form" id="registrationForm">
      <p class="title1">Register Your Details</p>
      <p class="message">Register now and get full access to our website</p>
      <div class="form-group">
        <label>
          <input type="text" id="firstName" required>
          <span>Firstname</span>
        </label>
        <label>
          <input type="text" id="lastName" required>
          <span>Lastname</span>
        </label>
      </div>
      <label>
        <input type="text" id="mobileNo" required>
        <span>Phone number (8 Digits)</span>
      </label>
      <label>
        <input type="email" id="email" required>
        <span>Email</span>
      </label>
      <label>
        <input type="password" id="password" required>
        <span>Password </span>
        <span class="icon" id="togglePassword">
          <i class="far fa-eye-slash"></i>
        </span>
      </label>
      <button class="submit" onclick="validateForm(event)">Submit</button> <!-- Add onclick event to trigger form validation -->
      <p class="signin">
        Already have an account ?
        <a href="#">Sign in</a>
      </p>
      <div id="message"></div> 
    </form>
  `;
}

function validateForm(event) {
event.preventDefault(); // Prevent form submission

var firstName = document.getElementById('firstName').value;
var lastName = document.getElementById('lastName').value;
var mobileNo = document.getElementById('mobileNo').value;
var email = document.getElementById('email').value;
var message = document.getElementById('message');
var password = document.getElementById('password').value;

var isValid = true;
message.innerHTML = '';

if (firstName.length < 3) {
message.innerHTML += '<p class="error">First Name: At least 3 characters required</p>';
isValid = false;
}

if (lastName.length < 3) {
message.innerHTML += '<p class="error">Last Name: At least 3 characters required</p>';
isValid = false;
}

if (!/^\d{8}$/.test(mobileNo)) {
message.innerHTML += '<p class="error">Mobile No: Must contain 8 digits</p>';
isValid = false;
}

if (!email) {
message.innerHTML += '<p class="error">Email: Please enter an email</p>';
isValid = false;
} else if (!/\S+@\S+\.\S+/.test(email)) {
message.innerHTML += '<p class="error">Email: Invalid email format</p>';
isValid = false;
}

if (!password) {
message.innerHTML += '<p class="error">Password: Please enter a password</p>';
isValid = false;
} else if (password.length < 8) {
message.innerHTML += '<p class="error">Password: At least 8 characters required</p>';
isValid = false;
}

var emptyFields = [firstName, lastName, mobileNo, email, password].filter(field => !field);
if (emptyFields.length === 5) {
// No field is filled
message.innerHTML = '<p class="error">Please enter your information</p>';
} else if (emptyFields.length > 0) {
// Some fields are not filled
message.innerHTML = `<p class="error">Please fill the remaining details</p>`;
} else if (isValid) {
// Form submitted successfully
displayUserName(firstName, lastName);

// Store user's name in local storage
localStorage.setItem('firstName', firstName);
localStorage.setItem('lastName', lastName);

// Hide the registration form
var formContainer = document.getElementById('registrationFormContainer');
formContainer.style.display = 'none';

// Remove the "Get Started" button
var getStartedButton = document.querySelector('.btn1');
if (getStartedButton) {
getStartedButton.style.display = 'none';
}

alert("Form submitted successfully!");
}
}


function displayUserName(firstName, lastName) {
var userNameElement = document.getElementById('userName');
userNameElement.innerHTML = `Welcome, Explorer ${firstName} ${lastName}!`;
userNameElement.style.display = 'inline';
}
