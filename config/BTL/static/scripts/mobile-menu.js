// Enhanced mobile menu with error handling
document.addEventListener('DOMContentLoaded', () => {
    try {
      const menuBtn = document.querySelector('.mobile-menu-btn');
      const navbar = document.querySelector('.navbar');
  
      if (!menuBtn || !navbar) {
        console.warn('Mobile menu elements not found');
        return;
      }
  
      menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navbar.classList.toggle('active');
        
        // Update ARIA attributes for accessibility
        const isActive = navbar.classList.contains('active');
        menuBtn.setAttribute('aria-expanded', isActive);
      });
  
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navbar.classList.contains('active')) {
          navbar.classList.remove('active');
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
  
    } catch (error) {
      console.error('Error initializing mobile menu:', error);
    }
  });