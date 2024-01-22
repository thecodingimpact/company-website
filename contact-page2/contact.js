// Adding focus and blur event listeners to input fields
const inputs = document.querySelectorAll('.contact__input');

inputs.forEach(ipt => {
  ipt.addEventListener("focus", () => {
    ipt.parentNode.classList.add("focus");
    ipt.parentNode.classList.add("not-empty");
  });
  ipt.addEventListener("blur", () => {
    if (ipt.value === "") {
      ipt.parentNode.classList.remove("not-empty");
    }
    ipt.parentNode.classList.remove("focus");
  });
});

// Toggle dark mode and transition effect
const toggleBtn = document.querySelector(".theme-toggle");
const allElements = document.querySelectorAll("*");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  allElements.forEach(el => {
    el.classList.add('transition');
    setTimeout(() => {
      el.classList.remove("transition");
    }, 1000);
  });
});

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase with your configuration
firebase.initializeApp(firebaseConfig);


// Get a reference to the database
const database = firebase.database();

// Get the form element
const form = document.querySelector('#myForm');

// Add submit event listener
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get input field values
  const firstName = document.querySelector('input[name="First Name"]').value;
  const lastName = document.querySelector('input[name="Last Name"]').value;
  const email = document.querySelector('input[name="Email"]').value;
  const message = document.querySelector('textarea[name="Message"]').value;

  // Save data to Firebase
  database.ref('menu').push({
    firstName,
    lastName,
    email,
    message
  });

  // ... (Email.js code for sending email)
});
