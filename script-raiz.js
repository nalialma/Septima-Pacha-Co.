
        // Sistema de traducción
        let currentLang = 'es';
        const translations = {
            es: {},
            en: {}
        };

        function toggleLanguage() {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            document.documentElement.lang = currentLang;
            
            const elements = document.querySelectorAll('[data-lang-es], [data-lang-en]');
            elements.forEach(element => {
                const text = element.getAttribute(`data-lang-${currentLang}`);
                if (text) {
                    element.textContent = text;
                }
            });
        }

        // Registro de plugins GSAP
        gsap.registerPlugin(ScrollTrigger);

        // Event listener para cambio de idioma
        document.getElementById('languageToggle').addEventListener('click', toggleLanguage);

        // Cursor personalizado
        const cursor = document.querySelector('.custom-cursor');
        let trails = [];
        
        for (let i = 0; i < 8; i++) {
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
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Animación de items de galería
        gsap.utils.toArray('.gallery-item').forEach((item, index) => {
            gsap.fromTo(item,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Data de las imágenes (en un proyecto real, estas serían URLs reales)
        const galleryData = {
            1: {
                title: { es: "Chakana Primordial", en: "Primordial Chakana" },
                description: { es: "Primer boceto de la cruz andina que guía todas las creaciones. Carboncillo sobre papel de algodón, 2024. Esta obra marca el inicio del camino creativo, donde cada línea traza un puente entre lo ancestral y lo contemporáneo.", en: "First sketch of the Andean cross that guides all creations. Charcoal on cotton paper, 2024. This work marks the beginning of the creative journey, where each line draws a bridge between the ancestral and the contemporary." },
                placeholder: "🎨"
            },
            2: {
                title: { es: "Apus Dormidos", en: "Sleeping Apus" },
                description: { es: "Los espíritus de las montañas en su eterno descanso. Dibujo en tinta sepia, inspirado en los cerros de Salta. Los Apus son las divinidades tutelares de las montañas en la cosmología andina.", en: "The spirits of the mountains in their eternal rest. Sepia ink drawing, inspired by the hills of Salta. The Apus are the tutelary deities of the mountains in Andean cosmology." },
                placeholder: "🏔️"
            },
            3: {
                title: { es: "Medicina Ancestral", en: "Ancestral Medicine" },
                description: { es: "Estudio botánico de plantas sagradas del norte argentino. Acuarela y grafito, 2024. Un homenaje a la sabiduría herbolaria de nuestros ancestros.", en: "Botanical study of sacred plants from northern Argentina. Watercolor and graphite, 2024. A tribute to the herbal wisdom of our ancestors." },
                placeholder: "🌿"
            },
            4: {
                title: { es: "Ciclos Lunares", en: "Lunar Cycles" },
                description: { es: "Mandala lunar que honra los tiempos femeninos y los ritmos cósmicos. Tinta china sobre papel de arroz. La Luna como guía de los ciclos internos y externos.", en: "Lunar mandala that honors feminine times and cosmic rhythms. Chinese ink on rice paper. The Moon as a guide to internal and external cycles." },
                placeholder: "🌙"
            },
            5: {
                title: { es: "Espíritu Lagarto", en: "Lizard Spirit" },
                description: { es: "El lagarto como símbolo de regeneración y conexión telúrica. Boceto en carbón vegetal. Representa la capacidad de renovarse y la sabiduría de la tierra.", en: "The lizard as a symbol of regeneration and telluric connection. Sketch in vegetal charcoal. Represents the ability to renew oneself and the wisdom of the earth." },
                placeholder: "🦎"
            },
            6: {
                title: { es: "Cosecha de Quinoa", en: "Quinoa Harvest" },
                description: { es: "Manos que cosechan el oro de los Andes. Estudio gestual en sanguina sobre papel kraft. Un tributo a las manos que cultivan el alimento sagrado.", en: "Hands that harvest the gold of the Andes. Gestural study in sanguine on kraft paper. A tribute to the hands that cultivate sacred food." },
                placeholder: "🌾"
            },
            7: {
                title: { es: "Vuelo Sagrado", en: "Sacred Flight" },
                description: { es: "El cóndor como mensajero entre mundos. Dibujo en grafito sobre papel texturado, 2024. Ave sagrada que vuela entre el Kay Pacha (este mundo) y el Hanaq Pacha (mundo de arriba).", en: "The condor as messenger between worlds. Graphite drawing on textured paper, 2024. Sacred bird that flies between Kay Pacha (this world) and Hanaq Pacha (upper world)." },
                placeholder: "🕊️"
            },
            8: {
                title: { es: "Fuego Ceremonial", en: "Ceremonial Fire" },
                description: { es: "Llamas danzantes en ritual de purificación. Pastel seco sobre papel negro, capturando la energía del fuego sagrado que transforma y purifica.", en: "Dancing flames in purification ritual. Dry pastel on black paper, capturing the energy of sacred fire that transforms and purifies." },
            }
        };

        // Función para abrir modal
        function openModal(imageId) {
            const modal = document.getElementById('imageModal');
            const modalImage = document.getElementById('modalImage');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            
            const data = galleryData[imageId];
            
            // Crear placeholder visual para la imagen
            modalImage.innerHTML = `
                <div style="
                    width: 500px;
                    height: 400px;
                    background: linear-gradient(135deg, var(--tierra) 0%, var(--oro) 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 4rem;
                    border-radius: 10px;
                ">${data.placeholder}</div>
            `;
            
            modalTitle.textContent = data.title[currentLang];
            modalDescription.textContent = data.description[currentLang];
            
            modal.style.display = 'flex';
            
            // Animación de entrada
            gsap.fromTo(modal, 
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );
            
            gsap.fromTo('.modal-content', 
                { scale: 0.8, y: 50 },
                { scale: 1, y: 0, duration: 0.4, ease: "power2.out" }
            );
        }

        // Función para cerrar modal
        function closeModal() {
            const modal = document.getElementById('imageModal');
            
            gsap.to(modal, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    modal.style.display = 'none';
                }
            });
        }

        // Cerrar modal al hacer clic fuera de él
        document.getElementById('imageModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                closeModal();
            }
        });

        // Cerrar modal con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Hover effects mejorados para items de galería
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item.querySelector('.gallery-image'), {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item.querySelector('.gallery-image'), {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Efecto parallax sutil en el header
        gsap.to('.header::before', {
            y: '-20%',
            ease: "none",
            scrollTrigger: {
                trigger: '.header',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Responsividad mejorada para dispositivos móviles
        function updateResponsiveElements() {
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // Reducir estelas del cursor en móvil
                trails = trails.slice(0, 4);
                
                // Ajustar animaciones para móvil
                ScrollTrigger.batch('.gallery-item', {
                    onEnter: elements => gsap.fromTo(elements, 
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }
                    )
                });
            }
        }

        window.addEventListener('resize', updateResponsiveElements);
        updateResponsiveElements();

        // Accesibilidad mejorada
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                cursor.style.display = 'none';
            }
        });

        document.addEventListener('mousemove', () => {
            cursor.style.display = 'block';
        });

        // Optimización para dispositivos móviles
        if (window.innerWidth <= 768) {
            gsap.set('.cursor-trail', { display: 'none' });
        }

        // Inicialización de animaciones al cargar
        window.addEventListener('load', () => {
            gsap.fromTo('.phase-icon', 
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
            );
            
            gsap.fromTo('.page-title', 
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
            );
            
            gsap.fromTo('.page-subtitle', 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power2.out" }
            );
        });
   