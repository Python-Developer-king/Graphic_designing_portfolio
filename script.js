document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     MOBILE MENU
  ========================= */

  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");

      const isOpen = mobileMenu.classList.contains("active");

      menuToggle.setAttribute("aria-expanded", isOpen);

      const lines = menuToggle.querySelectorAll(".menu-line");

      if (isOpen) {
        if (lines[0]) lines[0].style.transform = "rotate(45deg) translateY(5px)";
        if (lines[1]) lines[1].style.opacity = "0";
        if (lines[2]) lines[2].style.transform = "rotate(-45deg) translateY(-5px)";
      } else {
        if (lines[0]) lines[0].style.transform = "";
        if (lines[1]) lines[1].style.opacity = "";
        if (lines[2]) lines[2].style.transform = "";
      }
    });

    document.querySelectorAll(".mobile-nav-link").forEach(function (link) {

      link.addEventListener("click", function () {

        mobileMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        const lines = menuToggle.querySelectorAll(".menu-line");

        if (lines[0]) lines[0].style.transform = "";
        if (lines[1]) lines[1].style.opacity = "";
        if (lines[2]) lines[2].style.transform = "";

      });

    });

  }


  /* =========================
     NAVBAR
  ========================= */

  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {

    if (!navbar) return;

    if (window.scrollY > 50) {

      navbar.style.background = "rgba(10,10,10,0.9)";
      navbar.style.backdropFilter = "blur(20px)";

    } else {

      navbar.style.background = "";
      navbar.style.backdropFilter = "";

    }

  });


  /* =========================
     SCROLL PROGRESS
  ========================= */

  const scrollProgress = document.getElementById("scrollProgress");

  window.addEventListener("scroll", function () {

    if (!scrollProgress) return;

    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (documentHeight <= 0) return;

    const progress = scrollTop / documentHeight;

    scrollProgress.style.transform =
      "scaleX(" + progress + ")";

  });


  /* =========================
     PRELOADER
  ========================= */

  const preloader = document.getElementById("preloader");
  const preloaderCount = document.getElementById("preloaderCount");
  const preloaderBar = document.getElementById("preloaderBar");

  let progress = 0;

  if (preloader) {

    const loader = setInterval(function () {

      progress += Math.random() * 10;

      if (progress >= 100) {

        progress = 100;

        clearInterval(loader);

        setTimeout(function () {

          preloader.classList.add("done");

        }, 300);

      }

      if (preloaderCount) {
        preloaderCount.textContent =
          Math.floor(progress);
      }

      if (preloaderBar) {
        preloaderBar.style.width =
          progress + "%";
      }

    }, 80);

  }


  /* =========================
     CUSTOM CURSOR
  ========================= */

  const cursorDot =
    document.getElementById("cursorDot");

  const cursorRing =
    document.getElementById("cursorRing");

  if (cursorDot && cursorRing) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    document.addEventListener("mousemove", function (event) {

      mouseX = event.clientX;
      mouseY = event.clientY;

      cursorDot.style.left =
        mouseX + "px";

      cursorDot.style.top =
        mouseY + "px";

    });

    function animateCursor() {

      ringX +=
        (mouseX - ringX) * 0.15;

      ringY +=
        (mouseY - ringY) * 0.15;

      cursorRing.style.left =
        ringX + "px";

      cursorRing.style.top =
        ringY + "px";

      requestAnimationFrame(
        animateCursor
      );

    }

    animateCursor();


    document.querySelectorAll("a, button")
      .forEach(function (element) {

        element.addEventListener(
          "mouseenter",
          function () {

            cursorDot.classList.add(
              "expand-mode"
            );

          }
        );

        element.addEventListener(
          "mouseleave",
          function () {

            cursorDot.classList.remove(
              "expand-mode"
            );

          }
        );

      });


    document.querySelectorAll(".portfolio-item")
      .forEach(function (element) {

        element.addEventListener(
          "mouseenter",
          function () {

            cursorDot.classList.add(
              "view-mode"
            );

            cursorRing.classList.add(
              "hide"
            );

          }
        );

        element.addEventListener(
          "mouseleave",
          function () {

            cursorDot.classList.remove(
              "view-mode"
            );

            cursorRing.classList.remove(
              "hide"
            );

          }
        );

      });

  }


  /* =========================
     MAGNETIC BUTTONS
  ========================= */

  document.querySelectorAll(".mag-btn")
    .forEach(function (button) {

      button.addEventListener(
        "mousemove",
        function (event) {

          const rect =
            button.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;

          button.style.transform =
            "translate(" +
            x * 0.15 +
            "px, " +
            y * 0.15 +
            "px)";

        }
      );

      button.addEventListener(
        "mouseleave",
        function () {

          button.style.transform = "";

        }
      );

    });


  /* =========================
     TESTIMONIAL SLIDER
  ========================= */

  const testimonialTrack =
    document.getElementById(
      "testimonialTrack"
    );

  const testimonialDots =
    document.querySelectorAll(
      ".test-dot"
    );

  let currentTestimonial = 0;

  function showTestimonial(index) {

    if (!testimonialTrack) return;

    const total =
      testimonialTrack.children.length;

    if (total === 0) return;

    currentTestimonial =
      (index + total) % total;

    testimonialTrack.style.transform =
      "translateX(-" +
      currentTestimonial * 100 +
      "%)";

    testimonialDots.forEach(
      function (dot, i) {

        dot.classList.toggle(
          "active",
          i === currentTestimonial
        );

      }
    );

  }


  testimonialDots.forEach(
    function (dot, index) {

      dot.addEventListener(
        "click",
        function () {

          showTestimonial(index);

        }
      );

    }
  );


  if (testimonialTrack) {

    setInterval(function () {

      showTestimonial(
        currentTestimonial + 1
      );

    }, 5000);

  }


  /* =========================
     PORTFOLIO PROJECTS
  ========================= */

  const projects = [
    {
      title: "Creative Studio",
      category: "Brand Identity",
      description: "Complete visual identity system for a creative agency.",
      image: "images/AI_vs_Human_Cinematic_Poster.png"
    },
    {
      title: "Fashion Brand",
      category: "Social Media",
      description: "Instagram campaign with 20+ visual assets.",
      image: "images/business-card-4K-UltraHD (2).png"
    },
    {
      title: "Modern SaaS Platform",
      category: "UI/UX Design",
      description: "Dashboard and interface design for a SaaS product.",
      image: "images/coffee-club-4K-UltraHD.png"
    },
    {
      title: "Creative Event",
      category: "Poster Design",
      description: "Event posters and promotional materials.",
      image: "images/coffee-club-wide-4K-UltraHD.png"
    },
    {
      title: "Digital Campaign",
      category: "Marketing Design",
      description: "Product advertisement across digital platforms.",
      image: "images/design.jpeg"
    },
    {
      title: "Startup Brand",
      category: "Visual Identity",
      description: "Complete brand identity for a tech startup.",
      image: "images/FAJ designer.png"
    }
  ];


  /* =========================
     PROJECT MODAL
  ========================= */

  const projectModal =
    document.getElementById(
      "projectModal"
    );

  const modalContent =
    document.getElementById(
      "modalContent"
    );

  const closeModal =
    document.getElementById(
      "closeModal"
    );



  /* =========================
     OPEN PROJECT — FIXED
  ========================= */

  function openProject(index, clickedImgSrc) {

    const project = projects[index];
    if (!project) return;
    if (!projectModal) return;

    // Use clicked image source if provided, otherwise use default project image
    const imageToDisplay = clickedImgSrc || project.image;

    /* BUILD MODAL CONTENT DYNAMICALLY */
    if (modalContent) {

      modalContent.innerHTML = `
        <button class="modal-back-btn" onclick="closeProject()">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </button>

        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          <!-- Project Image (Yahan clicked image aayegi) -->
          <div class="modal-project-image">
            <img src="${imageToDisplay}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/800x600/111/333?text=Image+Not+Found'">
          </div>

          <!-- Project Details -->
          <div class="space-y-6">
            <div>
              <span class="text-accent text-[11px] font-semibold tracking-[0.2em] uppercase font-body">
                ${project.category}
              </span>
              <h2 class="font-display text-4xl lg:text-5xl font-bold tracking-[-0.03em] mt-3">
                ${project.title}
              </h2>
            </div>

            <div class="w-12 h-1 bg-accent rounded-full"></div>

            <p class="text-light-400 text-lg leading-relaxed">
              ${project.description}
            </p>

            <!-- Project Details Table -->
            <div class="pt-6">
              <div class="modal-detail-row">
                <span class="modal-detail-label">Category</span>
                <span class="modal-detail-value">${project.category}</span>
              </div>
              <div class="modal-detail-row">
                <span class="modal-detail-label">Project</span>
                <span class="modal-detail-value">${project.title}</span>
              </div>
              <div class="modal-detail-row">
                <span class="modal-detail-label">Status</span>
                <span class="modal-detail-value text-accent">Completed</span>
              </div>
            </div>

            <!-- CTA Button -->
            <a href="#contact" class="mag-btn inline-flex items-center gap-3 bg-accent text-dark-900 text-[13px] font-semibold tracking-wide px-8 py-4 rounded-xl hover:bg-accent-dark transition-colors mt-4" onclick="closeProject()">
              Start a Similar Project
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

        </div>
      `;

    }

    /* OPEN MODAL */
    projectModal.classList.add("active");
    projectModal.style.transform = "translateY(0)";
    projectModal.style.visibility = "visible";
    projectModal.style.opacity = "1";
    document.body.style.overflow = "hidden";

    /* Small animation */
    if (modalContent) {
      modalContent.style.opacity = "0";
      modalContent.style.transform = "translateY(20px)";
      setTimeout(function () {
        modalContent.style.opacity = "1";
        modalContent.style.transform = "translateY(0)";
      }, 50);
    }

  }


  /* =========================
     VIEW PROJECT BUTTON (CLICK HANDLER) - FIXED VERSION
  ========================= */

  document.querySelectorAll(".portfolio-item").forEach(function (item) {

    // Remove any existing click listeners to avoid duplicates
    item.removeEventListener("click", handleProjectClick);
    item.removeEventListener("keydown", handleProjectKeydown);

    // Add fresh click listener
    item.addEventListener("click", handleProjectClick);

    // Add fresh keyboard listener
    item.addEventListener("keydown", handleProjectKeydown);

  });

  // Separate functions for better organization
  function handleProjectClick(event) {
    const item = this;
    const projectIndex = parseInt(item.getAttribute("data-project"), 10);
    
    // Get the image source from the clicked item
    const imgElement = item.querySelector("img");
    const clickedImgSrc = imgElement ? imgElement.src : "";

    openProject(projectIndex, clickedImgSrc);
  }

  function handleProjectKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const item = this;
      const projectIndex = parseInt(item.getAttribute("data-project"), 10);
      
      const imgElement = item.querySelector("img");
      const clickedImgSrc = imgElement ? imgElement.src : "";

      openProject(projectIndex, clickedImgSrc);
    }
  }


  /* =========================
     CUSTOM SELECT2 DROPDOWN LOGIC
  ========================= */

  const selectTrigger = document.getElementById("projectTypeTrigger");
  const selectDropdown = document.getElementById("projectTypeDropdown");
  const selectWrapper = document.getElementById("projectTypeWrapper");
  const hiddenInput = document.getElementById("projectType");
  
  if (selectTrigger && selectDropdown && selectWrapper) {
    const placeholder = selectTrigger.querySelector(".select2-placeholder");
    const valueDisplay = selectTrigger.querySelector(".select2-value");

    // Toggle dropdown on click
    selectTrigger.addEventListener("click", function (e) {
      e.stopPropagation();
      selectTrigger.classList.toggle("open");
      selectDropdown.classList.toggle("open");
      selectWrapper.classList.toggle("open");
    });

    // Handle option click
    selectDropdown.querySelectorAll(".select2-option").forEach(function (option) {
      option.addEventListener("click", function (e) {
        e.stopPropagation();
        
        // Don't do anything if the default disabled option is clicked
        if (option.classList.contains("disabled")) return;

        const value = option.getAttribute("data-value");
        const text = option.textContent;

        // Update the hidden input value
        if (hiddenInput) {
          hiddenInput.value = value;
        }

        // Update the display text
        if (placeholder && valueDisplay) {
          placeholder.style.display = "none";
          valueDisplay.style.display = "inline";
          valueDisplay.textContent = text;
          selectWrapper.classList.add("has-value");
        }

        // Update selected state
        selectDropdown.querySelectorAll(".select2-option").forEach(function (opt) {
          opt.classList.remove("selected");
        });
        option.classList.add("selected");

        // Close dropdown
        selectTrigger.classList.remove("open");
        selectDropdown.classList.remove("open");
        selectWrapper.classList.remove("open");

        // Hide error message if visible
        const typeError = document.getElementById("typeError");
        if (typeError) {
          typeError.classList.add("hidden");
        }
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (!selectWrapper.contains(e.target)) {
        selectTrigger.classList.remove("open");
        selectDropdown.classList.remove("open");
        selectWrapper.classList.remove("open");
      }
    });
  }


  /* =========================
     CLOSE PROJECT
  ========================= */

  function closeProject() {

    if (!projectModal) return;

    projectModal.classList.remove("active");

    projectModal.style.transform = "translateY(100%)";

    setTimeout(function () {

      projectModal.style.visibility = "hidden";
      projectModal.style.opacity = "0";

    }, 600);

    document.body.style.overflow = "";

  }


  /* =========================
     CLOSE BUTTON
  ========================= */

  if (closeModal) {

    closeModal.addEventListener(
      "click",
      function (event) {

        event.preventDefault();
        event.stopPropagation();

        closeProject();

      }
    );

  }


  /* =========================
     CLICK OUTSIDE MODAL
  ========================= */

  if (projectModal) {

    projectModal.addEventListener(
      "click",
      function (event) {

        if (
          event.target ===
          projectModal
        ) {

          closeProject();

        }

      }
    );

  }


  /* =========================
     ESC KEY
  ========================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        projectModal &&
        projectModal.classList.contains(
          "active"
        )
      ) {

        closeProject();

      }

    }
  );


  /* =========================
     IMAGE ERROR
  ========================= */

  document.querySelectorAll("img")
    .forEach(function (image) {

      image.addEventListener(
        "error",
        function () {

          console.warn(
            "Image not found:",
            image.src
          );

        }
      );

    });


  /* =========================
     GSAP ANIMATIONS — FIXED (FASTER TRIGGER)
  ========================= */

  if (
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined"
  ) {

    gsap.registerPlugin(
      ScrollTrigger
    );


    gsap.to(".hero-el", {

      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.5

    });


    /* ===== REVEAL — start: "top 75%" (pehle 85% tha) ===== */
    gsap.utils
      .toArray(".reveal")
      .forEach(function (element) {

        gsap.fromTo(
          element,

          {
            opacity: 0,
            y: 40
          },

          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",

            scrollTrigger: {

              trigger: element,
              start: "top 75%", // <-- FIXED: pehle trigger hoga
              once: true

            }

          }
        );

      });


    /* ===== REVEAL-LEFT — start: "top 75%" ===== */
    gsap.utils
      .toArray(".reveal-left")
      .forEach(function (element) {

        gsap.fromTo(
          element,

          {
            opacity: 0,
            x: -40
          },

          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",

            scrollTrigger: {

              trigger: element,
              start: "top 75%", // <-- FIXED
              once: true

            }

          }
        );

      });


    /* ===== REVEAL-RIGHT — start: "top 75%" ===== */
    gsap.utils
      .toArray(".reveal-right")
      .forEach(function (element) {

        gsap.fromTo(
          element,

          {
            opacity: 0,
            x: 40
          },

          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",

            scrollTrigger: {

              trigger: element,
              start: "top 75%", // <-- FIXED
              once: true

            }

          }
        );

      });


    /* ===== REVEAL-SCALE — start: "top 75%" ===== */
    gsap.utils
      .toArray(".reveal-scale")
      .forEach(function (element) {

        gsap.fromTo(
          element,

          {
            opacity: 0,
            scale: 0.9
          },

          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",

            scrollTrigger: {

              trigger: element,
              start: "top 75%", // <-- FIXED
              once: true

            }

          }
        );

      });

  }

});


/* =========================
   CONTACT FORM SUBMIT
========================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Show toast notification
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    
    if (toast && toastMsg) {
      toastMsg.textContent = 'Thank you! Your message has been received.';
      toast.classList.add('show');
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }
    
    contactForm.reset();
    
    // Reset select dropdown
    const selectTrigger = document.getElementById('projectTypeTrigger');
    const selectWrapper = document.getElementById('projectTypeWrapper');
    const placeholder = selectTrigger ? selectTrigger.querySelector('.select2-placeholder') : null;
    const valueDisplay = selectTrigger ? selectTrigger.querySelector('.select2-value') : null;
    
    if (selectTrigger && selectWrapper && placeholder && valueDisplay) {
      placeholder.style.display = 'inline';
      valueDisplay.style.display = 'none';
      selectWrapper.classList.remove('has-value');
      
      // Reset hidden input
      const hiddenInput = document.getElementById('projectType');
      if (hiddenInput) {
        hiddenInput.value = '';
      }
    }
  });
}

/* =========================
   CUSTOM SELECT2 DROPDOWN
========================= */

(function initCustomSelect() {

  const selectTrigger = document.getElementById("selectTrigger");
  const selectDropdown = document.getElementById("selectDropdown");
  const selectWrapper = document.getElementById("selectWrapper");
  const hiddenInput = document.getElementById("projectType");
  const placeholder = selectTrigger ? selectTrigger.querySelector(".select2-placeholder") : null;
  const valueDisplay = selectTrigger ? selectTrigger.querySelector(".select2-value") : null;

  if (!selectTrigger || !selectDropdown || !selectWrapper) return;

  /* TOGGLE DROPDOWN */
  selectTrigger.addEventListener("click", function (e) {
    e.stopPropagation();
    const isOpen = selectTrigger.classList.contains("open");
    selectTrigger.classList.toggle("open");
    selectDropdown.classList.toggle("open");
    selectWrapper.classList.toggle("open");
  });

  /* OPTION CLICK */
  selectDropdown.querySelectorAll(".select2-option").forEach(function (option) {

    option.addEventListener("click", function (e) {
      e.stopPropagation();

      if (option.classList.contains("disabled")) return;

      const value = option.getAttribute("data-value");
      const text = option.textContent;

      /* Update hidden input */
      if (hiddenInput) {
        hiddenInput.value = value;
      }

      /* Update display */
      if (placeholder && valueDisplay) {
        if (value) {
          placeholder.style.display = "none";
          valueDisplay.style.display = "inline";
          valueDisplay.textContent = text;
          selectWrapper.classList.add("has-value");
        } else {
          placeholder.style.display = "inline";
          valueDisplay.style.display = "none";
          selectWrapper.classList.remove("has-value");
        }
      }

      /* Update selected state */
      selectDropdown.querySelectorAll(".select2-option").forEach(function (opt) {
        opt.classList.remove("selected");
      });
      option.classList.add("selected");

      /* Close dropdown */
      selectTrigger.classList.remove("open");
      selectDropdown.classList.remove("open");
      selectWrapper.classList.remove("open");

      /* Hide error if visible */
      const typeError = document.getElementById("typeError");
      if (typeError && value) {
        typeError.classList.add("hidden");
      }
    });

  });

  /* CLOSE ON OUTSIDE CLICK */
  document.addEventListener("click", function (e) {
    if (!selectWrapper.contains(e.target)) {
      selectTrigger.classList.remove("open");
      selectDropdown.classList.remove("open");
      selectWrapper.classList.remove("open");
    }
  });

  /* CLOSE ON ESCAPE */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      selectTrigger.classList.remove("open");
      selectDropdown.classList.remove("open");
      selectWrapper.classList.remove("open");
    }
  });

})();

/* =========================
   ACTIVE NAV LINK HIGHLIGHT
========================= */

function setActiveNavLink() {
  const sections = ['hero', 'about', 'skills', 'portfolio', 'services', 'contact'];
  const navLinks = document.querySelectorAll('.nav-link');
  let currentSection = 'hero';
  
  // Find which section is currently in view
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const rect = section.getBoundingClientRect();
      // If section is in viewport (with some offset)
      if (rect.top <= 150 && rect.bottom >= 150) {
        currentSection = sectionId;
      }
    }
  });
  
  // Update active class on nav links
  navLinks.forEach(link => {
    link.classList.remove('active');
    const navData = link.getAttribute('data-nav');
    if (navData === currentSection) {
      link.classList.add('active');
    }
  });
}

// Run on scroll with throttling
let isScrolling = false;
window.addEventListener('scroll', function() {
  if (!isScrolling) {
    window.requestAnimationFrame(function() {
      setActiveNavLink();
      isScrolling = false;
    });
    isScrolling = true;
  }
});

// Run on load
setActiveNavLink();

// Run after page load
window.addEventListener('load', function() {
  setActiveNavLink();
});

// Also run when hash changes (manual navigation)
window.addEventListener('hashchange', function() {
  setTimeout(setActiveNavLink, 100);
});