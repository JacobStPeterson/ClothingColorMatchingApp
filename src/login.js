
async function validateLogin(event) {
    // Check if the form is being submitted

    event.preventDefault();

    let usernameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");
    let loginMessage = document.getElementById("loginMessage");

    let username = usernameInput.value;
    let password = passwordInput.value;

    if (event.submitter && event.submitter.type === 'submit') {
      // Add your login validation logic here
      
      try {
        const response = await fetch('/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username, password}),
        });
        const data = await response.json();

        if (data.success) {
          window.location.href = 'home.html';
        }
        else {
          alert('Login failed. ${data.message)');
        }

      }
      catch (error) {
        alert('Error:', error);
      }


      //alert("Login button pressed");
  
      // Return false to prevent the form from submitting
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

  // dummy function - deprecate asap
  function validateUsername(username) {

    if (username === "user") {
      return true;
    }
    return false;
  }

  function validatePassword(password) {

    if (password === "pass") {
      return true;
    }
    return false;
  }