/* ===== TYPING EFFECT ===== */
const texts = [
    "UI/UX Designer",
    "Programmer",
    "42 Student",
    "Graphic Designer",
    "Frontend Developer",
    "Software Developer"
];
 
let count = 0;
let index = 0;
let currentText = '';
let letter = '';
const typingSpan = document.querySelector(".typed-text");
 
function type() {
    if (count === texts.length) count = 0;
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    typingSpan.textContent = letter;
    if (letter.length === currentText.length) {
        setTimeout(() => erase(), 2200);
    } else {
        setTimeout(type, 100);
    }
}
 
function erase() {
    letter = currentText.slice(0, --index);
    typingSpan.textContent = letter;
    if (letter.length === 0) {
        count++;
        setTimeout(type, 300);
    } else {
        setTimeout(erase, 50);
    }
}
 
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 800);
});
 
 
/* ===== CANVAS STAR FIELD ===== */
(function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
 
    let W, H, stars = [], nebulas = [];
 
    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
 
    function createStars() {
        stars = [];
        const count = Math.floor((W * H) / 8000);
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.2 + 0.2,
                alpha: Math.random() * 0.7 + 0.1,
                speed: Math.random() * 0.3 + 0.05,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                twinkleOffset: Math.random() * Math.PI * 2,
            });
        }
 
        nebulas = [
            { x: W * 0.15, y: H * 0.3, r: W * 0.18, color: 'rgba(117,70,232,0.04)' },
            { x: W * 0.8,  y: H * 0.7, r: W * 0.15, color: 'rgba(135,245,245,0.03)' },
            { x: W * 0.5,  y: H * 0.5, r: W * 0.12, color: 'rgba(157,110,255,0.03)' },
        ];
    }
 
    let t = 0;
    function draw() {
        ctx.clearRect(0, 0, W, H);
        t += 0.01;
 
        // Nebula blobs
        nebulas.forEach(n => {
            const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
            grad.addColorStop(0, n.color);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fill();
        });
 
        // Stars with twinkle
        stars.forEach(s => {
            const twinkle = Math.sin(t * s.twinkleSpeed * 60 + s.twinkleOffset);
            const alpha = s.alpha * (0.5 + 0.5 * twinkle);
            ctx.globalAlpha = Math.max(0, alpha);
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
 
            // slow drift upward
            s.y -= s.speed * 0.15;
            if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W; }
        });
 
        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }
 
    resize();
    createStars();
    draw();
    window.addEventListener('resize', () => { resize(); createStars(); });
})();
 
 
/* ===== SCROLL-TRIGGERED ANIMATIONS ===== */
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
 
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
 
                    // Progress bars
                    entry.target.querySelectorAll('.progress').forEach(bar => {
                        const w = bar.getAttribute('data-width');
                        setTimeout(() => { bar.style.width = w + '%'; }, 300);
                    });
 
                    // Circular progress
                    entry.target.querySelectorAll('.progress-circle').forEach(circle => {
                        const pct = circle.getAttribute('data-percentage');
                        const circumference = 2 * Math.PI * 36;
                        const offset = circumference - (pct / 100) * circumference;
                        setTimeout(() => { circle.style.strokeDashoffset = offset; }, 500);
                    });
                }, i * 80);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
 
    elements.forEach(el => observer.observe(el));
}
 
 
/* ===== SKILL ITEM MICRO-INTERACTIONS ===== */
function initSkillHovers() {
    const items = document.querySelectorAll('.skill-item, .tool-item, .design-skill-item');
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}
 
 
/* ===== PROJECT FILTER ===== */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const categories = document.querySelectorAll(".project-category");
 
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.getAttribute("data-filter");
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
 
            categories.forEach(cat => {
                const type = cat.getAttribute("data-category");
                if (filter === "all" || filter === type) {
                    cat.style.display = "block";
                    cat.style.animation = 'fadeSlideIn 0.5s ease both';
                } else {
                    cat.style.display = "none";
                }
            });
        });
    });
}
 
 
/* ===== MAGNETIC CARD EFFECT ===== */
function initMagneticCards() {
    document.querySelectorAll('.project-card, .section-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = (-y / rect.height) * 4;
            const rotateY = (x / rect.width) * 4;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}
 
 
/* ===== ACTIVE NAV LINK ON SCROLL ===== */
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(a => a.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => observer.observe(s));
}
 
 
/* ===== DOWNLOAD CV ===== */
function downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/cv/Hajer Al-Zammazi - CV.pdf';
    link.download = 'HajerZam_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
 
 
/* ===== CONTACT FORM ===== */
function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    const submitBtn = document.getElementById("submitBtn");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnIcon = submitBtn.querySelector(".btn-icon");
    const message = document.getElementById("formMessage");
 
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        submitBtn.classList.add("sending");
        btnText.innerHTML = 'Sending<span class="loading-dots"></span>';
        btnIcon.className = "fas fa-spinner fa-spin btn-icon";
        message.classList.remove("show", "success", "error");
 
        try {
            const formData = new FormData(form);
            const res = await fetch(form.action, { method: "POST", body: formData });
            if (res.ok) {
                form.reset();
                message.textContent = "Message sent successfully! I'll get back to you soon ♡";
                message.classList.add("show", "success");
                btnText.textContent = "Message Sent!";
                btnIcon.className = "fas fa-check btn-icon";
                submitBtn.classList.remove("sending");
                submitBtn.classList.add("sent");
                setTimeout(() => {
                    btnText.textContent = "Send Message";
                    btnIcon.className = "fas fa-paper-plane btn-icon";
                    submitBtn.classList.remove("sent");
                    message.classList.remove("show");
                }, 5000);
            } else {
                throw new Error("Submission failed");
            }
        } catch {
            message.textContent = "Oops! Something went wrong. Please try again.";
            message.classList.add("show", "error");
            btnText.textContent = "Send Message";
            btnIcon.className = "fas fa-paper-plane btn-icon";
            submitBtn.classList.remove("sending");
            setTimeout(() => { message.classList.remove("show"); }, 4000);
        }
    });
 
    // Input validation feedback
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => {
            input.style.borderColor = (input.required && !input.value.trim())
                ? 'rgba(255,82,82,0.6)'
                : '';
        });
        input.addEventListener('input', () => {
            input.style.borderColor = '';
        });
    });
}
 
 
/* ===== INIT ALL ===== */
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    initSkillHovers();
    initProjectFilter();
    initMagneticCards();
    initActiveNav();
    initContactForm();
});