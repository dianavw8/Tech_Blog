// Get the form and inputs
const form = document.querySelector('.signup-form');
const emailInput = document.querySelector('#email-login');
const nameInput = document.querySelector('#name-login');
const passwordInput = document.querySelector('#password-login');
const passwordConfirmInput = document.querySelector('#password-confirm');

// Listen for form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Get the values from the inputs
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    // Check if the passwords match
    if (password !== passwordConfirm) {
        alert('Passwords do not match');
        return;
    }

    // Send the data to the server
    const response = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
        headers: { 'Content-Type': 'application/json' },
    });
    // Check if the signup was successful
    if (response.ok) {
        document.location.replace('/dashboard');
        
    } else {
        alert('Error signing up');
    }
});
