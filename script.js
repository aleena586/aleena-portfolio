document.getElementById("year").textContent = new Date().getFullYear();

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const sendButton = document.getElementById("sendButton");

if (contactForm && formMessage && sendButton) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Apni EmailJS IDs yahan add karo
        const serviceID = "service_jh9f2tz";
        const templateID = "template_4t7m8u2";
        const publicKey = "InrOG2oRUFuSHupC-";

        if (
            templateID === "YOUR_TEMPLATE_ID" ||
            publicKey === "YOUR_PUBLIC_KEY"
        ) {
            formMessage.textContent =
                "Please add your EmailJS Template ID and Public Key.";
            return;
        }

        sendButton.disabled = true;
        sendButton.textContent = "Sending...";
        formMessage.textContent = "";

        try {
            await emailjs.sendForm(
                serviceID,
                templateID,
                contactForm,
                { publicKey: publicKey }
            );

            formMessage.textContent =
                "Your message has been sent successfully!";

            contactForm.reset();

        } catch (error) {
            console.error("EmailJS error:", error);

            formMessage.textContent =
                "Message could not be sent. Please check your EmailJS settings.";

        } finally {
            sendButton.disabled = false;
            sendButton.textContent = "Send Message ✉️";
        }
    });
}
