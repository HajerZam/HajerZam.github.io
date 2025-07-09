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
        setTimeout(() => erase(), 2000);
    } else {
        setTimeout(type, 100);
    }
}

function erase() {
    letter = currentText.slice(0, --index);
    typingSpan.textContent = letter;

    if (letter.length === 0) {
        count++;
        setTimeout(type, 200);
    } else {
        setTimeout(erase, 50);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 500);
});


function animateOnScroll() {
	const elements = document.querySelectorAll('.animate-on-scroll');
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');

				const progressBars = entry.target.querySelectorAll('.progress');
				progressBars.forEach(bar => {
					const width = bar.getAttribute('data-width');
					setTimeout(() => {
						bar.style.width = width + '%';
					}, 200);
				});

				const circularProgress = entry.target.querySelectorAll('.progress-circle');
				circularProgress.forEach(circle => {
					const percentage = circle.getAttribute('data-percentage');
					const circumference = 2 * Math.PI * 36;
					const offset = circumference - (percentage / 100) * circumference;
					setTimeout(() => {
						circle.style.strokeDashoffset = offset;
					}, 500);
				});
			}
		});
	}, {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	});
	
	elements.forEach(element => {
		observer.observe(element);
	});
}

// Download CV func
function downloadCV() {
	const link = document.createElement('a');
	link.href = 'assets/HajerZam_CV.pdf'; // Update with CV file path
	link.download = 'HajerZam_CV.pdf';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
	animateOnScroll();
});

document.addEventListener('DOMContentLoaded', function() {
	const skillItems = document.querySelectorAll('.skill-item, .tool-item, .design-skill-item');
	skillItems.forEach(item => {
		item.addEventListener('mouseenter', function() {
			this.style.transform = 'translateY(-5px) scale(1.02)';
		});
		
		item.addEventListener('mouseleave', function() {
			this.style.transform = 'translateY(0) scale(1)';
		});
	});
});

// Filter projects by category
document.addEventListener("DOMContentLoaded", () => {
	const filterButtons = document.querySelectorAll(".filter-btn");
	const categories = document.querySelectorAll(".project-category");

	filterButtons.forEach(btn => {
		btn.addEventListener("click", () => {
			const filter = btn.getAttribute("data-filter");

			filterButtons.forEach(b => b.classList.remove("active"));
			btn.classList.add("active");

			categories.forEach(category => {
				const categoryType = category.getAttribute("data-category");
				if (filter === "all" || filter === categoryType) {
					category.style.display = "block";
				} else {
					category.style.display = "none";
				}
			});
		});
	});
});

// contact form
document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("contactForm");
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
			const res = await fetch(form.action, {
				method: "POST",
				body: formData
			});
			
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
			
		} catch (error) {
			console.error("Form submission error:", error);

			message.textContent = "Oops! Something went wrong. Please try again.";
			message.classList.add("show", "error");

			btnText.textContent = "Send Message";
			btnIcon.className = "fas fa-paper-plane btn-icon";
			submitBtn.classList.remove("sending");
			
			setTimeout(() => {
				message.classList.remove("show");
			}, 4000);
		}
	});

	const inputs = form.querySelectorAll('input, textarea');
	inputs.forEach(input => {
		input.addEventListener('blur', () => {
			if (input.required && !input.value.trim()) {
				input.style.borderColor = '#ff5252';
			} else {
				input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
			}
		});
		
		input.addEventListener('input', () => {
			if (input.style.borderColor === 'rgb(255, 82, 82)') {
				input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
			}
		});
	});
});
