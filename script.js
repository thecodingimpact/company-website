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

// --------------- Back to Top btn -------------------------

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("backToTop").style.display = "block";
  } else {
    document.getElementById("backToTop").style.display = "none";
  }
}

function scrollToTop() {
  const scrollToTopBtn = document.documentElement || document.body;
  scrollToTopBtn.scrollIntoView({
    behavior: "smooth",
  });
}

//  ---------------------------------------------- Scroll Reveal---------------------------------

const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  // reset: true
});

sr.reveal(`.hero, .portfolio-reveal, .ab-count, .service-reveal`);
sr.reveal(`.project-reveal, .work-reveal-1 , .service-reveal-1`, {
  delay: 500,
  scale: 0.5,
});
sr.reveal(`.project-reveal-2, .work-reveal-2 , .service-reveal-2`, {
  delay: 800,
  scale: 0.5,
});
sr.reveal(`.project-reveal-3, .work-reveal-3, .service-reveal-3`, {
  delay: 1200,
  scale: 0.5,
});
sr.reveal(`.work-reveal-4`, {
  delay: 1800,
  scale: 0.5,
});
sr.reveal(`.feature-container, .footer-reveal , .team-btn`, {
  delay: 800,
  origin: `bottom`,
});
sr.reveal(`.hero-social-icon`, {
  delay: 700,
});
sr.reveal(`.about-left, .team-des-container`, { origin: "left" });
sr.reveal(`.contact__images, .team-slider`, { origin: "right" });

// --------------------------------------------Firebase configuration------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDMSGsbkHALvkiS4mcBdRmx__ybdz_pA18",
  authDomain: "chat-app-bf22d.firebaseapp.com",
  databaseURL: "https://chat-app-bf22d-default-rtdb.firebaseio.com",
  projectId: "chat-app-bf22d",
  storageBucket: "chat-app-bf22d.appspot.com",
  messagingSenderId: "961267170800",
  appId: "1:961267170800:web:e6a72daf5d7ed80cb9b135",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database
const database = firebase.database();

// Get the form element
const form = document.querySelector("#footer-form");

// Add submit event listener
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get input field values
  const mail = document.querySelector("#mail").value;

  // Save data to Firebase
  database.ref("maillist").push({
    mail,
  });

  // Initialize Email.js with the Public Key
  emailjs.init("RlxjAgahjJR2mPZ92");

  // Prepare email template parameters
  const templateParams = {
    to_email: "furqancoder1@gmail.com",
    from_name: "teapack534@gmail.com",
    subject: "Form Submission",
    message: `Mail: ${mail}`,
  };

  // Define your Email.js service ID and template ID
  const emailjsServiceId = "service_4qs7xct";
  const emailjsTemplateId = "template_5ufavk6";

  // Send email using Email.js
  emailjs
    .send(emailjsServiceId, emailjsTemplateId, templateParams)
    .then((response) => {
      console.log("Email sent successfully:", response);
      alert("You are successfully added in our Mailing List");
      location.reload();
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
});
// Get a reference to the Firebase Realtime Database

// Function to open the modal
function openModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Function to display alerts for messages
function showAlert(message) {
  alert(message);
}

    /* Event listener for the "View Cart" button
    document.getElementById('viewCartBtn').addEventListener('click', () => {
      const user = firebase.auth().currentUser;
      if (user) {
        // User is logged in, fetch and display cart items
        const userEmail = user.email.replace('.', '_');
        const cartItemsRef = database.ref('cartItems/' + userEmail);
        cartItemsRef.once('value', (snapshot) => {
          const cartItems = snapshot.val();
          if (cartItems) {
            const cartItemsList = document.getElementById('cartItemsList');
            cartItemsList.innerHTML = ''; // Clear previous items
            Object.entries(cartItems).forEach(([key, item]) => {
              const li = document.createElement('li');
              li.textContent = `${item.name}: ${item.features.join(', ')}`;
              const deleteBtn = document.createElement('button');
              deleteBtn.textContent = 'Remove';
              deleteBtn.addEventListener('click', () => {
                // Remove item from the cart
                database.ref(`cartItems/${userEmail}/${key}`).remove()
                  .then(() => {
                    console.log('Item removed from cart');
                    showAlert('Item removed from cart');
                    // Remove the item from the DOM
                    li.remove();
                  })
                  .catch(error => {
                    console.error('Error removing item from cart:', error);
                    showAlert('Error removing item from cart');
                  });
              });
              li.appendChild(deleteBtn);
              cartItemsList.appendChild(li);
            });
            // Show the cart container
            document.querySelector('.cart-container').style.display = 'block';
          } else {
            // No items in the cart
            showAlert('Your cart is empty. Add items to place an order.');
          }
        });
      } else {
            // User is not logged in, open modal to login or signup
            openModal();
      }
    });

// Add event listeners to the "Add to Cart" buttons after DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      console.log('Add to Cart button clicked');

      // Check if user is logged in
      const user = firebase.auth().currentUser;
      if (user) {
        // User is signed in, proceed with adding item to cart
        const packageData = {
          name: document.querySelectorAll('.service-card h3')[index].textContent.trim(),
          features: Array.from(document.querySelectorAll('.service-card ul')[index].children).map(li => li.textContent.trim())
        };
        console.log('Package data captured:', packageData);

        // Save the package data in Firebase Realtime Database with the user's email ID as the key
        const userEmail = user.email.replace('.', '_');
        database.ref('cartItems/' + userEmail).push(packageData)
          .then(() => {
            console.log('Package data saved to Firebase Realtime Database');
            showAlert('Item added to cart');
          })
          .catch(error => {
            console.error('Error saving package data:', error);
            showAlert('Error adding item to cart');
          });
      } else {
        // User is not logged in, open modal to login or signup
        openModal();
      }
    });
  });
});

function openModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';
}

function showAlert(message) {
  alert(message);
}


// Event listeners for modal buttons
document.getElementById("loginBtn").addEventListener("click", () => {
  // Handle login logic here
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("User logged in");
      closeModal(); // Close the modal after successful login
      showAlert("Logged in successfully");
    })
    .catch((error) => {
      console.error("Login error:", error.message);
      showAlert("Login failed. Please check your email and password.");
    });
});

document.getElementById("signupBtn").addEventListener("click", () => {
  // Handle signup logic here
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("User signed up");
      closeModal(); // Close the modal after successful signup
      showAlert("Signed up successfully");
    })
    .catch((error) => {
      console.error("Signup error:", error.message);
      showAlert("Signup failed. Please try again.");
    });
});

// Event listener for the "Place Order" button
document.getElementById("placeOrderBtn").addEventListener("click", () => {
  const user = firebase.auth().currentUser;
  if (user) {
    // User is logged in, ask for contact number and name
    const contactNumber = prompt("Please enter your contact number:");
    const name = prompt("Please enter your name:");
    if (contactNumber && name) {
      // Save order details to Firebase Realtime Database
      const userEmail = user.email.replace(".", "_");
      const cartItemsRef = database.ref("cartItems/" + userEmail);
      cartItemsRef.once("value", (snapshot) => {
        const cartItems = snapshot.val();
        if (cartItems) {
          const orderData = {
            contactNumber: contactNumber,
            name: name,
            items: cartItems,
          };
          database
            .ref("orders")
            .push(orderData)
            .then(() => {
              console.log("Order placed successfully");
              showAlert("Order placed successfully");
              // Clear the cart after placing the order
              cartItemsRef
                .remove()
                .then(() => {
                  console.log("Cart cleared");
                })
                .catch((error) => {
                  console.error("Error clearing cart:", error);
                  showAlert("Error clearing cart");
                });
              // Hide the cart container
              document.querySelector(".cart-container").style.display = "none";
            })
            .catch((error) => {
              console.error("Error placing order:", error);
              showAlert("Error placing order. Please try again.");
            });
        } else {
          showAlert("Your cart is empty. Add items to place an order.");
        }
      });
    } else {
      showAlert("Contact number and name are required to place an order.");
    }
  } else {
    showAlert("You need to be logged in to place an order.");
  }
});
// Function to close the modal
function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Event listener for the close button (x)
document.querySelector(".close-btn").addEventListener("click", closeModal); */
