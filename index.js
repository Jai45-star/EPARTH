// Create floating particles
const particlesContainer = document.querySelector('.particles');

for (let i = 0; i < 70; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    
    particle.style.animationDuration = `${Math.random() * 25 + 12}s`;
    particle.style.animationDelay = `${Math.random() * 6}s`;
    
    particlesContainer.appendChild(particle);
}

// Form handling
const form = document.getElementById('studentForm');
const statusDiv = document.getElementById('status');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    statusDiv.textContent = 'Submitting...';
    statusDiv.style.color = '#ffff00';

    // Collect regular fields
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value.trim();
    });

    // Collect checkboxes separately
    const interests = [];
    document.querySelectorAll('input[name="interest"]:checked').forEach(cb => {
        interests.push(cb.value);
    });
    data.interests = interests.join(', ');

    try {
        // ← Replace with your real Google Apps Script web app URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxuM4qb3iqiaKz2lMZnRVAZueplpST4tMJJLcY7MRlpuaWGa9-Dqlxs7ARDmS6xQvK2/exec';

        const response = await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',           // Google Apps Script usually needs no-cors
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Because of no-cors we can't read response → assume success if no error thrown
        statusDiv.textContent = 'Profile Submitted Successfully! 🚀 Thank you!';
        statusDiv.style.color = '#00ff00';
        
        form.reset();

    } catch (err) {
        console.error('Form submission error:', err);
        statusDiv.textContent = 'Error submitting data. Please check your internet connection.';
        statusDiv.style.color = '#ff4444';
    }
});