
// mainframe.js

// Function to create and set up the webpage
function setupWebpage() {

    /* Making the webpage and heading **/
    // Create a new heading element
    var heading = document.createElement('h1');

    // Append the heading to the body of the document
    document.body.appendChild(heading);

    /*************************************************/
    /* login options tab*/
    var loginbtn = document.getElementById('loginbtn');
    var signupbtn = document.getElementById('signupbtn');
    // event listeners for the buttons
    loginbtn.addEventListener('click', function() {window.location.href = 'login.html';});
    signupbtn.addEventListener('click', function() {alert('Not implemented yet');});
    /*************************************************/
  }
  
  // Call the setupWebpage function when the webpage has finished loading
  window.onload = setupWebpage;