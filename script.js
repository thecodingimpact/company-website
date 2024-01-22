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
