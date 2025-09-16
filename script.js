// =========================
// Mobile Menu Toggle
// =========================
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// =========================
// Dark Mode Toggle with persistence
// =========================
const themeToggle = document.getElementById('theme-toggle');
if(localStorage.getItem('darkMode') === 'true'){
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('darkMode', isDark);
});

// =========================
// Smooth Scroll for Nav Links
// =========================
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
    navLinks.classList.remove('show'); // close menu on mobile
  });
});

// =========================
// Dynamic Greeting + Tagline with fade
// =========================
function rotateText(el, arr, interval){
  let i = 0;
  setInterval(() => {
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = arr[i];
      el.style.opacity = 1;
      i = (i + 1) % arr.length;
    }, 300);
  }, interval);
}

const greetings = ["Hello, I'm Moxie", "Computer Engineering Student", "Flutter Enthusiast"];
const greetingEl = document.getElementById('greeting');
rotateText(greetingEl, greetings, 3000);

const taglines = ["Building tomorrow's apps", "Where code meets creativity", "Transforming ideas into experiences"];
const taglineEl = document.getElementById('tagline');
rotateText(taglineEl, taglines, 4000);

// =========================
// Fade-in sections on scroll
// =========================
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.1 };

const appearOnScroll = new IntersectionObserver((entries, observer)=>{
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add('show');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// =========================
// Project Modal Functionality
// =========================
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('project-demo');
const demoTitle = document.getElementById('demo-title');
const demoDesc = document.getElementById('demo-desc');
const demoMedia = document.getElementById('demo-media');
const closeDemo = document.getElementById('close-demo');

// Project Data
const projectsData = [
  {
    title: "Flutter App",
    desc: "A mobile application built with Flutter to manage tasks efficiently. This project showcases state management, UI/UX design, and Firebase integration.",
    media: [
      { type: "img", src: "assets/images/flutter-app.png" },
      { type: "video", src: "assets/videos/redebugger.mp4" }
    ]
  },
  {
    title: "Web App",
    desc: "A responsive web app for tracking learning progress and coding projects. Built with HTML, CSS, JS and backend integration.",
    media: [
      { type: "img", src: "assets/images/web-app.png" },
      { type: "video", src: "assets/videos/web-demo.mp4" }
    ]
  },
  {
    title: "Portfolio Website",
    desc: "This portfolio website shows skills, projects, and experience, built with HTML, CSS, JS, and dynamic features.",
    media: [
      { type: "img", src: "assets/images/portfolio.png" }
    ]
  }
];

// Open modal on project card click
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const project = projectsData.find(p => p.title === card.dataset.title);
    if(!project) return;

    demoTitle.textContent = project.title;
    demoDesc.textContent = project.desc;
    demoMedia.innerHTML = "";

    project.media.forEach(item => {
      if(item.type === "img"){
        const img = document.createElement("img");
        img.src = item.src;
        demoMedia.appendChild(img);
      } else if(item.type === "video"){
        const video = document.createElement("video");
        video.src = item.src;
        video.controls = true;
        demoMedia.appendChild(video);
      }
    });

    projectModal.style.display = "flex";
  });

  // Add subtle pulse glow
  card.addEventListener('mouseover', () => {
    card.style.boxShadow = "0 0 25px #ffa500, 0 0 50px #ffa500";
  });
  card.addEventListener('mouseout', () => {
    card.style.boxShadow = "";
  });
});

// Close modal
closeDemo.addEventListener('click', () => {
  projectModal.style.display = "none";
});
window.addEventListener('click', (e) => {
  if(e.target === projectModal){
    projectModal.style.display = "none";
  }
});
