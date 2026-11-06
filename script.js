/* ============================
   EMAILJS & QUOTE SUBMISSION
============================ */
// Initialize EmailJS with your Public Key
if (window.emailjs) {
  emailjs.init("YOUR_PUBLIC_KEY");
}

/* ============================
   SCROLL TO SECTION
============================ */
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

/* ============================
   THEME TOGGLE
============================ */
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

/* ============================
   MODAL LOGIC
============================ */
const modalBackdrop = document.getElementById("modalBackdrop");
const floatingContactBtn = document.getElementById("floatingContactBtn");
const openModalHero = document.getElementById("openModalHero");
const openModalHeader = document.getElementById("openModalHeader");

function openModal() {
  if (modalBackdrop) modalBackdrop.style.display = "flex";
}

function closeModal() {
  if (modalBackdrop) modalBackdrop.style.display = "none";
}

// Attach click listeners safely
if (floatingContactBtn) floatingContactBtn.addEventListener("click", openModal);
if (openModalHero) openModalHero.addEventListener("click", openModal);
if (openModalHeader) openModalHeader.addEventListener("click", openModal);

// Card link listeners with existence checks so they don't break JS if missing
const estimateBtn = document.getElementById("openModalEstimate");
if (estimateBtn) estimateBtn.addEventListener("click", openModal);

const multispectralBtn = document.getElementById("openModalMultispectral");
if (multispectralBtn) multispectralBtn.addEventListener("click", openModal);

const sprayingBtn = document.getElementById("openModalSprayingEstimate");
if (sprayingBtn) sprayingBtn.addEventListener("click", openModal);

// Close modal when clicking outside of modal box
if (modalBackdrop) {
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });
}

// Handle Form Submit inside Modal
const submitBtn = document.querySelector(".modal .btn-full");
if (submitBtn) {
  submitBtn.addEventListener("click", function(e) {
    e.preventDefault();

    const name = document.getElementById("quote-name")?.value;
    const email = document.getElementById("quote-email")?.value;
    const phone = document.getElementById("quote-phone")?.value;
    const service = document.getElementById("quote-service")?.value;
    const description = document.getElementById("quote-description")?.value;

    if (!name || !email) {
      alert("Please enter your name and email address.");
      return;
    }

    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    const templateParams = {
      user_name: name,
      user_email: email,
      user_phone: phone,
      service: service,
      message: description
    };

    if (window.emailjs) {
      emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
        .then(() => {
          alert("Thank you! We'll be in touch soon!");
          
          // Clear form fields
          document.getElementById("quote-name").value = "";
          document.getElementById("quote-email").value = "";
          document.getElementById("quote-phone").value = "";
          document.getElementById("quote-service").value = "";
          document.getElementById("quote-description").value = "";

          submitBtn.innerText = "Submit Request";
          submitBtn.disabled = false;
          closeModal();
        })
        .catch((err) => {
          console.error("EmailJS error:", err);
          alert("Oops! Something went wrong. Please try again.");
          submitBtn.innerText = "Submit Request";
          submitBtn.disabled = false;
        });
    } else {
      alert("Thank you! We'll be in touch soon!");
      submitBtn.innerText = "Submit Request";
      submitBtn.disabled = false;
      closeModal();
    }
  });
}

/* ============================
   CARD FLIP LOGIC
============================ */
function flipCard(btn) {
  const card = btn.closest(".flip-card");
  if (card) card.classList.toggle("flipped");
}

/* ============================
   DRONE ANIMATION (Continuous Loop Across Screen)
============================ */
const drone1 = document.querySelector(".drone-1");
const drone2 = document.querySelector(".drone-2");

function startDroneLoop(drone, startX, endX, duration, delay = 0) {
  if (!drone) return;

  setTimeout(() => {
    let start = null;

    function frame(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);

      const x = startX + (endX - startX) * percent;
      drone.style.transform = `translateX(${x}px)`;

      if (percent < 1) {
        requestAnimationFrame(frame);
      } else {
        // Reset and loop back
        startDroneLoop(drone, startX, endX, duration, 500);
      }
    }

    requestAnimationFrame(frame);
  }, delay);
}

// Animate drones back and forth across full window width
if (drone1) {
  startDroneLoop(drone1, -150, window.innerWidth + 150, 10000, 0);
}
if (drone2) {
  startDroneLoop(drone2, window.innerWidth + 150, -150, 14000, 2000);
}

