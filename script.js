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

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

/* ============================
   MODAL LOGIC
============================ */
const modalBackdrop = document.getElementById("modalBackdrop");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const floatingContactBtn = document.getElementById("floatingContactBtn");
const openModalHero = document.getElementById("openModalHero");

function openModal() {
  modalBackdrop.style.display = "flex";
}

function closeModal() {
  modalBackdrop.style.display = "none";
}

floatingContactBtn.addEventListener("click", openModal);
openModalHero.addEventListener("click", openModal);

// ⭐ NEW LINE — makes your text open the modal
document.getElementById("openModalEstimate").addEventListener("click", openModal);
document.getElementById("openModalMultispectral").addEventListener("click", openModal);
document.getElementById("openModalSprayingEstimate").addEventListener("click", openModal);



modalCloseBtn.addEventListener("click", closeModal);

modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) {
    closeModal();
  }
});


/* ============================
   DRONE ANIMATION (simple)
============================ */
const drone1 = document.querySelector(".drone-1");
const drone2 = document.querySelector(".drone-2");

function animateDrone(drone, startX, endX, duration) {
  let start = null;

  function frame(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const percent = Math.min(progress / duration, 1);

    const x = startX + (endX - startX) * percent;
    drone.style.transform = `translateX(${x}px)`;

    if (percent < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

// Start animations
animateDrone(drone1, -200, 300, 6000);
animateDrone(drone2, 300, -200, 6000);

const openModalHeader = document.getElementById("openModalHeader");
openModalHeader.addEventListener("click", openModal);

function flipCard(btn) {
  const card = btn.closest('.flip-card');
  card.classList.toggle('flipped');
}

