document.querySelectorAll("[data-compare]").forEach((compareFrame) => {
  const compareRange = compareFrame.querySelector(".compare-range");
  if (!compareRange) {
    return;
  }

  const setCompare = (value) => {
    compareFrame.style.setProperty("--compare-position", `${value}%`);
  };

  setCompare(compareRange.value);

  compareRange.addEventListener("input", (event) => {
    setCompare(event.target.value);
  });
});

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scrollTarget);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const siteHeader = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".chip-nav a");

if (siteHeader && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteHeader.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll(".tilt-card, .magnetic, .switch-btn").forEach((element) => {
  element.addEventListener("pointermove", (event) => {
    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    element.style.setProperty("--pointer-x", `${x}%`);
    element.style.setProperty("--pointer-y", `${y}%`);
    element.style.setProperty("--tilt-x", `${x}%`);
    element.style.setProperty("--tilt-y", `${y}%`);

    if (element.classList.contains("tilt-card")) {
      const rotateY = ((x - 50) / 50) * 4;
      const rotateX = ((50 - y) / 50) * 4;
      element.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    }

    if (element.classList.contains("magnetic")) {
      const moveX = ((x - 50) / 50) * 5;
      const moveY = ((y - 50) / 50) * 5;
      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  });

  element.addEventListener("pointerleave", () => {
    element.style.removeProperty("--pointer-x");
    element.style.removeProperty("--pointer-y");
    element.style.removeProperty("--tilt-x");
    element.style.removeProperty("--tilt-y");
    element.style.transform = "";
  });
});

const experienceData = {
  labios: {
    image:
      "https://images.pexels.com/photos/7479505/pexels-photo-7479505.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Detalle de labios",
    lead:
      "Un look de labios mas luminoso y sofisticado, con una presencia suave que eleva el rostro.",
    points: [
      "Visual pulido y femenino.",
      "Ideal para resaltar el tono del labio.",
      "Seccion util para impulsar reservas.",
    ],
  },
  lashes: {
    image:
      "https://winksboutique.com/wp-content/uploads/2023/08/Untitled-500-x-500-px-14.png",
    alt: "Resultado de extensiones de pestañas",
    lead:
      "Una mirada mas definida, con una sensacion tecnica y precisa que transmite detalle profesional.",
    points: [
      "Perfecto para mostrar trabajo delicado.",
      "Aporta dinamismo y percepcion premium.",
      "Refuerza confianza en el servicio.",
    ],
  },
  studio: {
    image:
      "https://images.pexels.com/photos/7750090/pexels-photo-7750090.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Interior de salon moderno",
    lead:
      "El espacio se siente limpio, contemporaneo y listo para una experiencia beauty mucho mas memorable.",
    points: [
      "Ayuda a vender ambiente y marca.",
      "Le da aire editorial a la web.",
      "Cierra con sensacion de estudio serio.",
    ],
  },
};

const switchButtons = document.querySelectorAll(".switch-btn");
const experienceImage = document.querySelector("#experience-image");
const experienceLead = document.querySelector("#experience-lead");
const experiencePoints = document.querySelector("#experience-points");

if (switchButtons.length && experienceImage && experienceLead && experiencePoints) {
  switchButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.mode;
      const content = experienceData[mode];
      if (!content) {
        return;
      }

      switchButtons.forEach((item) => item.classList.toggle("active", item === button));
      experienceImage.src = content.image;
      experienceImage.alt = content.alt;
      experienceLead.textContent = content.lead;
      experiencePoints.innerHTML = content.points.map((point) => `<li>${point}</li>`).join("");
    });
  });
}
