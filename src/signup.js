

function validateSignup(event) {
    // Check if the form is being submitted
    if (event.submitter && event.submitter.type === 'submit') {
        // Add your login validation logic here
        alert("account not actually created. will push you through\n" 
            + "to the home page anyway");
    
        // Return false to prevent the form from submitting
        return false;
      }
    
      // Continue with form submission for other buttons
      return true;
}

function back() {
    // Add any logic you need for the "Back" button
    window.location.href = 'MainPage.html';
  }
