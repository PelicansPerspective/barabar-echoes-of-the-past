// Modern Single-Page Barabar Caves Application

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeGallery();
    initializeMobileMenu();
    initializeScrollAnimations();
    addScrollProgress();
    optimizeImages();
});

// Smooth scrolling navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                updateActiveNavLink(this);
                trackUserInteraction('navigation', this.textContent);
            }
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateNavOnScroll);
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Gallery lightbox functionality
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (!lightbox || !lightboxImage || !lightboxCaption || !lightboxClose) {
        console.log('Lightbox elements not found, skipping gallery initialization');
        return;
    }
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.getAttribute('data-title') || img.alt || '';
            const caption = this.getAttribute('data-caption') || '';
            
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxCaption.innerHTML = `<h4>${title}</h4><p>${caption}</p>`;
            
            lightbox.classList.remove('hidden');
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            trackUserInteraction('gallery_view', 'image');
        });
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.navbar-menu');
    
    if (!navbar || !navMenu) return;
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--primary-color);
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    navbar.querySelector('.container').appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', function() {
        const isVisible = navMenu.style.display === 'flex';
        navMenu.style.display = isVisible ? 'none' : 'flex';
    });
    
    // Handle responsive behavior
    function handleResize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            navMenu.style.cssText = `
                display: none;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                padding: 1rem;
                box-shadow: var(--shadow);
                z-index: 1000;
            `;
        } else {
            mobileMenuBtn.style.display = 'none';
            navMenu.style.cssText = `
                display: flex;
                flex-direction: row;
                position: static;
                background: none;
                padding: 0;
                box-shadow: none;
            `;
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate cards and sections
    const animatedElements = document.querySelectorAll('.cave-card, .analysis-card, .insight-card, .gallery-item, .timeline-event, .method-category');
    
    animatedElements.forEach(element => {
        element.style.cssText = `
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        `;
        observer.observe(element);
    });
}

// Scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--accent-color);
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = Math.min(progress, 100) + '%';
    });
}

// Image optimization and lazy loading
function optimizeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Error handling for images
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.log(`Failed to load image: ${this.src}`);
        });
    });
}

// Analytics and tracking
function trackUserInteraction(action, element) {
    console.log(`User action: ${action} on ${element}`);
    // Add your analytics tracking code here
}

// Event listeners for tracking
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-link')) {
        trackUserInteraction('navigation', e.target.textContent);
    }
    
    if (e.target.closest('.gallery-item')) {
        trackUserInteraction('gallery_view', 'image');
    }
    
    if (e.target.classList.contains('doc-link')) {
        trackUserInteraction('document_download', e.target.textContent);
    }
});

// Utility functions for future enhancements
function initializeDataVisualization() {
    // Placeholder for future interactive charts
    console.log('Data visualization initialized');
}

function handleFormSubmissions() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            trackUserInteraction('form_submit', this.id || 'unknown_form');
            // Handle form submission
        });
    });
}

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart);
            }, 0);
        });
    }
}

// Initialize performance monitoring
monitorPerformance();

// Export functions for testing or external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeGallery,
        trackUserInteraction
    };
}
