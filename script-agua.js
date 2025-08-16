
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

        // Partículas de agua
        function createWaterParticles() {
            const container = document.getElementById('waterParticles');
            
            function createParticle() {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (4 + Math.random() * 3) + 's';
                
                // Colores agua
                const colors = ['#2ECC71', '#3498DB', '#1ABC9C', '#85C1E9'];
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                container.appendChild(particle);
                
                // Remover la partícula después de la animación
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 8000);
            }
            
            // Crear partículas continuamente
            setInterval(createParticle, 400);
        }
        createWaterParticles();

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

        // Efectos hover para las tarjetas de servicio
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card.querySelector('.service-icon'), {
                    scale: 1.3,
                    rotation: 5,
                    duration: 0.3
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card.querySelector('.service-icon'), {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3
                });
            });
        });

        // Efectos hover para items del portafolio
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item.querySelector('.portfolio-preview'), {
                    scale: 1.05,
                    duration: 0.3
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item.querySelector('.portfolio-preview'), {
                    scale: 1,
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

        // Efecto de ondas en el cursor cuando pasa sobre elementos interactivos
        document.querySelectorAll('.service-card, .portfolio-item, .nav-back, .service-button').forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 1.5,
                    boxShadow: '0 0 30px var(--agua-primary)',
                    duration: 0.3
                });
            });

            element.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    boxShadow: '0 0 20px var(--agua-primary)',
                    duration: 0.3
                });
            });
        });

        // Animación de shimmer en los previews del portafolio
        document.querySelectorAll('.portfolio-preview').forEach(preview => {
            preview.addEventListener('mouseenter', () => {
                const shimmer = preview.querySelector('::before');
                gsap.set(preview, { overflow: 'hidden' });
            });
        });

        // Responsive adjustments
        function updateResponsive() {
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                // Reducir partículas en móvil para mejor rendimiento
                const particles = document.querySelectorAll('.particle');
                particles.forEach((particle, index) => {
                    if (index % 2 !== 0) {
                        particle.style.display = 'none';
                    }
                });
            }
        }

        window.addEventListener('resize', updateResponsive);
        updateResponsive();

        // Smooth scroll para los botones de servicio que apuntan a contacto
        document.querySelectorAll('a[href="#contacto"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Redireccionar a index.html con scroll a contacto
                window.location.href = 'index.html#contacto';
            });
        });

        // Accesibilidad
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                cursor.style.display = 'none';
            }
        });

        document.addEventListener('mousemove', () => {
            cursor.style.display = 'block';
        });

        // Animación inicial del hero
        window.addEventListener('load', () => {
            gsap.fromTo('.codigo-icon', 
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
            );
            
            gsap.fromTo('.hero-title', 
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
            );
            
            gsap.fromTo('.hero-subtitle', 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power2.out" }
            );

            gsap.fromTo('.water-quote', 
                { x: -100, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, delay: 0.9, ease: "power2.out" }
            );
        });

        // Efecto de onda cuando se hace scroll
        let ticking = false;
        
        function updateWaveEffect() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            gsap.set('.hero-codigo::before', {
                transform: `translateY(${parallax}px) scale(${1 + scrolled * 0.0005})`
            });
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateWaveEffect);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);

        // Crear efecto de ondas concéntricas al hacer clic
        document.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: fixed;
                border-radius: 50%;
                background: radial-gradient(circle, var(--agua-accent) 0%, transparent 70%);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 9998;
            `;
            
            const size = 60;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - size / 2) + 'px';
            ripple.style.top = (e.clientY - size / 2) + 'px';
            
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                document.body.removeChild(ripple);
            }, 600);
        });

        // Añadir estilos para el efecto ripple
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
 
// agua


        // GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Sistema de traducción
let currentLang = 'es';
const translations = {
    es: {
        'nav-back': '← Volver al Umbral',
        'hero-title': 'Código',
        'hero-subtitle': 'Elemento que fluye y transforma ideas en experiencias digitales. Donde el diseño cobra vida a través de la programación.',
        'water-quote': 'Como el agua que toma la forma del recipiente, el código se adapta a cada visión para crear mundos digitales únicos',
        'services-title': 'Servicios del Agua Digital',
        'portfolio-title': 'Corrientes Creativas',
        'process-title': 'El Flujo de Creación',
        'philosophy-title': 'Filosofía del Código'
    },
    en: {
        'nav-back': '← Back to Threshold',
        'hero-title': 'Code',
        'hero-subtitle': 'Element that flows and transforms ideas into digital experiences. Where design comes to life through programming.',
        'water-quote': 'Like water that takes the shape of its container, code adapts to each vision to create unique digital worlds',
        'services-title': 'Digital Water Services',
        'portfolio-title': 'Creative Currents',
        'process-title': 'The Creation Flow',
        'philosophy-title': 'Code Philosophy'
    }
};

// Cursor personalizado avanzado
class WaterCursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.trails = [];
        this.mouse = { x: 0, y: 0 };
        this.isVisible = true;
        
        this.createTrails();
        this.bindEvents();
        this.animate();
    }
    
    createTrails() {
        for (let i = 0; i < 8; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.cssText = `
                position: fixed;
                width: ${4 - i * 0.3}px;
                height: ${4 - i * 0.3}px;
                background: var(--agua-primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: ${9997 - i};
                opacity: ${0.8 - i * 0.1};
                transition: all 0.1s ease;
            `;
            document.body.appendChild(trail);
            this.trails.push({ element: trail, x: 0, y: 0 });
        }
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            if (!this.isVisible) {
                this.show();
            }
        });
        
        document.addEventListener('mouseenter', () => this.show());
        document.addEventListener('mouseleave', () => this.hide());
        
        // Efectos especiales en elementos interactivos
        document.querySelectorAll('a, button, .service-card, .portfolio-item').forEach(el => {
            el.addEventListener('mouseenter', () => this.expand());
            el.addEventListener('mouseleave', () => this.contract());
        });
    }
    
    animate() {
        // Cursor principal
        gsap.to(this.cursor, {
            x: this.mouse.x - 12,
            y: this.mouse.y - 12,
            duration: 0.1,
            ease: "power2.out"
        });
        
        // Trails con delay progresivo
        this.trails.forEach((trail, index) => {
            gsap.to(trail.element, {
                x: this.mouse.x - 2,
                y: this.mouse.y - 2,
                duration: 0.1 + index * 0.05,
                ease: "power2.out"
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    expand() {
        gsap.to(this.cursor, {
            scale: 1.5,
            duration: 0.3,
            ease: "power2.out"
        });
        
        this.trails.forEach((trail, index) => {
            gsap.to(trail.element, {
                scale: 1.3 - index * 0.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    }
    
    contract() {
        gsap.to(this.cursor, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
        
        this.trails.forEach(trail => {
            gsap.to(trail.element, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    }
    
    show() {
        this.isVisible = true;
        gsap.to([this.cursor, ...this.trails.map(t => t.element)], {
            opacity: 1,
            duration: 0.3
        });
    }
    
    hide() {
        this.isVisible = false;
        gsap.to([this.cursor, ...this.trails.map(t => t.element)], {
            opacity: 0,
            duration: 0.3
        });
    }
}

// Sistema de partículas de agua mejorado
class WaterParticleSystem {
    constructor() {
        this.container = document.getElementById('waterParticles');
        this.particles = [];
        this.maxParticles = window.innerWidth > 768 ? 15 : 8;
        
        this.init();
    }
    
    init() {
        setInterval(() => this.createParticle(), 600);
    }
    
    createParticle() {
        if (this.particles.length > this.maxParticles) {
            this.removeOldestParticle();
        }
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const colors = ['#2ECC71', '#3498DB', '#1ABC9C', '#85C1E9', '#AED6F1'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 4 + 3;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            opacity: 0;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
        
        // Animación de la partícula
        const tl = gsap.timeline({
            onComplete: () => this.removeParticle(particle)
        });
        
        tl.to(particle, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        })
        .to(particle, {
            y: -window.innerHeight - 50,
            x: `+=${Math.random() * 100 - 50}`,
            rotation: Math.random() * 360,
            scale: 0.3,
            duration: Math.random() * 3 + 4,
            ease: "none"
        }, 0)
        .to(particle, {
            opacity: 0,
            duration: 1,
            ease: "power2.in"
        }, "-=1");
    }
    
    removeParticle(particle) {
        if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
        this.particles = this.particles.filter(p => p !== particle);
    }
    
    removeOldestParticle() {
        const oldest = this.particles.shift();
        if (oldest && oldest.parentNode) {
            oldest.parentNode.removeChild(oldest);
        }
    }
}

// Efectos de scroll paralelo
class ParallaxEffects {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.bindScrollEvents();
    }
    
    bindScrollEvents() {
        gsap.to('.hero-codigo::before', {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero-codigo',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
        
        // Parallax para elementos de portafolio
        gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
            gsap.to(item, {
                y: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });
    }
}

// Sistema de animaciones de entrada mejorado
class EntranceAnimations {
    constructor() {
        this.setupAnimations();
    }
    
    setupAnimations() {
        // Hero animations
        const heroTl = gsap.timeline({ delay: 0.5 });
        
        heroTl.fromTo('.codigo-icon', 
            { 
                scale: 0, 
                rotation: -180,
                filter: 'blur(20px)'
            },
            { 
                scale: 1, 
                rotation: 0,
                filter: 'blur(0px)',
                duration: 1.2, 
                ease: "back.out(1.7)"
            }
        )
        .fromTo('.hero-title', 
            { 
                y: 100, 
                opacity: 0,
                rotationX: 90
            },
            { 
                y: 0, 
                opacity: 1,
                rotationX: 0,
                duration: 1, 
                ease: "power2.out"
            }, "-=0.8"
        )
        .fromTo('.hero-subtitle', 
            { 
                y: 50, 
                opacity: 0 
            },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                ease: "power2.out"
            }, "-=0.6"
        )
        .fromTo('.water-quote', 
            { 
                x: -100, 
                opacity: 0,
                rotationY: -45
            },
            { 
                x: 0, 
                opacity: 1,
                rotationY: 0,
                duration: 1, 
                ease: "power2.out"
            }, "-=0.4");
        
        // Scroll trigger animations
        gsap.utils.toArray('.fade-in').forEach((element, index) => {
            gsap.fromTo(element, 
                { 
                    y: 60, 
                    opacity: 0,
                    scale: 0.9
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    delay: index * 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
        
        // Service cards animation
        gsap.utils.toArray('.service-card').forEach((card, index) => {
            gsap.fromTo(card,
                { 
                    y: 80,
                    opacity: 0,
                    rotationX: 45
                },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
        
        // Portfolio items wave animation
        gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            
            gsap.fromTo(item,
                { 
                    y: 50,
                    opacity: 0,
                    scale: 0.8
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    delay: (row * 0.2) + (col * 0.1),
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    }
}

// Efectos de hover avanzados
class HoverEffects {
    constructor() {
        this.setupServiceCards();
        this.setupPortfolioItems();
        this.setupButtons();
    }
    
    setupServiceCards() {
        document.querySelectorAll('.service-card').forEach(card => {
            const icon = card.querySelector('.service-icon');
            const title = card.querySelector('.service-title');
            
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    scale: 1.02,
                    duration: 0.4,
                    ease: "power2.out"
                });
                
                gsap.to(icon, {
                    scale: 1.3,
                    rotation: 10,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
                
                gsap.to(title, {
                    color: '#F39C12',
                    duration: 0.3
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                });
                
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                gsap.to(title, {
                    color: '#1ABC9C',
                    duration: 0.3
                });
            });
        });
    }
    
    setupPortfolioItems() {
        document.querySelectorAll('.portfolio-item').forEach(item => {
            const preview = item.querySelector('.portfolio-preview');
            
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    scale: 1.02,
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                gsap.to(preview, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                gsap.to(preview, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }
    
    setupButtons() {
        document.querySelectorAll('.service-button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    y: -2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }
}

// Sistema de ondas al hacer clic
class RippleEffect {
    constructor() {
        this.bindClicks();
    }
    
    bindClicks() {
        document.addEventListener('click', (e) => {
            this.createRipple(e.clientX, e.clientY);
        });
    }
    
    createRipple(x, y) {
        const ripple = document.createElement('div');
        const size = 60;
        
        ripple.style.cssText = `
            position: fixed;
            border-radius: 50%;
            background: radial-gradient(circle, var(--agua-accent) 0%, transparent 70%);
            width: ${size}px;
            height: ${size}px;
            left: ${x - size / 2}px;
            top: ${y - size / 2}px;
            pointer-events: none;
            z-index: 9998;
            animation: rippleExpand 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
}

// Navegación suave
class SmoothNavigation {
    constructor() {
        this.setupScrollLinks();
    }
    
    setupScrollLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: target,
                        ease: "power2.inOut"
                    });
                }
            });
        });
        
        // Enlaces a contacto en index.html
        document.querySelectorAll('a[href="#contacto"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'index.html#contacto';
            });
        });
    }
}

// Responsive handler
class ResponsiveHandler {
    constructor() {
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }
    
    handleResize() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024;
        
        if (isMobile) {
            // Reducir efectos en móvil
            gsap.set('.cursor-trail', { display: 'none' });
            
            // Simplificar animaciones
            gsap.globalTimeline.timeScale(1.5);
        } else {
            gsap.set('.cursor-trail', { display: 'block' });
            gsap.globalTimeline.timeScale(1);
        }
        
        // Actualizar número máximo de partículas
        if (window.particleSystem) {
            window.particleSystem.maxParticles = isMobile ? 5 : 15;
        }
    }
}

// Agregar estilos CSS dinámicamente
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleExpand {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .cursor-trail {
            transition: all 0.1s ease;
        }
        
        /* Smooth scrolling para todos los navegadores */
        html {
            scroll-behavior: smooth;
        }
        
        /* Mejoras de accesibilidad */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Inicialización principal
document.addEventListener('DOMContentLoaded', () => {
    // Agregar estilos dinámicos
    addDynamicStyles();
    
    // Inicializar sistemas
    window.waterCursor = new WaterCursor();
    window.particleSystem = new WaterParticleSystem();
    window.parallaxEffects = new ParallaxEffects();
    window.entranceAnimations = new EntranceAnimations();
    window.hoverEffects = new HoverEffects();
    window.rippleEffect = new RippleEffect();
    window.smoothNavigation = new SmoothNavigation();
    window.responsiveHandler = new ResponsiveHandler();
    
    // Debugging en desarrollo
    if (window.location.hostname === 'localhost') {
        console.log('🌊 Código page loaded successfully');
    }
});

// Manejar visibilidad de la página
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});
