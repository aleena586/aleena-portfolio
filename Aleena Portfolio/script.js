const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            formMessage.textContent = "Please complete all fields.";
            return;
        }

        const yourEmail = "aleenajavaid22@gmail.com";

        const mailSubject = encodeURIComponent(subject);
        const mailBody = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );

        formMessage.textContent =
            "Opening your email application...";

        window.location.href =
            "mailto:" + yourEmail +
            "?subject=" + mailSubject +
            "&body=" + mailBody;
    });
}