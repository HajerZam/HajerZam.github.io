// Fade-in effect on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document.querySelectorAll('.fade-section').forEach(section => {
  section.classList.add('hidden');
  observer.observe(section);
});

// Parallax scrolling effect
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.parallax').forEach(el => {
    const speed = el.getAttribute('data-speed') || 0.5;
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
});