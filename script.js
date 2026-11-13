
/* =========================================
   EDUARD E. RAMOS — PORTFOLIO INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");
    const backToTop = document.getElementById("backToTop");

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    const sendButton = document.getElementById("sendButton");

    const yearElement = document.getElementById("year");


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    function closeMenu() {

        if (!navbar || !menuBtn) return;

        navbar.classList.remove("show");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    }


    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", () => {

            const isOpen = navbar.classList.toggle("show");

            menuBtn.setAttribute("aria-expanded", String(isOpen));

            menuBtn.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }

        });


        /* CLOSE MENU AFTER CLICKING A LINK */

        navLinks.forEach((link) => {

            link.addEventListener("click", closeMenu);

        });


        /* CLOSE MENU USING ESCAPE */

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });


        /* CLOSE MENU WHEN RESIZED TO DESKTOP */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 700) {
                closeMenu();
            }

        });

    }


    /* =========================================
       ACTIVE NAVIGATION + BACK TO TOP
    ========================================= */

    let ticking = false;

    function updateOnScroll() {

        const scrollPosition = window.scrollY + 150;

        let currentSection = "home";

        sections.forEach((section) => {

            if (scrollPosition >= section.offsetTop) {

                currentSection = section.id;

            }

        });


        /* UPDATE ACTIVE NAVIGATION */

        navLinks.forEach((link) => {

            const isActive =
                link.getAttribute("href") === `#${currentSection}`;

            link.classList.toggle("active", isActive);

        });


        /* SHOW BACK TO TOP */

        if (backToTop) {

            backToTop.classList.toggle(
                "show",
                window.scrollY > 450
            );

        }

        ticking = false;

    }


    window.addEventListener("scroll", () => {

        if (!ticking) {

            window.requestAnimationFrame(updateOnScroll);

            ticking = true;

        }

    }, { passive: true });


    updateOnScroll();


    /* =========================================
       CONTACT FORM — FORMSPREE
       Sends messages directly from the website.
    ========================================= */

    if (contactForm && formMessage) {

        contactForm.addEventListener("submit", async (event) => {

            event.preventDefault();


            /* GET FORM VALUES */

            const name =
                document.getElementById("name")?.value.trim() || "";

            const email =
                document.getElementById("email")?.value.trim() || "";

            const message =
                document.getElementById("message")?.value.trim() || "";


            /* VALIDATE REQUIRED FIELDS */

            if (!name || !email || !message) {

                formMessage.textContent =
                    "Please complete all fields.";

                return;

            }


            /* VALIDATE EMAIL */

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                formMessage.textContent =
                    "Please enter a valid email address.";

                return;

            }


            /* GET FORMSPREE ENDPOINT FROM FORM ACTION */

            const formEndpoint = contactForm.action;

            if (
                !formEndpoint ||
                formEndpoint.includes("YOUR_FORM_ID")
            ) {

                formMessage.textContent =
                    "The contact form has not been configured yet. Please try again later.";

                console.error(
                    "Please replace YOUR_FORM_ID with your actual Formspree form ID."
                );

                return;

            }


            /* PREPARE FORM DATA */

            const formData = new FormData(contactForm);

            formData.set("name", name);
            formData.set("email", email);
            formData.set("message", message);

            formData.set(
                "_subject",
                `New portfolio message from ${name}`
            );


            /* DISABLE BUTTON WHILE SENDING */

            const originalButtonText = sendButton
                ? sendButton.innerHTML
                : "Send Message";

            if (sendButton) {

                sendButton.disabled = true;

                sendButton.innerHTML =
                    'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

            }

            formMessage.textContent = "Sending your message...";


            try {

                /* SEND MESSAGE TO FORMSPREE */

                const response = await fetch(formEndpoint, {

                    method: "POST",

                    body: formData,

                    headers: {
                        "Accept": "application/json"
                    }

                });


                /* SUCCESS */

                if (response.ok) {

                    formMessage.textContent =
                        "Your message was sent successfully! Thank you for contacting me.";

                    formMessage.style.color = "#ffffff";

                    contactForm.reset();

                } else {

                    /* SERVER ERROR */

                    const result = await response.json().catch(() => ({}));

                    const errorText = result.errors
                        ?.map((error) => error.message)
                        .join(", ");

                    formMessage.textContent =
                        errorText ||
                        "Sorry, your message could not be sent. Please try again.";

                    formMessage.style.color = "#ffffff";

                }

            } catch (error) {

                /* CONNECTION ERROR */

                console.error("Contact form error:", error);

                formMessage.textContent =
                    "Connection error. Please check your internet and try again.";

                formMessage.style.color = "#ffffff";

            } finally {

                /* RESTORE BUTTON */

                if (sendButton) {

                    sendButton.disabled = false;

                    sendButton.innerHTML = originalButtonText;

                }

            }

        });

    }


    /* =========================================
       CURRENT YEAR
    ========================================= */

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }

});
