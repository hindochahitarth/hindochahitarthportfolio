const nameText = "Hi, I'm Hitarth Hindocha";
let nameIndex = 0;
function typeName() {
  if (nameIndex <= nameText.length) {
    document.getElementById("intro-name").innerText = nameText.slice(0, nameIndex++);
    setTimeout(typeName, 90);
  }
}
typeName();

// Theme Toggle with Bootstrap data attribute sync
const themeToggleBtn = document.querySelector(".theme-toggle");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const storedTheme = localStorage.getItem("theme");

const updateThemeIcon = (theme) => {
  themeToggleBtn.innerHTML = theme === "light"
    ? '<i class="bi bi-brightness-high"></i>'
    : '<i class="bi bi-moon-stars"></i>';
};

const applyTheme = (theme) => {
  const isLight = theme === "light";
  document.body.classList.toggle("light", isLight);
  document.body.setAttribute("data-bs-theme", isLight ? "light" : "dark");
  updateThemeIcon(theme);
  localStorage.setItem("theme", theme);
};

function toggleTheme() {
  const nextTheme = document.body.classList.contains("light") ? "dark" : "light";
  applyTheme(nextTheme);
}

applyTheme(storedTheme || (prefersLight ? "light" : "dark"));

// Scroll reveal animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  }
);

document.querySelectorAll(".fade").forEach((el) => observer.observe(el));

// Dynamic Projects
const projects = [
  {
   name: "Spoural Management System",
tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
desc: "Live sports and cultural event management platform deployed at CHARUSAT for real-time registrations and event coordination.",
impact: "Handled 5K+ student registrations with live match updates, winner announcements, and student registration.",
live: "🔴 Live @ CHARUSAT",
link: "http://spoural.charusat.edu.in/"

  },
   {
    name: "MDHostel App",
    tech: ["Flutter", "Dart", "Firebase","API","Postman"],
    desc: "End-to-end hostel management app that remains live for MD Hostel.",
    impact: "Serving 300+ active residents with rent tracking, service requests, and weekly admin broadcasts.",
    live: "🔴 Live @ CHARUSAT Girls Hostel",
    link: "https://play.google.com/store/apps/details?id=com.crown.mdhostel32"
  },
  {
    name: "Auction System",
    live:"",
    tech: ["Spring Boot", "WebSockets", "Thymeleaf","Spring Security"],
    desc: "Realtime bidding engine with authentication, role access, and admin dashboards.",
    impact: "Reduced manual auction ops by 70% through automation.",
    link: "https://github.com/hindochahitarth/ARTSEA"
  },
 
  {
    name: "KidsAcademy App",
    tech: ["Flutter", "Dart","UI/UX"],
    desc: "Developed a kids-learning app with visuals, audio, and interactive games for ages 2–5.",
    impact: "Helps toddlers learn manners, English basics, numbers, and good habits via images, sounds, and playful buttons.",
   // link: "https://github.com/your-github-username/kidsacademy-app"
  },
  {
   name: "Samsung Store Web Application",
  tech: ["Java", "Hibernate", "JSP", "Servlets", "MySQL"],
  desc: "Developed a simple e-commerce web application for Samsung products with user registration, login, product listing, and cart functionality.",
  impact: "Implemented MVC architecture with Hibernate-based CRUD operations to manage users and products efficiently.",
  link: "https://github.com/hindochahitarth/SamsungStore"
  }
];

const projectContainer = document.getElementById("project-container");
projects.forEach((project) => {
  const column = document.createElement("div");
  column.className = "col-md-6 col-lg-4";

  const techBadges = project.tech
    .map((tech) => `<span class="badge rounded-pill badge-tech me-1 mb-1">${tech}</span>`)
    .join("");

  const titleRow = project.link
    ? `
      <a href="${project.link}" target="_blank" rel="noreferrer" class="d-flex justify-content-between align-items-center mb-3 project-link text-decoration-none">
        <h4 class="mb-0">${project.name}</h4>
        <i class="bi bi-arrow-up-right text-accent"></i>
      </a>`
    : `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="mb-0">${project.name}</h4>
        <i class="bi bi-arrow-up-right text-accent"></i>
      </div>`;

  column.innerHTML = `
    <article class="project-card fade">
      ${titleRow}
      ${project.live ? `<span class="badge badge-live mb-3">${project.live}</span>` : ""}
      <p>${project.desc}</p>
      <p class="text-muted small mb-3">${project.impact}</p>
      <div>${techBadges}</div>
    </article>
  `;

  projectContainer.appendChild(column);
  observer.observe(column.querySelector(".project-card"));
});

// EmailJS Contact Form
const contactForm = document.getElementById("contactForm");
const EMAILJS_SERVICE_ID = "service_uqzg8se";
const EMAILJS_TEMPLATE_ID = "template_efj5nub";

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerText;
    submitButton.disabled = true;
    submitButton.innerText = "Sending...";

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
      .then(() => {
        submitButton.innerText = "Sent!";
        contactForm.reset();
        alert("Your message has been sent successfully 🚀");
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.innerText = originalText;
        }, 2500);
      })
      .catch(() => {
        alert("Could not send your message. Please try again.");
        submitButton.disabled = false;
        submitButton.innerText = originalText;
      });
  });
}