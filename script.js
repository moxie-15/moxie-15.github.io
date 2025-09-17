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

// Project Data (screenshots + Google Drive links)
const projectsData = [
  {
    title: "Sign-in Page (Basic)",
    desc: "A clean Flutter UI project showcasing basic sign-in form design with responsive layout.",
    media: [{ type: "img", src: "assets/images/signin-basic.png" }],
    videoLink: "https://drive.google.com/your-signin-basic-demo"
  },
  {
    title: "Sign-in with Firebase Auth",
    desc: "A Flutter project integrating Firebase Authentication for user login and signup.",
    media: [{ type: "img", src: "assets/images/signin-firebase.png" }],
    videoLink: "https://drive.google.com/your-firebase-demo"
  },
  {
    title: "Start & Splash Screens",
    desc: "Flutter animated splashscreen and start screen to improve UX during app loading.",
    media: [{ type: "img", src: "assets/images/splashscreen.png" }]
  },
  {
    title: "Quiz Screen",
    desc: "Interactive Flutter quiz screen that displays multiple-choice questions with score tracking.",
    media: [{ type: "img", src: "assets/images/quizscreen.png" }]
  },
  {
    title: "Logout Page",
    desc: "A logout flow built in Flutter, with Firebase authentication integration.",
    media: [{ type: "img", src: "assets/images/logout.png" }]
  },
  {
    title: "Mi_ID Card App",
    desc: "Flutter app that generates a digital student ID card with customizable fields.",
    media: [{ type: "img", src: "assets/images/miid.png" }]
  },
  {
    title: "Dice Roller App",
    desc: "Fun Flutter app that shuffles dice on tap, demonstrating randomization and state updates.",
    media: [{ type: "img", src: "assets/images/dice.png" }]
  },
  {
    title: "Fashion App (Figma → Flutter)",
    desc: "Converted a Figma design into a full Flutter fashion shopping app with interactive UI.",
    media: [{ type: "img", src: "assets/images/fashion.png" }],
    videoLink: "https://drive.google.com/your-fashion-demo"
  },
  {
    title: "CBT App (Windows v1.0)",
    desc: "A fully functional Computer-Based Testing app built with Flutter and exported as a Windows .exe (v1.0). Includes sign-in, quiz, results, and logout features.",
    media: [{ type: "img", src: "assets/images/cbt.png" }],
    videoLink: "https://drive.google.com/your-cbt-demo"
  },
  {
    title: "Flutter App",
    desc: "General-purpose Flutter app with Firebase integration, demonstrating state management and reusable widgets.",
    media: [{ type: "img", src: "assets/images/flutter-app.png" }]
  },
  {
    title: "Web App",
    desc: "Responsive web app for learning progress tracking, built with HTML, CSS, JS.",
    media: [{ type: "img", src: "assets/images/web-app.png" }],
    videoLink: "https://drive.google.com/your-web-demo"
  },
  {
    title: "Portfolio Website",
    desc: "This portfolio website itself, built with HTML, CSS, JS, and animations to showcase my work.",
    media: [{ type: "img", src: "assets/images/portfolio.png" }]
  }
];

// Open modal on project card click
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const project = projectsData.find(p => p.title === card.dataset.title);
    if (!project) return;

    demoTitle.textContent = project.title;
    demoDesc.textContent = project.desc;
    demoMedia.innerHTML = "";

    // Add screenshots
    project.media.forEach(item => {
      if(item.type === "img"){
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = `${project.title} screenshot`;
        demoMedia.appendChild(img);
      }
    });

    // Add Google Drive video link (if available)
    if(project.videoLink){
      const link = document.createElement("a");
      link.href = project.videoLink;
      link.target = "_blank";
      link.textContent = "▶ View Full Video Demo (Google Drive)";
      link.classList.add("video-link");
      demoMedia.appendChild(link);
    }

    projectModal.style.display = "flex";
  });

  // Hover glow effect
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
