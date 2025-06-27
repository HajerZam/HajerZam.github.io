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

// Animation progress bars when in view
		// Animate on scroll functionality
		function animateOnScroll() {
			const elements = document.querySelectorAll('.animate-on-scroll');
			
			const observer = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						
						// Animate progress bars
						const progressBars = entry.target.querySelectorAll('.progress');
						progressBars.forEach(bar => {
							const width = bar.getAttribute('data-width');
							setTimeout(() => {
								bar.style.width = width + '%';
							}, 200);
						});
						
						// Animate circular progress
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

		// Download CV function
		function downloadCV() {
			// Replace with actual CV download logic
			alert('CV download functionality would be implemented here');
		}

		// Initialize animations when DOM is loaded
		document.addEventListener('DOMContentLoaded', function() {
			animateOnScroll();
		});

		// Add smooth scrolling and enhanced interactions
		document.addEventListener('DOMContentLoaded', function() {
			// Add hover effects to skill items
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