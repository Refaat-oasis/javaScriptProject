function handleBooking() {
    const toast = document.getElementById("toast");

    toast.classList.add("show");

   setTimeout(() => {
        window.location.href = "home.html"; 
    }, 2000);
}
