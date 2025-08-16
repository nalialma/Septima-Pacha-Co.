
        // GSAP Registration
        gsap.registerPlugin(ScrollTrigger);

        // Cursor personalizado
        const cursor = document.querySelector('.custom-cursor');
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX - 12,
                y: e.clientY - 12,
                duration: 0.1
            });
        });

        //partículas de fuego
        function createFireParticles() {
            const container = document.getElementById('fireParticles');
            
            function createParticle() {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 4 + 's';
                particle.style.animationDuration = (3 + Math.random() * 2) + 's';
                
                // Colores fuego
                const colors = ['#FF4500', '#FF6B35', '#FFD700', '#DC143C'];
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                container.appendChild(particle);
                
                // Remover la partícula después de la animación
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 6000);
            }
            
            // Crear partículas continuamente
            setInterval(createParticle, 300);
        }
        createFireParticles();

        // Animaciones de entrada
        gsap.utils.toArray('.fade-in').forEach(element => {
            gsap.fromTo(element, 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Efectos hover para las técnicas
        document.querySelectorAll('.technique-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card.querySelector('.technique-icon'), {
                    scale: 1.3,
                    rotation: 10,
                    duration: 0.3
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card.querySelector('.technique-icon'), {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3
                });
            });
        });

        // Animación de los números del proceso
        gsap.utils.toArray('.process-number').forEach(number => {
            gsap.fromTo(number, 
                { scale: 0, rotation: 180 },
                {
                    scale: 1,
                    rotation: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: number,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Efecto de brillo en el cursor cuando pasa sobre elementos interactivos
        document.querySelectorAll('.technique-card, .artwork-item, .nav-back').forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 1.5,
                    boxShadow: '0 0 30px var(--fuego-primary)',
                    duration: 0.3
                });
            });

            element.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    boxShadow: '0 0 20px var(--fuego-primary)',
                    duration: 0.3
                });
            });
        });

        // Responsive adjustments
        function updateResponsive() {
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                // Reducir partículas en móvil para mejor rendimiento
                const particles = document.querySelectorAll('.particle');
                particles.forEach((particle, index) => {
                    if (index % 3 !== 0) {
                        particle.style.display = 'none';
                    }
                });
            }
        }

        window.addEventListener('resize', updateResponsive);
        updateResponsive();

        // Accesibilidad
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                cursor.style.display = 'none';
            }
        });

        document.addEventListener('mousemove', () => {
            cursor.style.display = 'block';
        });
   