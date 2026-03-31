// ===== Animation des cartes au scroll =====
const cards = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 },
);

cards.forEach((card) => observer.observe(card));

// Formulaire demande d'aide
const formAide = document.getElementById("formAide");

if (formAide) {
  formAide.addEventListener("submit", (e) => {
    e.preventDefault(); // empêche le reload
    const nom = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    alert(
      `Merci ${nom}, votre message a été envoyé !\nNous vous contacterons à ${email}.`,
    );

    // Réinitialiser le formulaire
    formAide.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const carrousels = document.querySelectorAll(".carrousel");

  carrousels.forEach((carrousel) => {
    const diapositives = carrousel.querySelector(".diapositives");
    const slides = carrousel.querySelectorAll(".diapositive");
    const prevBtn = carrousel.querySelector(".precedent");
    const nextBtn = carrousel.querySelector(".suivant");
    const pointsContainer = carrousel.querySelector(".points");

    let index = 0;

    // Créer les points
    slides.forEach((_, i) => {
      const point = document.createElement("span");
      point.classList.add("point");
      if (i === 0) point.classList.add("active");
      point.addEventListener("click", () => {
        index = i;
        updateCarrousel();
      });
      pointsContainer.appendChild(point);
    });

    const points = pointsContainer.querySelectorAll(".point");

    function updateCarrousel() {
      diapositives.style.transform = `translateX(-${index * 100}%)`;
      points.forEach((p) => p.classList.remove("active"));
      points[index].classList.add("active");
    }

    // Boutons
    prevBtn.addEventListener("click", () => {
      index = index === 0 ? slides.length - 1 : index - 1;
      updateCarrousel();
    });

    nextBtn.addEventListener("click", () => {
      index = index === slides.length - 1 ? 0 : index + 1;
      updateCarrousel();
    });

    // 🔄 Auto-slide toutes les 5s
    setInterval(() => {
      index = index === slides.length - 1 ? 0 : index + 1;
      updateCarrousel();
    }, 5000);
  });
});
