document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const submitButton = document.getElementById("submitButton");
    const buttonText = submitButton.querySelector(".button-text");
    const buttonSpinner = submitButton.querySelector(".spinner-border");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Show loading state
        submitButton.disabled = true;
        buttonText.textContent = "Sending...";
        buttonSpinner.classList.remove("d-none");
        document
            .getElementById("submitLoadingMessage")
            .classList.remove("d-none");

        // Hide any previous messages
        document.getElementById("submitSuccessMessage").classList.add("d-none");
        document.getElementById("submitErrorMessage").classList.add("d-none");

        // Get form data
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            message: document.getElementById("message").value,
        };

        try {
            const response = await fetch("https://formspree.io/f/xqaqaddv", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Show success message
                document
                    .getElementById("submitSuccessMessage")
                    .classList.remove("d-none");
                form.reset();
            } else {
                // Show error message
                document
                    .getElementById("submitErrorMessage")
                    .classList.remove("d-none");
            }
        } catch (error) {
            // Show error message
            document
                .getElementById("submitErrorMessage")
                .classList.remove("d-none");
        } finally {
            // Reset button state
            submitButton.disabled = false;
            buttonText.textContent = "Send Message";
            buttonSpinner.classList.add("d-none");
            document
                .getElementById("submitLoadingMessage")
                .classList.add("d-none");
        }
    });
});
