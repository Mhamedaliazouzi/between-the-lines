// Enhanced 3D card effect with performance optimization
document.addEventListener('DOMContentLoaded', () => {
    try {
      const card = document.querySelector('.btl-positivity-card');
      
      if (!card) {
        console.warn('Positivity card not found');
        return;
      }
  
      let isAnimating = false;
  
      // Throttle mousemove for better performance
      const handleMouseMove = (e) => {
        if (isAnimating) return;
        
        isAnimating = true;
        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const angleX = (y - centerY) / 30;
          const angleY = (centerX - x) / 30;
          
          card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
          isAnimating = false;
        });
      };
  
      const handleMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        card.style.transition = 'transform 0.5s ease';
        
        // Remove transition after animation completes
        setTimeout(() => {
          card.style.transition = '';
        }, 500);
      };
  
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
  
      // Cleanup function (useful if you need to remove listeners)
      window.cleanup3DEffect = () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
  
    } catch (error) {
      console.error('Error initializing 3D card effect:', error);
    }
  });