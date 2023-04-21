"use strict";
// coded by Bhuvaneshwari Sivasangaran

$(document).ready(() => {
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
  const phonePattern = /\b[0-9]{3}[\-]\b[0-9]{3}[\-]\b[0-9]{4}/;

  // the handler for the click event of the submit button
  $("#login_form").submit((event) => {
    let isValid = true;

    // validating email input field
    const email = $("#email").val().trim();
    if (email == "") {
      $("#email").next().text("* This Field is required.");
      setTimeout(() => $("#email").next().text(""), 2000);
      isValid = false;
    } else if (!emailPattern.test(email)) {
      $("#email").next().text("* Must be a valid email address.");
      setTimeout(() => $("#email").next().text(""), 2000);
      isValid = false;
    } else {
      $("#email").next().text("");
    }
    $("#email").val(email);

    // validating phone  input field
    const phone = $("#phone").val().trim();
    if (phone == "") {
      $("#phone").next().text("* This Field is required.");
      setTimeout(() => $("#phone").next().text(""), 2000);
      isValid = false;
    } else if (!phonePattern.test(phone)) {
      $("#phone").next().text("* Must be a valid phone number.");
      setTimeout(() => $("#phone").next().text(""), 2000);
      isValid = false;
    } else {
      $("#phone").next().text("");
    }
    $("#phone").val(phone);

    // preventing the form submit event if form is invalid
    if (isValid == false) {
      event.preventDefault();
    }
  });
}); // end ready
