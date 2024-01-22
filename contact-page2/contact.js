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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database
const database = firebase.database();

// Get the form element
const form = document.querySelector('#myForm');

// Add submit event listener
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get input field values
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const contactNo = document.querySelector('#contactNo').value;
  const purpose = document.querySelector('#purpose').value;

  // Save data to Firebase
  database.ref('menu').push({
    name,
    email,
    contactNo,
    purpose
  });

  // Function to update the viewer count
  function updateViewerCount() {
    // Get a reference to the viewer count in the database
    const viewerCountRef = firebase.database().ref('viewerCount');

    // Increment the viewer count by 1
    viewerCountRef.transaction((currentCount) => {
      return (currentCount || 0) + 1;
    });
  }

  // Call the function to update the viewer count whenever a viewer visits your website
  updateViewerCount();

  // Initialize Email.js with the Public Key
  emailjs.init("YOUR_PUBLIC_KEY");

  // Prepare email template parameters
  const templateParams = {
    to_email: 'furqancoder1@gmail.com',
    from_name: 'teapack534@gmail.com',
    subject: 'Form Submission',
    message: `Name: ${name}\nEmail: ${email}\nContact Number: ${contactNo}\nPurpose: ${purpose}`
  };

  // Define your Email.js service ID and template ID
  const emailjsServiceId = 'YOUR_SERVICE_ID';
  const emailjsTemplateId = 'YOUR_TEMPLATE_ID';

  // Send email using Email.js
  emailjs.send(emailjsServiceId, emailjsTemplateId, templateParams)
    .then((response) => {
      console.log('Email sent successfully:', response);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
});
