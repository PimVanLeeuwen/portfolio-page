/* ========================================
   Portfolio JavaScript
   Pim van Leeuwen - Portfolio
   ======================================== */

// ========================================
// Loader
// ========================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 800);
});

// ========================================
// Navigation
// ========================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Scroll effect for nav
let lastScrollTop = 0;
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class
    if (scrollTop > scrollThreshold) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Hide/show nav on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('blur');
});

// Close mobile menu on link click
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('blur');
    });
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('blur');
    }
});

// ========================================
// Smooth Scroll for anchor links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Experience Tabs
// ========================================
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding panel
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// ========================================
// Intersection Observer for reveal animations
// ========================================
const revealElements = document.querySelectorAll('.section, .project-card, .volunteer-card, .timeline-item, .skill-category');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'visible');
            
            // For skill bars, trigger animation
            if (entry.target.classList.contains('skill-category')) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 100);
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ========================================
// Hero animations with delays
// ========================================
const heroElements = document.querySelectorAll('.animate-fade-up');
heroElements.forEach((el, index) => {
    el.style.animationDelay = `${0.1 + index * 0.1}s`;
});

// ========================================
// Show More Projects
// ========================================
const showMoreBtn = document.getElementById('show-more-projects');
const projectCards = document.querySelectorAll('.project-card');

// Initially hide projects beyond the first 6
let projectsVisible = 6;
projectCards.forEach((card, index) => {
    if (index >= projectsVisible) {
        card.style.display = 'none';
    }
});

// Update button visibility
function updateShowMoreButton() {
    if (projectsVisible >= projectCards.length) {
        showMoreBtn.textContent = 'Show Less';
    } else {
        showMoreBtn.textContent = 'Show More';
    }
}

updateShowMoreButton();

showMoreBtn.addEventListener('click', () => {
    if (projectsVisible >= projectCards.length) {
        // Hide projects
        projectsVisible = 6;
        projectCards.forEach((card, index) => {
            if (index >= projectsVisible) {
                card.style.display = 'none';
            }
        });
        // Scroll to projects section
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    } else {
        // Show more projects
        projectsVisible = projectCards.length;
        projectCards.forEach(card => {
            card.style.display = 'flex';
            card.classList.add('reveal', 'visible');
        });
    }
    updateShowMoreButton();
});

// ========================================
// Active section highlighting
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// ========================================
// Typing effect for hero (optional)
// ========================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ========================================
// Cursor follower (optional - can be enabled)
// ========================================
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
// Uncomment to enable custom cursor
// document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

// ========================================
// Parallax effect for hero section
// ========================================
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// ========================================
// Lazy loading for images
// ========================================
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// Easter egg - Konami code
// ========================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 1s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
                alert('🎉 You found the easter egg! Thanks for exploring!');
            }, 2000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Add rainbow animation CSS dynamically
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ========================================
// Console Easter Egg
// ========================================
console.log(`
%c🚀 Hey there, curious developer! 

%cThanks for checking out my portfolio source code!
Feel free to explore and get in touch if you'd like to collaborate.

%c- Pim van Leeuwen
`, 
'color: #64ffda; font-size: 20px; font-weight: bold;',
'color: #8892b0; font-size: 14px;',
'color: #64ffda; font-size: 12px; font-style: italic;'
);

// ========================================
// Performance: Debounce scroll events
// ========================================
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy functions
window.addEventListener('scroll', debounce(highlightNavOnScroll, 20));

// ========================================
// Initialize on DOM ready
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Remove loader after content is ready
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 500);
    
    // Initialize any third-party scripts if needed
    console.log('Portfolio loaded successfully! 🎉');
});

// ========================================
// Service Worker Registration (for PWA support)
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
