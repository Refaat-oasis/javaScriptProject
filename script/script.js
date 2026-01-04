let form = document.getElementById("form");
let email = document.getElementById("email");
let password = document.getElementById("password");
let check = document.getElementById("checkbox");
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");
let message = document.getElementById("message");

function setLocalStorage(username) {
    localStorage.setItem("username", username);
}

form.onsubmit = async (e) => {
    e.preventDefault();

    email.classList.remove("error");
    password.classList.remove("error");

    emailError.textContent = "";
    passwordError.textContent = "";
    message.textContent = "";

    if (!email.value || !password.value) {
        message.textContent = "Please fill in all inputs";
        message.style.color = "red";

        if (!email.value) email.classList.add("error");
        if (!password.value) password.classList.add("error");
        return;
    }

    const response = await fetch('../json/users.json');
    const users = await response.json();

    const user = users.find(u => u.email === email.value);

    if (!user) {
        email.classList.add("error");
        emailError.textContent = "Invalid email";
        emailError.style.color = "red";
        return;
    }

    if (user.password !== password.value) {
        password.classList.add("error");
        passwordError.textContent = "Invalid password";
        passwordError.style.color = "red";
        return;
    }

    /* SUCCESS */
    if (check.checked) {
        setLocalStorage(user.username);
    } else {
        localStorage.removeItem("username");
    }

    window.location.href = "home.html";
};
