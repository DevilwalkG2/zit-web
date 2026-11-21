document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector("#themeToggle");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        if (themeToggle) themeToggle.textContent = "☀️";
    }

    themeToggle?.addEventListener("click", () => {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        if (isDark) {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙";
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️";
        }
    });

    const menuToggle = document.querySelector("#menuToggle");
    const mainNav = document.querySelector("#mainNav");

    menuToggle?.addEventListener("click", () => {
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!expanded));
        mainNav?.classList.toggle("open");
    });

    const daysEl = document.querySelector("#days");
    if (daysEl) {
        const updateCountdown = () => {
            const christmas = new Date("2026-12-24T00:00:00");
            const now = new Date();
            const diff = christmas - now;

            if (diff <= 0) {
                daysEl.textContent = "0";
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            document.querySelector("#days").textContent = days;
            document.querySelector("#hours").textContent = String(hours).padStart(2, "0");
            document.querySelector("#minutes").textContent = String(minutes).padStart(2, "0");
            document.querySelector("#seconds").textContent = String(seconds).padStart(2, "0");
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            projectCards.forEach((card) => {
                if (filter === "all" || card.dataset.category === filter) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });
    const contactForm = document.querySelector("#contactForm");
    contactForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const nameInput = document.querySelector("#name");
        const emailInput = document.querySelector("#email");
        const messageInput = document.querySelector("#message");
        const nameError = document.querySelector("#nameError");
        const emailError = document.querySelector("#emailError");
        const messageError = document.querySelector("#messageError");
        const formResult = document.querySelector("#formResult");
        let isValid = true;
        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        formResult.textContent = "";

        if (nameInput.value.trim().length < 2) {
            nameError.textContent = "Zadejte prosím své jméno (alespoň 2 znaky).";
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = "Zadejte prosím platnou e-mailovou adresu.";
            isValid = false;
        }

        if (messageInput.value.trim().length < 10) {
            messageError.textContent = "Zpráva musí obsahovat alespoň 10 znaků.";
            isValid = false;
        }

        if (isValid) {
            formResult.textContent = `Děkuji, ${nameInput.value.trim()}! Vaše zpráva byla úspěšně ověřena a odeslána.`;
            contactForm.reset();
        }
    });
});