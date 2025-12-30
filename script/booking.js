function handleBooking() {
    const toast = document.getElementById("toast");

    // Show notification
    toast.classList.add("show");

    // Redirect after 2.5 seconds
    setTimeout(() => {
        window.location.href = "home.html"; // change to your home page
    }, 2000);
}
