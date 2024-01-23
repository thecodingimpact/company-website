// Function to validate form data
function validateFormData(formData) {
  // Implement your validation logic here
  // Return true if valid, false otherwise
  return true;
}

// Function to handle input focus and blur events
function handleInputEvents(ipt) {
  ipt.addEventListener("focus", () => {
    ipt.parentNode.classList.add("focus", "not-empty");
  });

  ipt.addEventListener("blur", () => {
    if (ipt.value === "") {
      ipt.parentNode.classList.remove("not-empty");
    }
    ipt.parentNode.classList.remove("focus");
  });
}

// Color-changing background
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
  apiKey: "AIzaSyDMSGsbkHALvkiS4mcBdRmx__ybdz_pA18",
  authDomain: "chat-app-bf22d.firebaseapp.com",
  databaseURL: "https://chat-app-bf22d-default-rtdb.firebaseio.com",
  projectId: "chat-app-bf22d",
  storageBucket: "chat-app-bf22d.appspot.com",
  messagingSenderId: "961267170800",
  appId: "1:961267170800:web:e6a72daf5d7ed80cb9b135"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database
const database = firebase.database();

// Get the form element
const form = document.querySelector('#myForm');

// ... (previous code)

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
  emailjs.init("RlxjAgahjJR2mPZ92");

  // Prepare email template parameters
  const templateParams = {
    to_email: 'furqancoder1@gmail.com',
    from_name: 'teapack534@gmail.com',
    subject: 'Form Submission',
    message: `Name: ${name}\nEmail: ${email}\nContact Number: ${contactNo}\nPurpose: ${purpose}`
  };

  // Define your Email.js service ID and template ID
  const emailjsServiceId = 'service_4qs7xct';
  const emailjsTemplateId = 'template_5ufavk6';

  // Send email using Email.js
  emailjs.send(emailjsServiceId, emailjsTemplateId, templateParams)
    .then((response) => {
      console.log('Email sent successfully:', response);
      alert('Your message is recorded. Our team will contact you soon');
        location.reload();

    })
    .catch((error) => {
      console.error('Error sending email:', error);
          alert('There was an error submitting your message. Please try again later.');
    });
});
