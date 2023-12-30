

async function validateSignup(event) {
    // Check if the form is being submitted

    event.preventDefault();

    if (event.submitter && event.submitter.type === 'submit') {
        // Add your login validation logic here

        let usernameInput = document.getElementById("username");
        let passwordInput = document.getElementById("password");
        let emailInput = document.getElementById("email");

        let username = usernameInput.value;
        let password = passwordInput.value;
        let email = emailInput.value;

        try {
            const response = await fetch('/initializeAccount', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({username, password, email}),
            });

            const data = await response.json();

            if (data.success) {
              window.location.href = 'MainPage.html';
            }
            else {
              alert('Failed to sign up account. ${data.message)');
            }
    
          }
          catch (error) {
            alert('Error:', error);
          }
      }
    
      // Continue with form submission for other buttons
      return true;
}

function back() {
    // Add any logic you need for the "Back" button
    window.location.href = 'MainPage.html';
  }
