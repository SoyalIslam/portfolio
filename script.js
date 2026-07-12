// Modern Developer Portfolio JavaScript

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            // Toggle icon classes
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // Close mobile menu on clicking any navigation link
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) {
                navLinks.classList.remove('mobile-active');
            }
            const icon = mobileToggle ? mobileToggle.querySelector('i') : null;
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // --- Smooth Active Navigation Link on Scroll ---
    const sections = document.querySelectorAll('.section');
    
    function highlightNavigation() {
        let scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        sections.forEach(section => {
            // Adjust threshold offset for activation logic
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Initial run on load

    // --- Technical Skills Reveal & Progress Bar Animation ---
    const skillsCards = document.querySelectorAll('.skills-card');
    const progressFills = document.querySelectorAll('.progress-fill');
    
    // Store original width from inline styles and reset to 0
    progressFills.forEach(fill => {
        const targetWidth = fill.style.width || '0%';
        fill.dataset.targetWidth = targetWidth;
        fill.style.width = '0';
    });

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const fills = entry.target.querySelectorAll('.progress-fill');
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                fills.forEach(fill => {
                    fill.style.width = fill.dataset.targetWidth;
                });
            } else {
                entry.target.classList.remove('reveal-active');
                fills.forEach(fill => {
                    fill.style.width = '0';
                });
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    skillsCards.forEach(card => {
        skillsObserver.observe(card);
    });

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Set loading state
            submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending message...`;
            submitBtn.disabled = true;

            // Simulate form submission latency
            setTimeout(() => {
                submitBtn.innerHTML = `<i class="fas fa-check"></i> Message Sent!`;
                
                if (formStatus) {
                    formStatus.className = "form-status success";
                    formStatus.innerText = "Thank you! Your message was sent successfully. Soyal will get back to you soon.";
                }
                
                contactForm.reset();

                // Reset button state after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    if (formStatus) {
                        formStatus.style.display = 'none';
                    }
                }, 4000);
            }, 1800);
        });
    }

    // --- Interactive Canvas Game & Puzzle ---
    const canvas = document.getElementById('canvas-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        let particles = [];
        let congratsParticles = [];
        const normalCount = 35;
        let mouse = { x: null, y: null };
        let isSolved = false;

        // Escape Node (Golden)
        let escapeNode = {
            x: Math.random() * (width - 40) + 20,
            y: Math.random() * (height - 40) + 20,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: 9,
            color: '#eab308', // Gold
            glowColor: 'rgba(234, 179, 8, 0.8)'
        };

        // Initialize normal particles
        for (let i = 0; i < normalCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 2 + 1,
                color: 'rgba(14, 165, 233, 0.45)' // Sky blue
            });
        }

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Dynamic Victory audio synthesizer using Web Audio API
        function playVictorySound() {
            try {
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
                notes.forEach((freq, index) => {
                    setTimeout(() => {
                        const osc = audioCtx.createOscillator();
                        const gain = audioCtx.createGain();
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);
                        osc.connect(gain);
                        gain.connect(audioCtx.destination);
                        osc.start();
                        osc.stop(audioCtx.currentTime + 0.35);
                    }, index * 120);
                });
            } catch (e) {
                console.warn('Audio context failed to load:', e);
            }
        }

        function triggerCongratulations() {
            isSolved = true;
            playVictorySound();
            
            // Show popup
            const popup = document.getElementById('congrats-popup');
            if (popup) {
                popup.classList.add('show');
            }

            // Spawn celebration particles
            congratsParticles = [];
            for (let i = 0; i < 80; i++) {
                congratsParticles.push({
                    x: escapeNode.x,
                    y: escapeNode.y,
                    vx: (Math.random() - 0.5) * 6,
                    vy: (Math.random() - 0.5) * 6 - 2, // slightly upwards explosion
                    radius: Math.random() * 3 + 1,
                    color: Math.random() < 0.5 ? '#eab308' : '#0ea5e9',
                    alpha: 1,
                    decay: Math.random() * 0.015 + 0.005
                });
            }

            // Hide popup and reset after 4 seconds
            setTimeout(() => {
                if (popup) {
                    popup.classList.remove('show');
                }
                // Reset golden node to random coordinate
                escapeNode.x = Math.random() * (width - 40) + 20;
                escapeNode.y = Math.random() * (height - 40) + 20;
                escapeNode.vx = (Math.random() - 0.5) * 2;
                escapeNode.vy = (Math.random() - 0.5) * 2;
                isSolved = false;
            }, 4000);
        }

        // Close popup click handler
        const popup = document.getElementById('congrats-popup');
        if (popup) {
            popup.addEventListener('click', () => {
                popup.classList.remove('show');
            });
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Draw grid dots
            ctx.fillStyle = 'rgba(226, 232, 240, 0.015)';
            const gridSpacing = 40;
            for (let x = 0; x < width; x += gridSpacing) {
                for (let y = 0; y < height; y += gridSpacing) {
                    ctx.fillRect(x, y, 1, 1);
                }
            }

            // 1. Update and draw normal particles
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce boundaries
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse interaction (slight pull)
                if (mouse.x !== null) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        p.x += dx * 0.01;
                        p.y += dy * 0.01;
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });

            // 2. Update and draw Escape Node (Golden)
            if (!isSolved) {
                escapeNode.x += escapeNode.vx;
                escapeNode.y += escapeNode.vy;

                // Bounce boundaries
                if (escapeNode.x < escapeNode.radius || escapeNode.x > width - escapeNode.radius) escapeNode.vx *= -1;
                if (escapeNode.y < escapeNode.radius || escapeNode.y > height - escapeNode.radius) escapeNode.vy *= -1;

                // Evasion Logic: Run away from the cursor
                if (mouse.x !== null) {
                    const dx = escapeNode.x - mouse.x;
                    const dy = escapeNode.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        // Calculate escaping velocity force
                        const force = (120 - dist) / 120;
                        const angle = Math.atan2(dy, dx);
                        
                        // Push golden node away
                        escapeNode.vx += Math.cos(angle) * force * 0.6;
                        escapeNode.vy += Math.sin(angle) * force * 0.6;
                        
                        // Cap speed
                        const speed = Math.sqrt(escapeNode.vx * escapeNode.vx + escapeNode.vy * escapeNode.vy);
                        if (speed > 8) {
                            escapeNode.vx = (escapeNode.vx / speed) * 8;
                            escapeNode.vy = (escapeNode.vy / speed) * 8;
                        }
                    } else {
                        // Dampen velocity back to normal speed
                        escapeNode.vx *= 0.98;
                        escapeNode.vy *= 0.98;
                    }

                    // Check catch (solve) condition
                    if (dist < escapeNode.radius + 8) {
                        triggerCongratulations();
                    }
                }

                // Draw connecting line to nearest normal particles
                particles.forEach(p => {
                    const dx = escapeNode.x - p.x;
                    const dy = escapeNode.y - p.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(escapeNode.x, escapeNode.y);
                        ctx.lineTo(p.x, p.y);
                        ctx.strokeStyle = `rgba(234, 179, 8, ${0.12 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });

                // Draw golden node glow
                ctx.beginPath();
                ctx.arc(escapeNode.x, escapeNode.y, escapeNode.radius + 4, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(234, 179, 8, 0.15)';
                ctx.fill();

                // Draw core golden node
                ctx.beginPath();
                ctx.arc(escapeNode.x, escapeNode.y, escapeNode.radius, 0, Math.PI * 2);
                ctx.fillStyle = escapeNode.color;
                ctx.shadowColor = escapeNode.color;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0; // Reset shadow
            }

            // 3. Draw Confetti / Explosion particles
            if (congratsParticles.length > 0) {
                congratsParticles.forEach((cp, idx) => {
                    cp.x += cp.vx;
                    cp.y += cp.vy;
                    cp.vy += 0.05; // Gravity
                    cp.alpha -= cp.decay;

                    if (cp.alpha <= 0) {
                        congratsParticles.splice(cp, 1);
                    } else {
                        ctx.beginPath();
                        ctx.arc(cp.x, cp.y, cp.radius, 0, Math.PI * 2);
                        ctx.fillStyle = cp.color;
                        ctx.globalAlpha = cp.alpha;
                        ctx.fill();
                        ctx.globalAlpha = 1; // Reset alpha
                    }
                });
            }

            requestAnimationFrame(animate);
        }

        animate();
    }
});
