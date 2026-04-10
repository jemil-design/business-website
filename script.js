// Scroll Animation Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay based on index within parent
            const siblings = Array.from(entry.target.parentElement?.children || []);
            const siblingIndex = siblings.indexOf(entry.target);
            const delay = Math.min(siblingIndex * 100, 400);
            
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, delay);
        }
    });
}, observerOptions);

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Hero section animations (animate on load - no scroll needed)
    document.querySelector('.hero-content')?.classList.add('animated');
    document.querySelector('.hero-image')?.classList.add('animated');
    
    // Observe sections for scroll animations
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in, .scale-in, .float-in');
    animatedElements.forEach(el => observer.observe(el));
    
    // Navbar scroll effect
    const navbar = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    // Smooth scroll for all anchor links with hash hrefs (nav, hero buttons, footer)
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    allAnchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Skip if href is just "#" (empty anchor)
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollPosition = window.pageYOffset + 150;
        let activeSection = null;
        
        // Find the current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = section.getAttribute('id');
            }
        });
        
        // Update nav link styles
        navLinks.forEach(link => {
            // Reset all links to default state
            link.classList.remove('border-b-2', 'border-emerald-800', 'text-emerald-800');
            link.classList.add('text-stone-600', 'dark:text-stone-400');
            
            // Set active link
            if (activeSection && link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('border-b-2', 'border-emerald-800', 'text-emerald-800', 'dark:text-emerald-400');
                link.classList.remove('text-stone-600', 'dark:text-stone-400');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Run on load
});