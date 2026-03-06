// AJAX / Dynamic Gallery Data
const projectData = [{
        title: "Motion Reel",
        cat: "video",
        video: "https://www.youtube.com/watch?v=20VCrgXofdk",
        img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Website Design",
        cat: "web",
        link: "https://puroheritage.github.io/website/",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"
    },
    {
        title: "Responsive Design",
        cat: "web",
        link: "https://cp-nex.github.io/coinpay_website/",
        img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800"
    },
    {
        title: "Brand Identity",
        cat: "graphic",
        link: "https://www.behance.net/chander_kumar/",
        img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800"
    },
    {
        title: "E-Commerce web software",
        cat: "web",
        link: "https://huionproject.great-site.net/",
        img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800"
    },

    {
        title: "E-Commerce Full Stack",
        cat: "web",
        img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
        link: "https://your-live-link.com",
        desc: "MERN Stack + SEO Optimized"
    },
    {
        title: "Fintech App UI",
        cat: "uiux",
        img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        link: "https://www.figma.com/proto/JAGPRgFo3tRP8KQOcS83BA/High-fedility-app?node-id=788-8352&p=f&t=ROJt9c7qJdFQZ9HS-0&scaling=scale-down&content-scaling=fixed&page-id=788%3A8352",
        desc: "Modern Neumorphic Design"
    },
    {
        title: "My Portfolio",
        cat: "portfolio",
        img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800",
        link: "#", // Example ID
        desc: "After Effects Animation"
    }


];

function loadGallery(filter = 'all') {
    const wrapper = $('#gallery-wrapper');

    // Use GSAP to fade out
    gsap.to(wrapper, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            wrapper.empty(); // Clear content

            const filtered = filter === 'all' ? projectData : projectData.filter(p => p.cat === filter);

            if (filtered.length === 0) {
                wrapper.append('<div class="col-12 text-center text-secondary py-5">No projects found in this category.</div>');
            }

            filtered.forEach(proj => {
                // Action button logic based on data
                let actionBtn = '';
                if (proj.video) {
                    actionBtn = `<button class="btn btn-sm btn-outline-light mt-3 hover-target" onclick="playVideo('${proj.video}')">Play Video <i class="fas fa-play ms-1"></i></button>`;
                } else if (proj.link) {
                    actionBtn = `<a href="${proj.link}" target="_blank" class="btn btn-sm btn-outline-light mt-3 hover-target">Live Demo <i class="fas fa-external-link-alt ms-1"></i></a>`;
                } else {
                    actionBtn = `<button class="btn btn-sm btn-outline-light mt-3 hover-target">View Project</button>`;
                }

                wrapper.append(`
                <div class="col-md-12 gallery-card">
                    <div class="gallery-item hover-target">
                        <img src="${proj.img}" class="gallery-img" alt="${proj.title}">
                        <div class="gallery-overlay">
                            <h4 class="primary-color">${proj.title}</h4>
                            ${proj.desc ? `<p class="text-white small mb-0">${proj.desc}</p>` : ''}
                            ${actionBtn}
                        </div>
                    </div>
                </div>
            `);
            });

            // Set wrapper to visible but items hidden
            wrapper.css('opacity', 1);

            // Animate items in
            gsap.fromTo(".gallery-card", {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "all"
            });

            // Refresh ScrollTrigger to recalculate positions for subsequent sections
            ScrollTrigger.refresh();
        }
    });
}

// Navbar Scroll Effect
$(window).scroll(function () {
    if ($(window).scrollTop() > 50) {
        $('.navbar').addClass('scrolled');
    } else {
        $('.navbar').removeClass('scrolled');
    }
});

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Mouse Move Logic
window.addEventListener('mousemove', function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows instantly (Native JS for speed)
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with delay (using GSAP for smoothness)
    gsap.to(cursorOutline, {
        x: posX,
        y: posY,
        duration: 0.15,
        ease: "power2.out"
    });
});

// Magnetic Button Effect & Hover States
const hoverTargets = document.querySelectorAll('a, button, .hover-target, .nav-link, .service-card, .process-card, .tool-card, .pricing-card, .blog-card, .accordion-button');

hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursorOutline, {
            scale: 2,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderColor: "transparent",
            duration: 0.3
        });
        gsap.to(cursorDot, {
            scale: 0,
            duration: 0.3
        }); // Hide dot on hover
    });

    el.addEventListener('mouseleave', () => {
        gsap.to(cursorOutline, {
            scale: 1,
            backgroundColor: "transparent",
            duration: 0.3,
            clearProps: "borderColor"
        });
        gsap.to(cursorDot, {
            scale: 1,
            duration: 0.3
        });
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.3
        }); // Reset magnetic position
    });

    // Magnetic Effect Logic
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Move element slightly towards cursor
        gsap.to(el, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// 2. Typewriter Scrub Animation (Type on Scroll Down, Untype on Scroll Up)
function setupTypewriter() {
    const elements = document.querySelectorAll('.typewriter-text');

    elements.forEach(el => {
        const text = el.innerText;
        // Split text into characters, preserving spaces
        el.innerHTML = text.split('').map(char => {
            return `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`;
        }).join('');

        const chars = el.querySelectorAll('.char');

        gsap.to(chars, {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "bottom 55%",
                scrub: true // Links animation progress directly to scrollbar
            }
        });
    });
}
setupTypewriter();

// 3. Webkit Text Fill Color Scroll Effect
// This animates the gradient background of the text on scroll
gsap.utils.toArray('.text-fill-anim').forEach(text => {
    gsap.to(text, {
        backgroundSize: "100% 100%", // Animate width of the fill
        ease: "none",
        scrollTrigger: {
            trigger: text,
            start: "top 80%", // Animation starts when text is near bottom of screen
            end: "bottom 20%", // Ends when text is near top
            scrub: true
        }
    });
});

// 4. Hero Section Timeline Animation
const heroTl = gsap.timeline();
heroTl.from(".navbar", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    })
    .from(".hero-anim", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
    }, "-=0.5");

// NEW: Marquee Animation
gsap.to(".marquee-content", {
    xPercent: -50,
    repeat: -1,
    duration: 20, /* Slower, smoother speed */
    ease: "linear"
});

// 5. NEW: Toolkit Marquee Scroll Animation
function setupToolMarquee() {
    const rows = document.querySelectorAll(".tool-marquee-row");

    rows.forEach((row, i) => {
        const cards = Array.from(row.children);
        // Duplicate the cards in a seamless loop
        cards.forEach(card => {
            row.appendChild(card.cloneNode(true));
        });

        // Determine direction based on row index (0 = left, 1 = right)
        const direction = i % 2 === 0 ? -1 : 1;

        // Set the starting position for the row going to the right
        if (direction === 1) {
            gsap.set(row, {
                xPercent: -50
            });
        }

        gsap.to(row, {
            xPercent: direction === -1 ? -50 : 0,
            ease: "none",
            scrollTrigger: {
                trigger: "#tools",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
            }
        });
    });
}
setupToolMarquee();

// 6. General Section Reveal (Cards, Paragraphs, etc.)
// Removed specific cards to apply custom Left/Right animations below
const revealElements = gsap.utils.toArray("section p, .testi-card, .btn-main");

revealElements.forEach((element) => {
    // Skip elements inside hero as they have their own timeline
    if (element.closest('.hero')) return;

    gsap.fromTo(element, {
        y: 50,
        opacity: 0
    }, {
        scrollTrigger: {
            trigger: element,
            start: "top 85%", // Animation starts when element is 85% down the viewport
            toggleActions: "play reverse play reverse",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    });
});

// 7. Advanced Left/Right Scroll Animations

// About Section - Parallax Scrubbing (Moves with scroll)
gsap.fromTo(".about-img-wrapper", {
    x: -150,
    opacity: 0
}, {
    scrollTrigger: {
        trigger: "#about",
        start: "top 85%",
        end: "top 20%",
        scrub: 1, // Smooth scrubbing linked to scrollbar
    },
    x: 0,
    opacity: 1,
});

gsap.fromTo("#about .col-lg-6", {
    x: 150,
    opacity: 0
}, {
    scrollTrigger: {
        trigger: "#about",
        start: "top 85%",
        end: "top 20%",
        scrub: 1,
    },
    x: 0,
    opacity: 1,
});

// Services - Alternating Entry (Left, Bottom, Right)
gsap.utils.toArray(".service-card").forEach((card, i) => {
    const xVal = i === 0 ? -100 : (i === 2 ? 100 : 0);
    const yVal = i === 1 ? 100 : 0;

    gsap.fromTo(card, {
        x: xVal,
        y: yVal,
        opacity: 0
    }, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
        },
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    });
});

// Process - Alternating Left/Right
gsap.utils.toArray(".process-card").forEach((card, i) => {
    const xVal = i % 2 === 0 ? -100 : 100;

    gsap.fromTo(card, {
        x: xVal,
        opacity: 0
    }, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    });
});

// Pricing - Left/Right
gsap.utils.toArray(".pricing-card").forEach((card, i) => {
    const xVal = i === 0 ? -100 : 100;

    gsap.fromTo(card, {
        x: xVal,
        opacity: 0
    }, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    });
});

// Blog - Alternating
gsap.utils.toArray(".blog-card").forEach((card, i) => {
    const xVal = i === 0 ? -100 : (i === 2 ? 100 : 0);
    const yVal = i === 1 ? 100 : 0;

    gsap.fromTo(card, {
        x: xVal,
        y: yVal,
        opacity: 0
    }, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
        },
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    });
});

// Timeline - Slide from Left
gsap.utils.toArray(".timeline-item").forEach((item, i) => {
    gsap.fromTo(item, {
        x: -100,
        opacity: 0
    }, {
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    });
});

// Gallery Header: Title Left, Filters Right
gsap.fromTo("#gallery h2", {
    x: -100,
    opacity: 0
}, {
    scrollTrigger: {
        trigger: "#gallery",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    },
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out"
});

gsap.fromTo("#filter-btns", {
    x: 100,
    opacity: 0
}, {
    scrollTrigger: {
        trigger: "#gallery",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    },
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out"
});

// Contact Section: Text Left, Form Right
gsap.fromTo("#contact .col-md-6:first-child", {
    x: -100,
    opacity: 0
}, {
    scrollTrigger: {
        trigger: "#contact",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    },
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out"
});

gsap.fromTo("#contact .col-md-6:last-child", {
    x: 100,
    opacity: 0
}, {
    scrollTrigger: {
        trigger: "#contact",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
    },
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out"
});

// Optimized Video Player
function playVideo(url) {
    // Autoplay enable
    const videoUrl = url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`;
    $('#projectVideo').attr('src', videoUrl);

    const myModal = new bootstrap.Modal(document.getElementById('videoModal'));
    myModal.show();
}

// Modal clear on close (Security Fix)
$(document).on('hidden.bs.modal', '#videoModal', function () {
    $('#projectVideo').attr('src', '');
});

// Filter Function with active class fix
function filterGallery(cat, btn) {
    // Button styling update
    $('#filter-btns button').removeClass('active btn-primary').addClass('btn-outline-primary');
    $(btn).addClass('active btn-primary').removeClass('btn-outline-primary');

    loadGallery(cat);
}

// Initial Load
$(document).ready(() => {
    loadGallery('all');

    // --- THEME SWITCHER LOGIC ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    if (themeSwitcher) {
        const icon = themeSwitcher.querySelector('i');

        const applyTheme = (theme) => {
            if (theme === 'light') {
                body.classList.add('light-mode');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-mode');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            }
        };

        const savedTheme = localStorage.getItem('theme') || 'light'; // Default to dark
        applyTheme(savedTheme);

        themeSwitcher.addEventListener('click', () => {
            const newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    } 
});

// --- EMAILJS ENQUIRY LOGIC ---

const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Debugging ke liye check karein ki button click ho raha hai ya nahi
        console.log("Form submit ho raha hai...");

        emailjs.sendForm("service_u4jukmf", "template_spcg32q", this)
        .then(function(response) {
            console.log("SUCCESS!", response.status, response.text);
            document.getElementById("success-msg").innerHTML = "Message Sent Successfully!";
            contactForm.reset();
        }, function(error) {
            console.log("FAILED...", error);
            alert("Failed to send message. Error: " + JSON.stringify(error));
        });
    });
}

// --- TYPING ANIMATION FOR HERO ---
const typingText = document.querySelector('.typing-text');
if(typingText) {
    const words = ["Web Designer", "Web Developer", "Graphic Designer", "UI/UX Designer", "Visual Artist", "Media Content Manager"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Backspace Effect
            charIndex--;
            typingText.textContent = currentWord.substring(0, charIndex);
        } else {
            // Typing Effect
            charIndex++;
            typingText.textContent = currentWord.substring(0, charIndex);
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Word Complete - Pause before deleting
            isDeleting = true;
            setTimeout(typeEffect, 2000); // Pause at end
        } else if (isDeleting && charIndex === 0) {
            // Word Deleted - Move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 500);
        } else {
            // Typing speed (100ms) vs Deleting speed (50ms - faster)
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }
    typeEffect();
}

// --- ABOUT CARD SPOTLIGHT EFFECT ---
const spotlightCards = document.querySelectorAll('.about-stat-card, .about-content-card, .service-card, .process-card, .pricing-card, .blog-card, .tool-card');
spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// --- SKILLS PROGRESS BAR ANIMATION ---
if (document.querySelector('.progress-bar')) {
    gsap.utils.toArray('.progress-bar').forEach(bar => {
        gsap.fromTo(bar, 
            { width: '0%' }, 
            {
                width: () => bar.parentElement.getAttribute('aria-valuenow') + '%',
                scrollTrigger: {
                    trigger: bar.parentElement,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
                duration: 1.5,
                ease: 'power3.out'
            }
        );
    });
}

// --- SCROLL TO TOP PROGRESS ---
const progressWrap = document.querySelector('.progress-wrap');
if (progressWrap) {
    const updateProgress = function () {
        const scroll = $(window).scrollTop();
        const height = $(document).height() - $(window).height();
        const progress = (scroll / height) * 100;
        progressWrap.style.setProperty('--scroll-height', progress + '%');
    }

    updateProgress();
    $(window).scroll(updateProgress);

    const offset = 50;
    const duration = 550;
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > offset) {
            $('.progress-wrap').addClass('active-progress');
            $('.floating-contact-btn').addClass('btn-visible');
        } else {
            $('.progress-wrap').removeClass('active-progress');
            $('.floating-contact-btn').removeClass('btn-visible');
        }
    });

    $('.progress-wrap').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    });
}

// --- FLOATING CONTACT BUTTON LOGIC ---
const contactBtn = document.querySelector('.floating-contact-btn');
const contactModalEl = document.getElementById('contactModal');

if (contactBtn && contactModalEl) {
    const contactModal = new bootstrap.Modal(contactModalEl);
    
    // Toggle Modal on Button Click
    contactBtn.addEventListener('click', () => {
        if (contactModalEl.classList.contains('show')) {
            contactModal.hide();
        } else {
            contactModal.show();
        }
    });

    // Sync Button Icon with Modal State
    contactModalEl.addEventListener('show.bs.modal', () => {
        contactBtn.classList.add('active');
    });
    contactModalEl.addEventListener('hide.bs.modal', () => {
        contactBtn.classList.remove('active');
    });
}

// --- QUICK CONTACT FORM SUBMISSION ---
const quickForm = document.getElementById('quick-contact-form');
if (quickForm) {
    quickForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'SENDING...';
        
        emailjs.sendForm("service_u4jukmf", "template_spcg32q", this)
            .then(() => {
                document.getElementById("quick-success-msg").innerText = "Message Sent Successfully!";
                this.reset();
                setTimeout(() => {
                    btn.innerText = originalText;
                    document.getElementById("quick-success-msg").innerText = "";
                    // Optional: Close modal after success
                    // bootstrap.Modal.getInstance(contactModalEl).hide();
                }, 3000);
            }, (error) => {
                console.log("FAILED...", error);
                alert("Failed to send message.");
                btn.innerText = originalText;
            });
    });
}









