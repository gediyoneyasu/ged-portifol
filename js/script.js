// Mobile menu functionality
const navbarLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    // Toggle mobile menu visibility
    document.body.classList.toggle("show-mobile-menu");
});

// Close menu when the close button is clicked
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// Close menu when nav link is clicked
navbarLinks.forEach((link) => {
    link.addEventListener("click", () => menuOpenButton.click());
});

// Text animation for hero section
const text = document.querySelector(".second-text");

const textload = () => {
    setTimeout(() => {
        text.textContent = "Graphic Designer";
    }, 0);

    setTimeout(() => {
        text.textContent = "Mobile App Developer";
    }, 4000);

    setTimeout(() => {
        text.textContent = "Website Developer";
    }, 8000);
};

textload();
setInterval(textload, 12000);

// Firebase Contact Form Handler
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('firebaseContactForm');
    const messageDiv = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault(); // Stop default form submission

            // Get form data
            const name = document.getElementById('nameInput').value.trim();
            const email = document.getElementById('emailInput').value.trim();
            const message = document.getElementById('messageInput').value.trim();

            // Validate form
            if (!name || !email || !message) {
                showMessage("Please fill in all fields", "error");
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage("Please enter a valid email address", "error");
                return;
            }

            // Show loading state
            const submitButton = form.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            submitButton.textContent = "Sending...";
            submitButton.disabled = true;

            try {
                // Check if Firebase is initialized
                if (!window.db) {
                    throw new Error("Database connection not available");
                }

                // Save to Firestore
                await window.db.collection('contacts').add({
                    name: name,
                    email: email,
                    message: message,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    date: new Date().toLocaleString()
                });

                console.log('Message saved to Firebase successfully!');

                // Show success message
                showMessage("✅ Thank you! Your message has been sent successfully.", "success");

                // Reset form
                form.reset();

            } catch (error) {
                console.error('Error saving message: ', error);
                showMessage("❌ Oops! Something went wrong. Please try again.", "error");

                // For debugging - show error details
                if (error.message.includes("permission-denied")) {
                    showMessage("❌ Database permission denied. Check Firebase rules.", "error");
                }
            } finally {
                // Restore button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    function showMessage(text, type) {
        if (messageDiv) {
            messageDiv.textContent = text;
            messageDiv.style.backgroundColor = type === 'success' ? 'rgba(29, 233, 182, 0.1)' : 'rgba(255, 107, 107, 0.1)';
            messageDiv.style.color = type === 'success' ? '#1de9b6' : '#ff6b6b';
            messageDiv.style.border = type === 'success' ? '1px solid #1de9b6' : '1px solid #ff6b6b';
            messageDiv.style.display = 'block';

            // Scroll to message
            messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Hide message after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
});

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to current navigation link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        background: #0cdbea !important;
        color: #252525 !important;
        font-weight: 600;
    }
    
    #form-message {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

