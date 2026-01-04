

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("pass");
    const repass = document.getElementById("repass");


    function showError(input, message) {
        let errorElem = input.nextElementSibling;
        if (!errorElem || !errorElem.classList.contains("error-message")) {
            errorElem = document.createElement("div");
            errorElem.classList.add("error-message");
            input.parentNode.insertBefore(errorElem, input.nextSibling);
        }
        errorElem.style.color = "red";
        errorElem.style.fontSize = "12px";
        errorElem.style.marginTop = "-10px";
        errorElem.style.marginBottom = "10px";
        errorElem.textContent = message;
        input.style.borderColor = "red";
    }


    function clearError(input) {
        let errorElem = input.nextElementSibling;
        if (errorElem && errorElem.classList.contains("error-message")) {
            errorElem.textContent = "";
        }
        input.style.borderColor = "#456882";
    }


    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let valid = true;


        if (username.value.trim() === "") {
            showError(username, "Username is required");
            valid = false;
        } else if (username.value.trim().length < 3) {
            showError(username, "Username must be at least 3 characters");
            valid = false;
        } else {
            clearError(username);
        }


        if (email.value.trim() === "") {
            showError(email, "Email is required");
            valid = false;
        } else if (!isValidEmail(email.value.trim())) {
            showError(email, "Email is not valid");
            valid = false;
        } else {
            clearError(email);
        }


        if (password.value === "") {
            showError(password, "Password is required");
            valid = false;
        } else if (password.value.length < 6) {
            showError(password, "Password must be at least 6 characters");
            valid = false;
        } else {
            clearError(password);
        }


        if (repass.value === "") {
            showError(repass, "Please confirm your password");
            valid = false;
        } else if (repass.value !== password.value) {
            showError(repass, "Passwords do not match");
            valid = false;
        } else {
            clearError(repass);
        }

        if (valid) {
            form.reset();
            window.location.href = "home.html";
        }
    });
});
