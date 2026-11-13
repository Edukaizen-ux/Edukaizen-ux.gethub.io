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
       CONTACT FORM
       Opens the visitor's email application.
       Does not send directly through a server.
    ========================================= */

    if (contactForm && formMessage) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const name =
                document.getElementById("name")?.value.trim() || "";

            const email =
                document.getElementById("email")?.value.trim() || "";

            const message =
                document.getElementById("message")?.value.trim() || "";


            /* CHECK REQUIRED FIELDS */

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


            /* EMAIL DETAILS */

            const recipient = "eduardramos580@email.com";

            const subject = encodeURIComponent(
                `Portfolio message from ${name}`
            );

            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );


            /* OPEN EMAIL APPLICATION */

            formMessage.textContent =
                "Opening your email application...";

            window.location.href =
                `mailto:${recipient}?subject=${subject}&body=${body}`;

        });

    }


    /* =========================================
       CURRENT YEAR
    ========================================= */

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }

});