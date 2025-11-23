document.addEventListener('DOMContentLoaded', () => {

    // --- Lenis Smooth Scroll Setup ---
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  // --- End of Lenis Setup ---

    // This code finds all links that start with '#'
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Stop the default instant jump
      e.preventDefault();
      // Tell Lenis to smoothly scroll to the target
      lenis.scrollTo(this.getAttribute('href'));
    });
  });

  // --- 1. Dark Mode Toggle ---
  const toggle = document.getElementById('dark-mode-toggle'); 
  const body = document.body;

  const applyTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
      if (toggle) toggle.checked = true;
    } else {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      if (toggle) toggle.checked = false;
    }
  };

  if (toggle) {
    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      } else {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
  applyTheme();

  // --- 2. Re-Animating Counter ---
  const statsSection = document.querySelector('.about-stats');
  if (statsSection) {
    const counters = document.querySelectorAll('.counter');
    const animateCounters = () => { counters.forEach(counter => { const target = +counter.getAttribute('data-target'); counter.innerText = '0'; const updateCount = () => { const count = +counter.innerText; const increment = Math.ceil(target / 200); if (count < target) { counter.innerText = Math.min(count + increment, target); setTimeout(updateCount, 15); } else { counter.innerText = target; } }; updateCount(); }); };
    const resetCounters = () => { counters.forEach(counter => { counter.innerText = '0'; }); };
    const counterObserver = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { animateCounters(); } else { resetCounters(); } }); }, { threshold: 0.5 });
    counterObserver.observe(statsSection);
  }

  // --- 3. General Content Animation on Scroll ---
  const animatedItems = document.querySelectorAll('[data-animation]');
  const observer = new IntersectionObserver((entries, observer) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.1 });
  animatedItems.forEach(item => { observer.observe(item); });

  // NOTE: The AJAX form script has been removed to ensure reliable submission.
  
});