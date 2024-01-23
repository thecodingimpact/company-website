"use strict";

// ---------------------------------------------Preload--------------------------------------------

// loading will end after document is loaded

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

// --------------------------------------------------Sidebar------------------------------------------

function openNav() {
  const sidePanel = document.getElementById("mysidepanel");
  if (sidePanel) {
    sidePanel.style.left = "0";
  } else {
    console.error("sidepanel not found");
  }
}
function closeNav() {
  const sidePanel = document.getElementById("mysidepanel");
  if (sidePanel) {
    sidePanel.style.left = "-320px";
  }
}
function rightCloseNav() {
  const rightSide = document.getElementById("right-side");
  if (rightSide) {
    rightSide.style.right = "-355px";
  }
}
function rightOpenNav() {
  const rightSide = document.getElementById("right-side");
  if (rightSide) {
    rightSide.style.right = "0";
  }
}

// --------------------------------------------------Portfolio gallery tab------------------------------------------

function open_img(evt, cityname) {
  let i, tabcontent, tablinks;

  // hide all tab content
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // show the selected tab and its contents.
  document.getElementById(cityname).style.display = "block";
  evt.currentTarget.classList.add("active");
}
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
const form = document.querySelector('#footer-form');


// Add submit event listener
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get input field values
  const mail = document.querySelector('#mail').value;

  // Save data to Firebase
  database.ref('menu').push({
     mail
  });


  // Initialize Email.js with the Public Key
  emailjs.init("RlxjAgahjJR2mPZ92");

  // Prepare email template parameters
  const templateParams = {
    to_email: 'furqancoder1@gmail.com',
    from_name: 'teapack534@gmail.com',
    subject: 'Form Submission',
    message: `Mail: ${mail}`
  };

  // Define your Email.js service ID and template ID
  const emailjsServiceId = 'service_4qs7xct';
  const emailjsTemplateId = 'template_5ufavk6';

  // Send email using Email.js
  emailjs.send(emailjsServiceId, emailjsTemplateId, templateParams)
    .then((response) => {
      console.log('Email sent successfully:', response);
            alert('You are successfully added in our Mailing List');
      location.reload();
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
});
