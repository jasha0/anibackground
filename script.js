const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to store animated particles
const particles = [];

// Function to create a particle
function createParticle() {
    const particle = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 5 + 1,
        color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
        velocity: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
        }
    };
    particles.push(particle);
}

// Function to animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const particle of particles) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Update particle position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        // Bounce off the walls
        if (particle.x + particle.radius > canvas.width || particle.x - particle.radius < 0) {
            particle.velocity.x *= -1;
        }

        if (particle.y + particle.radius > canvas.height || particle.y - particle.radius < 0) {
            particle.velocity.y *= -1;
        }
    }

    // Create a new particle every frame
    createParticle();

    // Recursive call for the next frame
    requestAnimationFrame(animateParticles);
}

// Initialize animation
animateParticles();
