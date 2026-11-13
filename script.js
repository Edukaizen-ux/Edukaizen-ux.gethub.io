
/* =========================================
   EDUARD E. RAMOS — PORTFOLIO JAVASCRIPT
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {

        const isOpen = navbar.classList.toggle("show");

        menuBtn.setAttribute("aria-expanded", String(isOpen));

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars", !isOpen);
            icon.classList.toggle("fa-xmark", isOpen);
        }

        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });

}


/* =========================================
   CLOSE MOBILE MENU
========================================= */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (!navbar || !menuBtn) return;

        navbar.classList.remove("show");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation menu");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("main section[id]");

function updateActiveNavigation() {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 160;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            current = section.id;
        }

    });

    if (!current && window.scrollY < 160) {
        current = "home";
    }

    navLinks.forEach((link) => {

        const isActive =
            link.getAttribute("href") === `#${current}`;

        link.classList.toggle("active", isActive);

    });

}

window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
});

window.addEventListener("load", updateActiveNavigation);


/* =========================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener("click", (event) => {

    if (!navbar || !menuBtn) return;

    const clickedInsideMenu = navbar.contains(event.target);
    const clickedMenuButton = menuBtn.contains(event.target);

    if (
        !clickedInsideMenu &&
        !clickedMenuButton &&
        navbar.classList.contains("show")
    ) {

        navbar.classList.remove("show");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation menu");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    }

});


/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name =
            document.getElementById("name")?.value.trim() || "";

        const email =
            document.getElementById("email")?.value.trim() || "";

        const message =
            document.getElementById("message")?.value.trim() || "";

        if (!name || !email || !message) {

            formMessage.textContent = "Please fill in all fields.";

            return;

        }

        const recipient = "eduardramos580@email.com";

        const subject = encodeURIComponent(
            `Portfolio message from ${name}`
        );

        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        formMessage.textContent =
            "Opening your email application...";

        window.location.href =
            `mailto:${recipient}?subject=${subject}&body=${body}`;

    });

}


/* =========================================
   CURRENT YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =========================================
   IMAGE FALLBACK
   Shows a placeholder if an image is missing.
========================================= */

document.querySelectorAll("img").forEach((img) => {

    img.addEventListener("error", () => {

        img.classList.add("image-error");

        img.alt = "Image unavailable";

    });

});
