document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input[required]');
    const submitButton = form.querySelector('button[type="submit"]');
    const nameRegex = /^[A-Za-z]{3,20}$/;
    const alphaNumericRegex = /^[a-z0-9]{3,20}$/i;
    const emailRegex = /^[a-z0-9._%+-]+@northeastern\.edu$/i;
    // Strong password regex: At least one uppercase letter, one lowercase letter, one number, and one special character
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    inputs.forEach(input => {
        input.isValid = false; 

        input.addEventListener('input', () => {
            validateField(input);
            validateForm();
        });
    });

function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    const messageElement = document.getElementById(`${fieldId}Validation`);
    let isValid = true;
    let errorMessage = "";

    if (fieldId === 'email') {
        isValid = emailRegex.test(value);
        errorMessage = "Please enter a valid Northeastern email address.";
    } else if (fieldId === 'firstName' || fieldId === 'lastName') {
        isValid = nameRegex.test(value);
        errorMessage = "Names must be 3-20 alphabetic characters.";
    } else if (fieldId === 'username') {
        isValid = alphaNumericRegex.test(value);
        errorMessage = "Username must be 3-20 alphanumeric characters.";
    } else if (fieldId === 'password') {
        isValid = strongPasswordRegex.test(value);
        errorMessage = isValid ? "" : "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.";
        if (document.getElementById('confirmPassword').value.trim() !== "") {
            validateField(document.getElementById('confirmPassword'));
        }
    } else if (fieldId === 'confirmPassword') {
        const passwordValue = document.getElementById('password').value.trim();
        isValid = value === passwordValue;
        errorMessage = isValid ? "" : "Passwords do not match.";
        if (!strongPasswordRegex.test(passwordValue)) {
            document.getElementById('passwordValidation').textContent = "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.";
            document.getElementById('password').isValid = false;
        }
    }

    field.isValid = isValid;
    messageElement.style.display = isValid ? 'none' : 'block';
    messageElement.textContent = errorMessage;
    messageElement.style.color = 'red'; 
}



    function validateForm() {
        let formIsValid = Array.from(inputs).every(input => input.isValid);
        submitButton.disabled = !formIsValid;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Form submitted successfully!');
        inputs.forEach(input => {
            input.value = '';
            const messageElement = document.getElementById(`${input.id}Validation`);
            messageElement.style.display = 'none';
            input.isValid = false;
        });
        submitButton.disabled = true;
    });
});
