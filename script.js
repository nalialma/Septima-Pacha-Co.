
        // Sistema de traducción
        let currentLang = 'es';
        const translations = {
            es: {
                'btn-sending': 'Sembrando...',
                'btn-sent': 'Mensaje Sembrado ✨',
                'thanks-message': 'Gracias. Tu mensaje ha sido sembrado.'
            },
            en: {
                'btn-sending': 'Planting...',
                'btn-sent': 'Message Planted ✨',
                'thanks-message': 'Thank you. Your message has been planted.'
            }
        };

        function toggleLanguage() {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            document.documentElement.lang = currentLang;
            
            // Actualizar todos los elementos con data-lang
            const elements = document.querySelectorAll('[data-lang-es], [data-lang-en]');
            elements.forEach(element => {
                const text = element.getAttribute(`data-lang-${currentLang}`);
                if (text) {
                    element.textContent = text;
                }
            });
            
            // Actualizar placeholders si los hay
            const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
            inputs.forEach(input => {
                const placeholder = input.getAttribute(`data-placeholder-${currentLang}`);
                if (placeholder) {
                    input.placeholder = placeholder;
                }
            });
        }

        // Registro de plugins GSAP
        gsap.registerPlugin(ScrollTrigger);

        // Animación del logo en splash screen
        window.addEventListener('load', () => {
            const logoPaths = document.querySelectorAll('.logo-path');
            const logoText = document.querySelector('.logo-text');
            const splashScreen = document.getElementById('splashScreen');
            
            // Animar cada path del logo
            logoPaths.forEach((path, index) => {
                gsap.to(path, {
                    strokeDashoffset: 0,
                    duration: 1.5,
                    delay: index * 0.2,
                    ease: "power2.inOut"
                });
            });
            
            // Animar texto del logo
            gsap.to(logoText, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 2,
                ease: "power2.out"
            });
            
            // Ocultar splash screen
            setTimeout(() => {
                splashScreen.classList.add('hide');
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                }, 1000);
            }, 4000);
        });

        // Event listener para cambio de idioma
        document.getElementById('languageToggle').addEventListener('click', toggleLanguage);

        // Cursor personalizado
        const cursor = document.querySelector('.custom-cursor');
        let trails = [];
        
        // Crear estelas del cursor
        for (let i = 0; i < 10; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            document.body.appendChild(trail);
            trails.push(trail);
        }

        let mouseX = 0, mouseY = 0;
        let trailX = [], trailY = [];

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            gsap.to(cursor, {
                x: mouseX - 10,
                y: mouseY - 10,
                duration: 0.1
            });
        });

        // Animación de estelas
        function animateTrails() {
            trailX.unshift(mouseX);
            trailY.unshift(mouseY);
            
            if (trailX.length > trails.length) {
                trailX.pop();
                trailY.pop();
            }

            trails.forEach((trail, index) => {
                if (trailX[index] !== undefined) {
                    gsap.to(trail, {
                        x: trailX[index] - 2,
                        y: trailY[index] - 2,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });

            requestAnimationFrame(animateTrails);
        }
        animateTrails();

        // Scroll suave para la flecha
        document.querySelector('.scroll-arrow').addEventListener('click', () => {
            gsap.to(window, {duration: 1.5, scrollTo: ".proyectos", ease: "power2.inOut"});
        });

        // Animaciones de scroll
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

        // Animación de proyectos en timeline
        gsap.utils.toArray('.proyecto').forEach((proyecto, index) => {
            gsap.fromTo(proyecto,
                { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: proyecto,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Interacción con las fases
        document.querySelectorAll('.fase').forEach(fase => {
            fase.addEventListener('mouseenter', () => {
                gsap.to(fase, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            fase.addEventListener('mouseleave', () => {
                gsap.to(fase, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Interacción con la huella
        const huella = document.querySelector('.huella');
        const frases = document.querySelectorAll('.frase');
        let fraseActual = 0;

        huella.addEventListener('mouseenter', () => {
            // Ocultar frase actual si existe
            if (frases[fraseActual]) {
                frases[fraseActual].classList.remove('activa');
            }
            
            // Mostrar siguiente frase
            fraseActual = (fraseActual + 1) % frases.length;
            frases[fraseActual].classList.add('activa');
        });

        // Animación del formulario
        document.querySelector('.formulario').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = document.querySelector('.btn-enviar');
            const originalText = btn.textContent;
            
            btn.textContent = translations[currentLang]['btn-sending'];
            btn.disabled = true;
            
            // Simular envío
            setTimeout(() => {
                btn.textContent = translations[currentLang]['btn-sent'];
                
                // Animación de semilla creciendo
                const semilla = document.createElement('div');
                semilla.innerHTML = '🌱';
                semilla.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    font-size: 2rem;
                    z-index: 10000;
                    pointer-events: none;
                `;
                document.body.appendChild(semilla);
                
                gsap.fromTo(semilla, 
                    { scale: 0, y: 0 },
                    { 
                        scale: 3, 
                        y: -100, 
                        duration: 2,
                        ease: "power2.out",
                        onComplete: () => semilla.remove()
                    }
                );
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    document.querySelector('.formulario').reset();
                }, 3000);
            }, 2000);
        });

        // Cambios de cursor según sección
        const secciones = [
            { selector: '.umbral', cursor: '✨' },
            { selector: '.proyectos', cursor: '🎨' },
            { selector: '.fases', cursor: '⚡' },
            { selector: '.servicios', cursor: '💫' },
            { selector: '.sobre-mi', cursor: '👋' },
            { selector: '.contacto', cursor: '📧' }
        ];

        secciones.forEach(seccion => {
            ScrollTrigger.create({
                trigger: seccion.selector,
                start: "top center",
                end: "bottom center",
                onEnter: () => cursor.innerHTML = seccion.cursor,
                onEnterBack: () => cursor.innerHTML = seccion.cursor
            });
        });

        // Efecto parallax sutil en el fondo
        gsap.to('.umbral::before', {
            y: '-20%',
            ease: "none",
            scrollTrigger: {
                trigger: '.umbral',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Responsividad mejorada para dispositivos móviles
        function updateResponsiveElements() {
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // Ajustar animaciones para móvil
                ScrollTrigger.batch('.fade-in', {
                    onEnter: elements => gsap.fromTo(elements, 
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }
                    )
                });
            }
        }

        window.addEventListener('resize', updateResponsiveElements);
        updateResponsiveElements();

        // Optimización de rendimiento para dispositivos móviles
        if (window.innerWidth <= 768) {
            // Reducir la cantidad de trails del cursor en móvil
            trails = trails.slice(0, 5);
            
            // Simplificar algunas animaciones
            gsap.set('.cursor-trail', { display: 'none' });
        }

        // Accesibilidad mejorada
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                cursor.style.display = 'none';
            }
        });

        document.addEventListener('mousemove', () => {
            cursor.style.display = 'block';
        });

        // Preload de recursos para mejor rendimiento
        const preloadImages = () => {
            const imageUrls = [
                // Aquí podrías agregar URLs de imágenes si las tuvieras
            ];
            
            imageUrls.forEach(url => {
                const img = new Image();
                img.src = url;
            });
        };

        preloadImages();
 
