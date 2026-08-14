/* =========================================================
   Marlowe & Muse - main.js
   This file adds simple interactivity to the forms on the
   Enquiry and Contact pages. It is linked at the bottom of
   each HTML file like this:
   <script src="js/main.js"></script>
   ========================================================= */

// Wait until the whole page has loaded before running any code
window.onload = function () {

  // ---- Handle the enquiry form (on enquiry.html) ----
  var enquiryForm = document.getElementById("enquiry-form");

  // Only run this code if the enquiry form actually exists on this page
  if (enquiryForm) {
    enquiryForm.onsubmit = function (event) {
      event.preventDefault(); // stops the page from refreshing

      // Get the values the user typed in
      var name = document.getElementById("full-name").value;
      var email = document.getElementById("email").value;
      var date = document.getElementById("event-date").value;

      // Very simple check: make sure the required fields are not empty
      if (name === "" || email === "" || date === "") {
        alert("Please fill in your name, email and event date.");
        return; // stop here if something is missing
      }

      // If everything is filled in, show the success message
      document.getElementById("enquiry-success").style.display = "block";

      // Clear the form fields
      enquiryForm.reset();
    };
  }

  // ---- Handle the contact form (on contact.html) ----
  var contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.onsubmit = function (event) {
      event.preventDefault();

      var name = document.getElementById("c-name").value;
      var email = document.getElementById("c-email").value;
      var message = document.getElementById("c-message").value;

      if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields before sending.");
        return;
      }

      document.getElementById("contact-success").style.display = "block";
      contactForm.reset();
    };
  }

};
