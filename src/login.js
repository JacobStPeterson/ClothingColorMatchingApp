
function validateLogin(event) {
    // Check if the form is being submitted
    if (event.submitter && event.submitter.type === 'submit') {
      // Add your login validation logic here
      alert("Login button pressed");
  
      // Return false to prevent the form from submitting
      window.location.href = 'home.html';
      return false;
    }
  
    // Continue with form submission for other buttons
    return true;
  }
  
  function back() {
    // Add any logic you need for the "Back" button
    window.location.href = 'MainPage.html';
  }
  
  function forgotPassword() {
    // Add any logic you need for the "Forgot Password" button
    alert("Forgot Password button pressed");
  }
