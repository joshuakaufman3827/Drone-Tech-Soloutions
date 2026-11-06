/* ============================
   SETTINGS — fill these in
============================ */
// Where quote requests go if EmailJS isn't set up yet (opens the visitor's email app).
const QUOTE_EMAIL = "rdentondts@gmail.com";

// To send quotes silently in the background instead, create a free EmailJS account
// (emailjs.com), paste your three keys below, and add this line in index.html
// just ABOVE <script src="script.js">:
//   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
const EMAILJS = {
  publicKey: "YOUR_PUBLIC_KEY",
  serviceId: "YOUR_SERVICE_ID",
  templateId: "YOUR_TEMPLATE_ID",
};
const emailjsReady =
  window.emailjs && !Object.values(EMAILJS).some(v => v.startsWith("YOUR_"));
if (emailjsReady) emailjs.init({ publicKey: EMAILJS.publicKey });

/* ============================
   SCROLL TO SECTION
============================ */
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

/* ============================
   THEME TOGGLE (dark ↔ light, remembered between visits)
============================ */
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  if (themeToggle) {
    themeToggle.textContent = theme === "light" ? "🌙 Dark" : "☀️ Light";
    themeToggle.setAttribute("aria-label", `Switch to ${theme === "light" ? "dark" : "light"} theme`);
  }
}

let savedTheme = "dark";
try { savedTheme = localStorage.getItem("dts-theme") || "dark"; } catch (e) {}
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const next = document.body.classList.contains("light") ? "dark" : "light";
    applyTheme(next);
    try { localStorage.setItem("dts-theme", next); } catch (e) {}
  });
}

/* ============================
   QUOTE MODAL
============================ */
const quoteModal = document.getElementById("quoteModal");
const closeModalBtn = document.getElementById("closeModal");
const serviceSelect = document.getElementById("service");

function openModal(service) {
  if (!quoteModal) return;
  if (service && serviceSelect) serviceSelect.value = service;
  quoteModal.classList.add("open");
  document.body.style.overflow = "hidden";
  const first = document.getElementById("name");
  if (first) first.focus();
}

function closeModal() {
  if (!quoteModal) return;
  quoteModal.classList.remove("open");
  document.body.style.overflow = "";
}

["openModalHero", "openModalHeader"].forEach(id => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener("click", () => openModal());
});

// "Get a Quote" on the back of each card pre-selects that service
const serviceByCard = ["wildlife", "aquatic", "solar", "spraying", "multispectral"];
document.querySelectorAll(".flip-card").forEach((card, i) => {
  const btn = card.querySelector("[data-service-quote]");
  if (btn) btn.addEventListener("click", () => openModal(serviceByCard[i]));
});

if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

if (quoteModal) {
  quoteModal.addEventListener("click", (e) => {
    if (e.target === quoteModal) closeModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ============================
   QUOTE FORM SUBMIT
============================ */
const quoteForm = document.getElementById("quoteForm");
const submitBtn = document.getElementById("submitQuote");
const formStatus = document.getElementById("formStatus");

if (quoteForm) {
  quoteForm.addEventListener("submit", (e) => {
    e.preventDefault(); // stop the page from reloading

    const data = {
      name: quoteForm.name.value.trim(),
      email: quoteForm.email.value.trim(),
      phone: quoteForm.phone ? quoteForm.phone.value.trim() : "",
      service: serviceSelect.options[serviceSelect.selectedIndex].text,
      message: quoteForm.message.value.trim(),
    };

    if (emailjsReady) {
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
      emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
        user_name: data.name,
        user_email: data.email,
        user_phone: data.phone,
        service: data.service,
        message: data.message,
      })
        .then(() => {
          formStatus.textContent = "Thank you! We'll be in touch soon.";
          quoteForm.reset();
          setTimeout(closeModal, 1800);
        })
        .catch((err) => {
          console.error("EmailJS error:", err);
          formStatus.textContent = `Something went wrong. Please email us at ${QUOTE_EMAIL}.`;
        })
        .finally(() => {
          submitBtn.textContent = "Submit Request";
          submitBtn.disabled = false;
        });
    } else {
      // Fallback: open the visitor's email app with everything filled in
      const subject = `Quote request: ${data.service} — ${data.name}`;
      const body =
        `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n` +
        `Service: ${data.service}\n\nProject details:\n${data.message}`;
      window.location.href =
        `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      formStatus.textContent = "Your email app should open with your request filled in. Just hit send.";
    }
  });
}

/* ============================
   CARD FLIP
============================ */
function flipCard(btn) {
  const card = btn.closest(".flip-card");
  if (card) card.classList.toggle("flipped");
}

/* Drones are animated with CSS (see "DRONES" in styles.css),
   so they keep working when the window is resized. */


