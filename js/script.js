// Wait for the entire HTML document to be fully loaded and parsed before running any scripts.
document.addEventListener("DOMContentLoaded", () => {
  // ===================================================================
  // --- SCRIPT 1: 3D DIAMOND CAROUSEL LOGIC ---
  // ===================================================================

  const diamondCardData = [
    {
      name: "Round",
      img: "../assests/images/image 2.webp",
      p: "Every diamond in our collection",
    },
    {
      name: "Emerald",
      img: "../assests/images/oval 2.webp",
      p: "Every diamond in our collection",
    },
    {
      name: "Round",
      img: "../assests/images/image 2.webp",
      p: "Every diamond in our collection",
    },
    {
      name: "Oval",
      img: "../assests/images/oval.webp",
      p: "Every diamond in our collection",
    },
    {
      name: "Heart",
      img: "../assests/images/fghjk 2.webp",
      p: "Every diamond in our collection",
    },
    {
      name: "Asscher",
      img: "../assests/images/assher 2.webp",
      p: "Every diamond in our collection",
    },
    {
      name: "Heart",
      img: "../assests/images/fghjk 2.webp",
      p: "Every diamond in our collection",
    },
  ];

  // Get references to the HTML elements where the carousel will be built.
  const diamondTrack = document.querySelector(".diamond-track");
  const dotsContainer = document.querySelector(".carousel-dots");

  // Only run the carousel script if its HTML elements exist on the page.
  if (diamondTrack && dotsContainer) {
    // Check if the viewport width is considered mobile (768px or less).--For Mobile Devices
    const isMobile = window.innerWidth <= 768;
    const activeCardData = isMobile
      ? // If it's mobile, use only the first 3 items; otherwise, use the full dataset.
        diamondCardData.slice(0, 3)
      : diamondCardData;

    activeCardData.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("diamond-card");
      cardElement.innerHTML = `
        <img src="${card.img}" alt="${card.name}">
        <hr><h3>${card.name}</h3>
        <p>${card.p}</p>
      `;
      diamondTrack.appendChild(cardElement);

      const dotElement = document.createElement("button");
      dotElement.classList.add("dot");
      dotElement.dataset.index = index;
      dotsContainer.appendChild(dotElement);
    });

    // --- Carousel State and Control ---
    const diamondCards = Array.from(diamondTrack.children);
    const dots = Array.from(dotsContainer.children);
    const diamondCardCount = diamondCards.length;
    // Start with the middle card as the active one.
    let diamondCurrentIndex = Math.floor(diamondCardCount / 2);

    /**
     * Core function to update the carousel's appearance.
     * It loops through all cards and assigns CSS classes (e.g., 'is-active', 'is-left-1')
     * based on their position relative to the current active index.
     */
    function updateDiamondCarousel() {
      const halfCount = Math.floor(diamondCardCount / 2);
      for (let i = 0; i < diamondCardCount; i++) {
        const card = diamondCards[i];
        const dot = dots[i];
        card.className = "diamond-card";
        dot.classList.remove("active");
        let pos =
          ((i - diamondCurrentIndex + halfCount + diamondCardCount) %
            diamondCardCount) -
          halfCount;
        if (pos === 0) card.classList.add("is-active");
        else if (pos === 1) card.classList.add("is-right-1");
        else if (pos === 2) card.classList.add("is-right-2");
        else if (pos === 3) card.classList.add("is-right-3");
        else if (pos === -1) card.classList.add("is-left-1");
        else if (pos === -2) card.classList.add("is-left-2");
        else if (pos === -3) card.classList.add("is-left-3");
        else card.classList.add("is-hidden");
      }
      dots[diamondCurrentIndex].classList.add("active");
    }

    diamondTrack.addEventListener("click", (e) => {
      const targetCard = e.target.closest(".diamond-card");
      if (!targetCard) return;
      const targetIndex = diamondCards.indexOf(targetCard);
      if (targetIndex !== -1) {
        diamondCurrentIndex = targetIndex;
        updateDiamondCarousel();
      }
    });

    // Handle clicking on the bottom dots to navigate.
    dotsContainer.addEventListener("click", (e) => {
      const targetDot = e.target.closest(".dot");
      if (!targetDot) return;
      const targetIndex = parseInt(targetDot.dataset.index, 10);
      if (!isNaN(targetIndex)) {
        diamondCurrentIndex = targetIndex;
        updateDiamondCarousel();
      }
    });

    let isDown = false;
    let startX;

    diamondTrack.addEventListener("mousedown", (e) => {
      isDown = true;
      diamondTrack.style.cursor = "grabbing";
      startX = e.pageX - diamondTrack.offsetLeft;
      e.preventDefault();
    });

    diamondTrack.addEventListener("mouseleave", () => {
      isDown = false;
      diamondTrack.style.cursor = "grab";
    });

    diamondTrack.addEventListener("mouseup", (e) => {
      isDown = false;
      diamondTrack.style.cursor = "grab";
      const endX = e.pageX - diamondTrack.offsetLeft;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          diamondCurrentIndex = (diamondCurrentIndex + 1) % diamondCardCount;
        } else {
          diamondCurrentIndex =
            (diamondCurrentIndex - 1 + diamondCardCount) % diamondCardCount;
        }
        updateDiamondCarousel();
      }
    });

    updateDiamondCarousel();
  }

  // ===================================================================
  // --- SCRIPT 2: HERO SLIDER LOGIC ---
  // ===================================================================

  // Data for each of the three main hero slides.
  const heroSlidesData = [
    {
      title: "Vintage & Antique",
      price: "$4500",
      promo: "Take 20% off for a limited time",
      code: "Use Code: LOVE20",
      mainImg: "../assests/images/Main Ring.webp",
    },
    {
      title: "Pave",
      price: "$2500",
      promo: "Take 5% off for a limited time",
      code: "Use Code: LOVE05",
      mainImg: "../assests/images/Image 55 1.webp",
    },
    {
      title: "Hidden Halo",
      price: "$3500",
      promo: "Take 10% off for a limited time",
      code: "Use Code: LOVER10",
      mainImg:
        "../assests/images/Delaney Tiered Hidden Halo Engagement Ring.webp",
    },
  ];

  const heroSection = document.querySelector(".hero");
  const slideInfoEl = document.querySelector(".slide-info");
  const prevImageEl = document.querySelector(".prev-image");
  const mainImageEl = document.querySelector(".main-image");
  const nextImageEl = document.querySelector(".next-image");
  const backgroundTitleEl = document.querySelector(".background-title");
  const productTitleEl = document.querySelector(".product-title");
  const priceEl = document.querySelector(".price");
  const promoEl = document.querySelector(".offer");
  const codeEl = document.querySelector(".code");

  // --- Hero State Variables ---
  if (heroSection && mainImageEl) {
    let heroCurrentIndex = 0;
    let heroIsAnimating = false;
    const heroTotalSlides = heroSlidesData.length;
    const ANIMATION_DURATION = 600;

    // Function to update all text content on the slide.
    function updateHeroText(index) {
      const data = heroSlidesData[index];
      slideInfoEl.classList.remove("is-exiting");
      backgroundTitleEl.classList.remove("is-exiting");
      backgroundTitleEl.textContent = data.title;
      productTitleEl.textContent = data.title;
      priceEl.textContent = data.price;
      promoEl.textContent = data.promo;
      codeEl.textContent = data.code;
    }

    // Function to update the src attribute of the three ring images.
    function updateHeroImages() {
      const prevIndex =
        (heroCurrentIndex - 1 + heroTotalSlides) % heroTotalSlides;
      const nextIndex = (heroCurrentIndex + 1) % heroTotalSlides;
      mainImageEl.src = heroSlidesData[heroCurrentIndex].mainImg;
      prevImageEl.src = heroSlidesData[prevIndex].mainImg;
      nextImageEl.src = heroSlidesData[nextIndex].mainImg;
    }

    /**
     * Main function to handle the slide transition.
     * @param {'next' | 'prev'} direction - The direction to navigate.
     */
    function navigateHero(direction) {
      if (heroIsAnimating) return;
      heroIsAnimating = true;
      slideInfoEl.classList.add("is-exiting");
      backgroundTitleEl.classList.add("is-exiting");

      if (direction === "next") {
        heroCurrentIndex = (heroCurrentIndex + 1) % heroTotalSlides;
        mainImageEl.classList.add("move-to-left");
        nextImageEl.classList.add("move-to-main");
        prevImageEl.classList.add("move-to-next");
      } else {
        heroCurrentIndex =
          (heroCurrentIndex - 1 + heroTotalSlides) % heroTotalSlides;
        mainImageEl.classList.add("move-to-right");
        prevImageEl.classList.add("move-to-main");
        nextImageEl.classList.add("move-to-prev");
      }

      // Set an interval to automatically navigate to the next slide every 4 seconds.
      setTimeout(() => {
        updateHeroImages();
        mainImageEl.className = "slide-image main-image";
        prevImageEl.className = "slide-image prev-image";
        nextImageEl.className = "slide-image next-image";
        updateHeroText(heroCurrentIndex);
        heroIsAnimating = false;
      }, ANIMATION_DURATION);
    }

    nextImageEl.addEventListener("click", () => navigateHero("next"));
    prevImageEl.addEventListener("click", () => navigateHero("prev"));

    // setInterval(() => {
    //   navigateHero("next");
    // }, 4000);

    updateHeroImages();
    updateHeroText(heroCurrentIndex);
  }

  // ===================================================================
  // --- SCRIPT 3: MOBILE MENU TOGGLE LOGIC ---
  // ===================================================================

  const hamburgerBtn = document.querySelector(".hamburger-menu");
  const closeMenuBtn = document.querySelector(".close-menu");
  const mobileMenu = document.querySelector(".mobile-menu");

  // When the hamburger icon is clicked, add the 'is-open' class to show the menu.
  if (hamburgerBtn && closeMenuBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      mobileMenu.classList.add("is-open");
    });

    // When the close button is clicked, remove the 'is-open' class to hide the menu.
    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
    });
  }
});
