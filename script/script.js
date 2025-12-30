let form = document.getElementById("form");
let email = document.getElementById("email");
let password = document.getElementById("password");
let check = document.getElementById("checkbox")
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");
let message = document.getElementById("message");

function setLocalStorage() {
    localStorage.user = email.value;
    console.log(localStorage.user)
}
form.onsubmit = async (e) => {
    email.classList.remove("error");
    password.classList.remove("error");


    e.preventDefault();
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

    const response = await fetch('users.json');
    const users = await response.json();
    console.log(users)

    const emailToFind = email.value;
    const user = users.find(u => u.email === emailToFind);

    if (user) {
        if (user.password == password.value) {
            if (check.checked) {
                setLocalStorage();
            } else {
                localStorage.removeItem('user');

            }
            window.location.href = 'register.html';
        } else {
            password.classList.add("error")
            passwordError.textContent = "invalid password"
            passwordError.style.color = "red"
            return
        }
    } else {
        email.classList.add("error")

        emailError.textContent = "Invalid email";
        emailError.style.color = "red"

    }






}


