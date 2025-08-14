// GitHub Pages optimization and hash-based routing
window.addEventListener('load', function() {
    // Auto-switch to view from URL hash
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'gallery', 'data', 'insights'].includes(hash)) {
        switchView(hash);
    }
});

// Handle browser back/forward navigation
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'gallery', 'data', 'insights'].includes(hash)) {
        switchView(hash);
    }
});

// Application Data
const timelineData = [
  {"period": "3rd Century BCE", "event": "Mauryan Empire at peak under Ashoka"},
  {"period": "261 BCE", "event": "Sudama Cave dedicated by Ashoka to Ajivikas"},
  {"period": "~250 BCE", "event": "Lomas Rishi & Visvakarma caves constructed"},
  {"period": "245 BCE", "event": "Karna Chaupar Cave completed with inscriptions"},
  {"period": "~230 BCE", "event": "Nagarjuni caves built by Dasaratha Maurya"},
  {"period": "1785 CE", "event": "Rediscovered by John H. Harington"},
  {"period": "1861-62 CE", "event": "Cunningham's archaeological survey"},
  {"period": "2009 CE", "event": "Basaha Minor Rock Edict discovered"},
  {"period": "2020-25 CE", "event": "Modern 3D laser & acoustic studies"}
];

const cavesData = [
  {"name": "Sudama Cave", "location": "Barabar", "patron": "Ashoka", "date": "261 BCE", "type": "Ajivika", "features": "Circular chamber; mirror polish"},
  {"name": "Lomas Rishi Cave", "location": "Barabar", "patron": "Ashoka", "date": "~250 BCE", "type": "Buddhist (unfinished)", "features": "Chaitya arch entrance"},
  {"name": "Karna Chaupar Cave", "location": "Barabar", "patron": "Ashoka", "date": "245 BCE", "type": "Ajivika", "features": "Rectangular hall, finest inscriptions"},
  {"name": "Visvakarma Cave", "location": "Barabar", "patron": "Ashoka", "date": "~250 BCE", "type": "Ajivika", "features": "Two-room layout"},
  {"name": "Gopika Cave", "location": "Nagarjuni", "patron": "Dasaratha", "date": "~230 BCE", "type": "Ajivika", "features": "Largest chamber, 72-sec echo"},
  {"name": "Vadathika Cave", "location": "Nagarjuni", "patron": "Dasaratha", "date": "~230 BCE", "type": "Ajivika", "features": "2:3 proportions, geometric twin"},
  {"name": "Vapiyaka Cave", "location": "Nagarjuni", "patron": "Dasaratha", "date": "~230 BCE", "type": "Ajivika", "features": "Resonance 34.4 Hz"}
];

const galleryImages = [
  {
    id: 'lomas-rishi-entrance',
    src: 'https://pplx-res.cloudinary.com/image/upload/v1755145333/pplx_project_search_images/f89dcd9acee62f15d4a8dae4f931db54592aca0b.png',
    title: 'Lomas Rishi Cave Entrance',
    caption: 'The distinctive chaitya arch entrance of Lomas Rishi Cave, showcasing the sophisticated architectural design of the Mauryan period.'
  },
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