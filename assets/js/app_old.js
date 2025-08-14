// Modern Single-Page Barabar Caves Application

// Smooth scrolling navigation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize gallery
    initializeGallery();
    
    // Initialize responsive navigation for mobile
    initializeMobileMenu();
    
    // Add scroll animations
    initializeScrollAnimations();
});

// Navigation functionality
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
                
                // Update active nav link
                updateActiveNavLink(this);
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

// Gallery functionality
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.getAttribute('data-title') || '';
            const caption = this.getAttribute('data-caption') || '';
            
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxCaption.innerHTML = `<h4>${title}</h4><p>${caption}</p>`;
            
            lightbox.classList.remove('hidden');
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
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
    // Add mobile menu toggle for smaller screens
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.navbar-menu');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.display = 'none';
    mobileMenuBtn.style.background = 'none';
    mobileMenuBtn.style.border = 'none';
    mobileMenuBtn.style.fontSize = '1.5rem';
    mobileMenuBtn.style.color = 'var(--primary-color)';
    mobileMenuBtn.style.cursor = 'pointer';
    
    navbar.querySelector('.container').appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Handle responsive behavior
    function handleResize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            navMenu.style.display = 'none';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'white';
            navMenu.style.padding = '1rem';
            navMenu.style.boxShadow = 'var(--shadow)';
        } else {
            mobileMenuBtn.style.display = 'none';
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'row';
            navMenu.style.position = 'static';
            navMenu.style.background = 'none';
            navMenu.style.padding = '0';
            navMenu.style.boxShadow = 'none';
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
    const animatedElements = document.querySelectorAll('.cave-card, .analysis-card, .insight-card, .gallery-item, .timeline-event');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Enhanced data visualization (if needed for future features)
function initializeDataVisualization() {
    // Placeholder for future interactive charts
    // This could integrate with Chart.js or D3.js for more dynamic visualizations
    console.log('Data visualization initialized');
}

// Performance optimization
function optimizeImages() {
    // Lazy loading for images
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
}

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.log(`Failed to load image: ${this.src}`);
        });
    });
});

// Analytics and tracking (placeholder)
function trackUserInteraction(action, element) {
    // Placeholder for analytics tracking
    console.log(`User action: ${action} on ${element}`);
}

// Add event listeners for tracking
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

// Scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'var(--accent-color)';
    progressBar.style.zIndex = '1001';
    progressBar.style.transition = 'width 0.3s ease';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = Math.min(progress, 100) + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', addScrollProgress);
  {
    id: 'polished-interior',
    src: 'https://pplx-res.cloudinary.com/image/upload/v1755129533/pplx_project_search_images/394b11a6e4d1c720903ed4beb7c1725faa606a05.png',
    title: 'Polished Interior Surfaces',
    caption: 'The mirror-like polished granite surfaces inside Barabar caves, demonstrating extraordinary craftsmanship with roughness grades superior to modern engineering.'
  },
  {
    id: 'brahmi-inscriptions',
    src: 'https://pplx-res.cloudinary.com/image/upload/v1755137202/pplx_project_search_images/a9b2fd65ec360aecc83f4f997ce92fa4b2d4a43f.png',
    title: 'Ancient Brahmi Inscriptions',
    caption: 'Mauryan-period Brahmi script inscriptions providing crucial epigraphic evidence of Ashoka\'s patronage and the caves\' religious significance.'
  },
  {
    id: 'architectural-detail',
    src: 'https://pplx-res.cloudinary.com/image/upload/v1755012245/pplx_project_search_images/4482430cd68a16dbca74d60003852c0d0ae12b5d.png',
    title: 'Architectural Details',
    caption: 'Intricate elephant head carvings and geometric patterns demonstrating the artistic sophistication of ancient Indian rock-cut architecture.'
  },
  {
    id: 'nagarjuni-inscriptions',
    src: 'https://pplx-res.cloudinary.com/image/upload/v1755145333/pplx_project_search_images/d670b30bba80966b6d496926f3140386fc00448d.png',
    title: 'Nagarjuni Hill Inscriptions',
    caption: 'Inscriptions from Nagarjuni Hill caves attributed to Dasaratha Maurya, showcasing the continuation of royal patronage in cave construction.'
  },
  {
    id: 'gopika-inscription',
    src: 'https://pplx-res.cloudinary.com/image/upload/v1755145333/pplx_project_search_images/5be14bbd862cbf227dab79e247e7e4ceebdc9ab2.png',
    title: 'Gopika Cave Inscription',
    caption: 'Double-column stone inscription demonstrating the sophisticated administrative and religious documentation systems of the Mauryan period.'
  }
];

// Application State
let currentView = 'home';
let filteredCavesData = [...cavesData];

// DOM Elements - Initialize after DOM loads
let navButtons, views, timelineContainer, galleryGrid, cavesTableBody, caveFilter;
let lightbox, lightboxImage, lightboxCaption, lightboxClose, accordionHeaders;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  // Initialize DOM elements
  initializeDOMElements();
  
  // Initialize functionality
  initializeNavigation();
  renderTimeline();
  renderGallery();
  renderCavesTable();
  initializeAccordion();
  initializeLightbox();
  initializeTableFilter();
});

// Initialize DOM Elements
function initializeDOMElements() {
  navButtons = document.querySelectorAll('.nav-btn');
  views = document.querySelectorAll('.view');
  timelineContainer = document.getElementById('timeline');
  galleryGrid = document.getElementById('gallery-grid');
  cavesTableBody = document.getElementById('caves-table-body');
  caveFilter = document.getElementById('cave-filter');
  lightbox = document.getElementById('lightbox');
  lightboxImage = document.getElementById('lightbox-image');
  lightboxCaption = document.querySelector('.lightbox-caption');
  lightboxClose = document.querySelector('.lightbox-close');
  accordionHeaders = document.querySelectorAll('.accordion-header');
}

// Navigation System
function initializeNavigation() {
  if (!navButtons) return;
  
  navButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const targetView = this.dataset.view;
      console.log('Switching to view:', targetView); // Debug log
      switchView(targetView);
      updateActiveNavButton(this);
    });
  });
}

function switchView(viewName) {
  console.log('switchView called with:', viewName); // Debug log
  
  if (!views) {
    console.error('Views not found');
    return;
  }
  
  // Hide all views
  views.forEach(view => {
    view.classList.remove('active');
    console.log('Removing active from:', view.id); // Debug log
  });
  
  // Determine target view ID based on view name
  let targetViewId;
  switch(viewName) {
    case 'home':
      targetViewId = 'home-view';
      break;
    case 'gallery':
      targetViewId = 'gallery-view';
      break;
    case 'data':
      targetViewId = 'data-view';
      break;
    case 'insights':
      targetViewId = 'insights-view';
      break;
    default:
      targetViewId = 'home-view';
  }
  
  // Show target view
  const targetView = document.getElementById(targetViewId);
  if (targetView) {
    targetView.classList.add('active');
    currentView = viewName;
    console.log('Activated view:', targetViewId); // Debug log
    
    // Update URL hash for bookmarking and GitHub Pages compatibility
    if (window.location.hash !== '#' + viewName) {
      window.location.hash = viewName;
    }
    
    // Scroll to top when switching views
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    console.error('Target view not found:', targetViewId);
  }
}

function updateActiveNavButton(activeButton) {
  if (!navButtons) return;
  
  navButtons.forEach(button => {
    button.classList.remove('active');
  });
  activeButton.classList.add('active');
}

// Timeline Rendering
function renderTimeline() {
  if (!timelineContainer) return;
  
  timelineContainer.innerHTML = '';
  
  timelineData.forEach(item => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    
    timelineItem.innerHTML = `
      <div class="timeline-period">${item.period}</div>
      <p class="timeline-event">${item.event}</p>
    `;
    
    timelineContainer.appendChild(timelineItem);
  });
}

// Gallery Rendering
function renderGallery() {
  if (!galleryGrid) return;
  
  galleryGrid.innerHTML = '';
  
  galleryImages.forEach(image => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.dataset.imageId = image.id;
    
    galleryItem.innerHTML = `
      <img src="${image.src}" alt="${image.title}" class="gallery-image" loading="lazy">
      <div class="gallery-caption">
        <h3>${image.title}</h3>
        <p>${image.caption}</p>
      </div>
    `;
    
    galleryItem.addEventListener('click', function() {
      openLightbox(image);
    });
    
    galleryGrid.appendChild(galleryItem);
  });
}

// Caves Table Rendering
function renderCavesTable() {
  if (!cavesTableBody) return;
  
  cavesTableBody.innerHTML = '';
  
  filteredCavesData.forEach(cave => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${cave.name}</td>
      <td>${cave.location}</td>
      <td>${cave.patron}</td>
      <td>${cave.date}</td>
      <td>${cave.type}</td>
      <td>${cave.features}</td>
    `;
    cavesTableBody.appendChild(row);
  });
}

// Table Filtering
function initializeTableFilter() {
  if (!caveFilter) return;
  
  caveFilter.addEventListener('change', function() {
    const filterValue = this.value;
    console.log('Filter changed to:', filterValue); // Debug log
    
    if (filterValue === 'all') {
      filteredCavesData = [...cavesData];
    } else {
      filteredCavesData = cavesData.filter(cave => cave.location === filterValue);
    }
    
    renderCavesTable();
  });
}

// Lightbox Functionality
function initializeLightbox() {
  if (!lightboxClose || !lightbox) return;
  
  lightboxClose.addEventListener('click', closeLightbox);
  
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });
}

function openLightbox(image) {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;
  
  lightboxImage.src = image.src;
  lightboxImage.alt = image.title;
  lightboxCaption.innerHTML = `
    <h3>${image.title}</h3>
    <p>${image.caption}</p>
  `;
  
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  
  lightbox.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Accordion Functionality
function initializeAccordion() {
  if (!accordionHeaders) return;
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const targetId = this.dataset.target;
      const accordionItem = this.parentElement;
      const isActive = accordionItem.classList.contains('active');
      
      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        accordionItem.classList.add('active');
      }
    });
  });
}

// Utility Functions
function debounce(func, wait) {
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

// Handle window resize for responsive behavior
const handleResize = debounce(function() {
  // Trigger responsive adjustments if needed
  if (currentView === 'gallery' && galleryGrid) {
    // Force repaint for gallery grid
    galleryGrid.style.display = 'none';
    galleryGrid.offsetHeight; // Trigger reflow
    galleryGrid.style.display = '';
  }
}, 250);

window.addEventListener('resize', handleResize);

// Print preparation
window.addEventListener('beforeprint', function() {
  // Ensure all accordion items are expanded for print
  document.querySelectorAll('.accordion-item').forEach(item => {
    item.classList.add('active');
  });
  
  // Close lightbox if open
  closeLightbox();
});

window.addEventListener('afterprint', function() {
  // Restore accordion states
  document.querySelectorAll('.accordion-item').forEach(item => {
    item.classList.remove('active');
  });
});

// Error handling for images
document.addEventListener('error', function(e) {
  if (e.target.tagName === 'IMG') {
    console.warn('Failed to load image:', e.target.src);
    // Create placeholder for failed images
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.style.cssText = `
      width: 100%;
      height: 250px;
      background: var(--color-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-secondary);
      border-radius: var(--radius-base);
    `;
    placeholder.textContent = 'Image unavailable';
    e.target.parentNode.replaceChild(placeholder, e.target);
  }
}, true);

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
  // Tab navigation enhancement for accordion
  if (e.key === 'Enter' || e.key === ' ') {
    if (e.target.classList.contains('accordion-header')) {
      e.preventDefault();
      e.target.click();
    }
    // Navigation with keyboard
    if (e.target.classList.contains('nav-btn')) {
      e.preventDefault();
      e.target.click();
    }
  }
});

// Analytics placeholder (for future implementation)
function trackEvent(category, action, label) {
  console.log('Event tracked:', { category, action, label });
}

// Track navigation events
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('nav-btn')) {
    trackEvent('Navigation', 'View Switch', e.target.dataset.view);
  }
  
  if (e.target.closest('.gallery-item')) {
    const imageId = e.target.closest('.gallery-item').dataset.imageId;
    trackEvent('Gallery', 'Image Click', imageId);
  }
});

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', function() {
    // Log load performance
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
  });
}

// Debug helper - remove in production
window.debugBarabar = {
  switchView,
  currentView: () => currentView,
  cavesData,
  timelineData,
  galleryImages
};