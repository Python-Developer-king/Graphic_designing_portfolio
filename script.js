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
      description:
        "Complete visual identity system for a creative agency.",
      image:
        "images/AI_vs_Human_Cinematic_Poster.png"
    },

    {
      title: "Fashion Brand",
      category: "Social Media",
      description:
        "Instagram campaign with 20+ visual assets.",
      image:
        "images/business-card-4K-UltraHD (2).png"
    },

    {
      title: "Modern SaaS Platform",
      category: "UI/UX Design",
      description:
        "Dashboard and interface design for a SaaS product.",
      image:
        "images/coffee-club-4K-UltraHD.png"
    },

    {
      title: "Creative Event",
      category: "Poster Design",
      description:
        "Event posters and promotional materials.",
      image:
        "images/coffee-club-wide-4K-UltraHD.png"
    },

    {
      title: "Digital Campaign",
      category: "Marketing Design",
      description:
        "Product advertisement across digital platforms.",
      image:
        "images/design.jpeg"
    },

    {
      title: "Startup Brand",
      category: "Visual Identity",
      description:
        "Complete brand identity for a tech startup.",
      image:
        "images/FAJ designer.png"
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

  const modalImage =
    document.getElementById(
      "modalImage"
    );

  const modalCategory =
    document.getElementById(
      "modalCategory"
    );

  const modalTitle =
    document.getElementById(
      "modalTitle"
    );

  const modalDescription =
    document.getElementById(
      "modalDescription"
    );


  /* =========================
     OPEN PROJECT
  ========================= */

  function openProject(index) {

    const project =
      projects[index];

    if (!project) return;

    if (!projectModal) {
      console.error(
        "projectModal not found in HTML"
      );
      return;
    }


    if (modalImage) {

      modalImage.src =
        project.image;

      modalImage.alt =
        project.title;

    }


    if (modalCategory) {

      modalCategory.textContent =
        project.category;

    }


    if (modalTitle) {

      modalTitle.textContent =
        project.title;

    }


    if (modalDescription) {

      modalDescription.textContent =
        project.description;

    }


    /* OPEN MODAL */

    projectModal.classList.add(
      "active"
    );

    projectModal.style.transform =
      "translateY(0)";

    projectModal.style.visibility =
      "visible";

    projectModal.style.opacity =
      "1";

    document.body.style.overflow =
      "hidden";


    /* Small animation */

    if (modalContent) {

      modalContent.style.opacity =
        "0";

      modalContent.style.transform =
        "translateY(20px)";

      setTimeout(function () {

        modalContent.style.opacity =
          "1";

        modalContent.style.transform =
          "translateY(0)";

      }, 50);

    }

  }


  /* =========================
     CLOSE PROJECT
  ========================= */

  function closeProject() {

    if (!projectModal) return;


    projectModal.classList.remove(
      "active"
    );

    projectModal.style.transform =
      "translateY(100%)";


    setTimeout(function () {

      projectModal.style.visibility =
        "hidden";

      projectModal.style.opacity =
        "0";

    }, 600);


    document.body.style.overflow =
      "";

  }


  /* =========================
     VIEW PROJECT BUTTON
  ========================= */

  document.querySelectorAll(
    ".portfolio-item"
  ).forEach(function (item) {

    item.addEventListener(
      "click",
      function () {

        const projectIndex =
          parseInt(
            item.getAttribute(
              "data-project"
            ),
            10
          );

        openProject(
          projectIndex
        );

      }
    );


    /* Keyboard */

    item.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          const projectIndex =
            parseInt(
              item.getAttribute(
                "data-project"
              ),
              10
            );

          openProject(
            projectIndex
          );

        }

      }
    );

  });


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
     GSAP ANIMATIONS
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
              start: "top 85%",
              once: true

            }

          }
        );

      });


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
              start: "top 85%",
              once: true

            }

          }
        );

      });


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
              start: "top 85%",
              once: true

            }

          }
        );

      });


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
              start: "top 85%",
              once: true

            }

          }
        );

      });

  }

});
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.textContent = "Thank you! Your message has been received.";
    formStatus.className = "text-center text-sm font-medium mt-4 text-green-400 block";
    contactForm.reset();
    setTimeout(() => { formStatus.className = "hidden"; }, 5000);
  });
}