// ================================================
// EMAAVY AI - Interactive Features
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initFAQ();
    initContactModal();
    initScrollAnimations();
    initSmoothScroll();
});

// -------------------- Contact Modal --------------------
function openModal() {
    const modal = document.getElementById('contactModal');
    const modalForm = document.getElementById('modalForm');
    const modalSuccess = document.getElementById('modalSuccess');
    
    if (modal) {
        // Reset to form view
        if (modalForm) modalForm.style.display = 'block';
        if (modalSuccess) modalSuccess.style.display = 'none';
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('contactModal');
    const form = document.getElementById('contactForm');
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form after animation
        setTimeout(() => {
            if (form) form.reset();
            const modalForm = document.getElementById('modalForm');
            const modalSuccess = document.getElementById('modalSuccess');
            if (modalForm) modalForm.style.display = 'block';
            if (modalSuccess) modalSuccess.style.display = 'none';
        }, 300);
    }
}

// Make functions globally available
window.openModal = openModal;
window.closeModal = closeModal;

function initContactModal() {
    const modal = document.getElementById('contactModal');
    const closeBtn = document.querySelector('.modal-close');
    const form = document.getElementById('contactForm');
    
    if (!modal) return;
    
    // Handle all [data-open-modal] clicks via event delegation
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-open-modal]');
        if (trigger) {
            e.preventDefault();
            openModal();
        }
    });
    
    // Close modal on close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Handle form submission
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = new FormData(form);
    
    try {
        // Submit to Formspree
        const response = await fetch('https://formspree.io/f/maqngkre', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Show success state
            const modalForm = document.getElementById('modalForm');
            const modalSuccess = document.getElementById('modalSuccess');
            
            modalForm.style.display = 'none';
            modalSuccess.style.display = 'block';
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again or email us directly.');
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// -------------------- Navbar --------------------
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');
    
    // Scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            let mobileMenu = document.querySelector('.mobile-menu');
            
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                
                // Check if we're on the contact page
                const isContactPage = window.location.pathname.includes('contact');
                const basePath = isContactPage ? 'index.html' : '';
                
                mobileMenu.innerHTML = `
                    <div class="mobile-menu-content">
                        <a href="${basePath}#features">Features</a>
                        <a href="${basePath}#use-cases">Use Cases</a>
                        <a href="${basePath}#how-it-works">How it Works</a>
                        <a href="${basePath}#pricing">Pricing</a>
                        <div class="mobile-menu-actions">
                            <a href="contact.html" class="btn-primary btn-full">Get Started</a>
                        </div>
                    </div>
                `;
                
                // Add styles for mobile menu
                const style = document.createElement('style');
                style.textContent = `
                    .mobile-menu {
                        position: fixed;
                        top: 70px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(10, 10, 15, 0.98);
                        backdrop-filter: blur(20px);
                        z-index: 999;
                        padding: 2rem;
                        transform: translateX(100%);
                        transition: transform 0.3s ease;
                    }
                    .mobile-menu.active {
                        transform: translateX(0);
                    }
                    .mobile-menu-content {
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                    }
                    .mobile-menu-content a {
                        font-size: 1.25rem;
                        color: var(--color-text-secondary);
                        transition: color 0.2s;
                    }
                    .mobile-menu-content a:hover {
                        color: var(--color-primary);
                    }
                    .mobile-menu-actions {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                        margin-top: 2rem;
                        padding-top: 2rem;
                        border-top: 1px solid var(--color-border);
                    }
                    .mobile-menu-btn.active span:nth-child(1) {
                        transform: rotate(45deg) translate(5px, 5px);
                    }
                    .mobile-menu-btn.active span:nth-child(2) {
                        opacity: 0;
                    }
                    .mobile-menu-btn.active span:nth-child(3) {
                        transform: rotate(-45deg) translate(5px, -5px);
                    }
                `;
                document.head.appendChild(style);
                document.body.appendChild(mobileMenu);
            }
            
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
}

// -------------------- FAQ Accordion --------------------
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// -------------------- Demo Form --------------------
function initDemoForm() {
    const form = document.getElementById('demo-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const phone = document.getElementById('demo-phone').value;
            const name = document.getElementById('demo-name').value;
            
            // Show success state
            const btn = form.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;
            
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" style="width: 20px; height: 20px; animation: spin 1s linear infinite;">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" opacity="0.3"/>
                    <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Calling...
            `;
            btn.disabled = true;
            
            // Add spin animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" style="width: 20px; height: 20px;">
                        <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Call Initiated!
                `;
                btn.style.background = 'linear-gradient(135deg, #28c840 0%, #1ea832 100%)';
                
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.background = '';
                    btn.disabled = false;
                    form.reset();
                }, 3000);
            }, 2000);
        });
    }
}

// -------------------- Scroll Animations --------------------
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .animate-on-scroll:nth-child(2) { transition-delay: 0.1s; }
        .animate-on-scroll:nth-child(3) { transition-delay: 0.2s; }
        .animate-on-scroll:nth-child(4) { transition-delay: 0.3s; }
        .animate-on-scroll:nth-child(5) { transition-delay: 0.4s; }
        .animate-on-scroll:nth-child(6) { transition-delay: 0.5s; }
        .animate-on-scroll:nth-child(7) { transition-delay: 0.6s; }
    `;
    document.head.appendChild(style);
    
    // Observe elements
    const animateElements = document.querySelectorAll(
        '.use-case-card, .step-card, .feature-card, .testimonial-card, .pricing-card, .integration-item'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// -------------------- Smooth Scroll --------------------
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.querySelector('.mobile-menu-btn').classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// -------------------- Counter Animation --------------------
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        
        // Only animate numeric values
        if (!/^\d/.test(target)) return;
        
        const numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
        const suffix = target.replace(/[\d.]/g, '');
        const duration = 2000;
        const increment = numericValue / (duration / 16);
        
        let current = 0;
        counter.textContent = '0' + suffix;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < numericValue) {
                counter.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        });
        
        observer.observe(counter);
    });
}

// Initialize counter animation
animateCounters();

// -------------------- Typing Effect for Hero --------------------
function initTypingEffect() {
    const phrases = [
        'recruitment screening',
        'customer service',
        'lead qualification',
        'appointment setting',
        'debt collection'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingElement = document.querySelector('.typing-text');
    
    if (!typingElement) return;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// -------------------- Parallax Effect --------------------
function initParallax() {
    const orbs = document.querySelectorAll('.hero-orb');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = mouseX * speed;
            const y = mouseY * speed;
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

initParallax();

