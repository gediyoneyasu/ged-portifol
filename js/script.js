// Mobile menu functionality
const navbarLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());

navbarLinks.forEach((link) => {
    link.addEventListener("click", () => menuOpenButton.click());
});

// Text animation for hero section
const text = document.querySelector(".second-text");
const textload = () => {
    setTimeout(() => { text.textContent = "Graphic Designer"; }, 0);
    setTimeout(() => { text.textContent = "Mobile App Developer"; }, 4000);
    setTimeout(() => { text.textContent = "Website Developer"; }, 8000);
};
textload();
setInterval(textload, 12000);

// Firebase Contact Form - FIXED AND SIMPLE
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('firebaseContactForm');
    const messageDiv = document.getElementById('form-message');
    const submitButton = form.querySelector('.submit-button');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get values
        const name = document.getElementById('nameInput').value.trim();
        const email = document.getElementById('emailInput').value.trim();
        const message = document.getElementById('messageInput').value.trim();

        // Simple validation
        if (!name || !email || !message) {
            showMessage("Please fill in all fields", "error");
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            showMessage("Please enter a valid email", "error");
            return;
        }

        // Change button to Sending...
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        try {
            await window.db.collection('contacts').add({
                name: name,
                email: email,
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                date: new Date().toLocaleString()
            });

            showMessage("✅ Thank you! Your message has been sent successfully.", "success");
            form.reset();
        } catch (error) {
            console.error(error);
            showMessage("❌ Failed to send. Please email me directly: gediyoneyasu26@gmail.com", "error");
        }

        // Always restore button after 2 seconds max
        setTimeout(() => {
            submitButton.textContent = "Send Message";
            submitButton.disabled = false;
        }, 2000);
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.style.backgroundColor = type === 'success' ? 'rgba(29, 233, 182, 0.1)' : 'rgba(255, 107, 107, 0.1)';
        messageDiv.style.color = type === 'success' ? '#1de9b6' : '#ff6b6b';
        messageDiv.style.border = '1px solid ' + (type === 'success' ? '#1de9b6' : '#ff6b6b');
        messageDiv.style.display = 'block';
        messageDiv.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        if (scrollY >= (section.offsetTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// CSS for active link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        background: #0cdbea !important;
        color: #252525 !important;
        font-weight: 600;
    }
    #form-message { transition: all 0.3s ease; }
`;
document.head.appendChild(style);
