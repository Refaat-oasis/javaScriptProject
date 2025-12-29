     document.addEventListener("DOMContentLoaded", function () {
            const currentPage = window.location.pathname.split("/").pop();

            document.querySelectorAll("#links a").forEach(link => {
                const linkPage = link.getAttribute("href").split("/").pop();

                if (linkPage === currentPage) {
                    link.classList.add("active");
                }
            });
        });