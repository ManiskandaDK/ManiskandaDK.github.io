const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuBtn.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("formNote").textContent =
    "This demo form is ready for a backend/email service. Add your email to activate it.";
});


// ===== EXTRA INTERACTIONS =====

// Active navigation link while scrolling
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const activeNavObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => link.classList.remove("active"));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add("active");
    }
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

sections.forEach(section => activeNavObserver.observe(section));

// Staggered reveal animation for cards
document.querySelectorAll(".skills-grid .skill-card, .projects-grid .project-card").forEach((card, index) => {
  card.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
});

// Small mouse-follow effect on the profile card
const profileCard = document.querySelector(".profile-card");
if (profileCard && window.matchMedia("(pointer:fine)").matches) {
  profileCard.addEventListener("mousemove", (event) => {
    const rect = profileCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    profileCard.style.transform =
      `perspective(900px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) translateY(-4px)`;
  });

  profileCard.addEventListener("mouseleave", () => {
    profileCard.style.transform = "";
  });
}
