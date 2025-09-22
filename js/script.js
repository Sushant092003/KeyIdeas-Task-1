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
    const isMobile = window.innerWidth <= 800;
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

      if (!isMobile || (isMobile && index < 3)) {
        const dotElement = document.createElement("button");
        dotElement.classList.add("dot");
        dotElement.dataset.index = index;
        dotsContainer.appendChild(dotElement);
      }
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
  const items = document.querySelectorAll(".item");
  const titleEl = document.getElementById("item-title");
  const priceEl = document.getElementById("item-price");
  const promoEl = document.getElementById("item-promo");
  const codeEl = document.getElementById("item-code");
  const bgTitleEl = document.getElementById("background-title");
  const contentDisplay = document.querySelector(".content-display");

  // Make sure the items exist before running the code
  if (items.length > 0) {
    let currentIndex = 0;
    const totalItems = items.length;

    // Function to update the CSS classes on all items
    function updateCarousel() {
      items.forEach((item, index) => {
        item.classList.remove("center", "left", "right");

        if (index === currentIndex) {
          item.classList.add("center");
        } else if (index === (currentIndex - 1 + totalItems) % totalItems) {
          item.classList.add("left");
        } else if (index === (currentIndex + 1) % totalItems) {
          item.classList.add("right");
        }
      });

      // After positioning the items, update the text content
      updateContent();
    }

    // Function to update the text with a fade effect
    function updateContent() {
      const centerItem = items[currentIndex];

      contentDisplay.classList.add("fade-out");
      bgTitleEl.classList.add("fade-out");

      setTimeout(() => {
        // Get data from the center item's data-* attributes
        titleEl.textContent = centerItem.dataset.title;
        priceEl.textContent = centerItem.dataset.price;
        promoEl.textContent = centerItem.dataset.promo;
        codeEl.textContent = centerItem.dataset.code;
        bgTitleEl.textContent = centerItem.dataset.bgTitle;

        // Remove the fade-out class to show the new text
        contentDisplay.classList.remove("fade-out");
        bgTitleEl.classList.remove("fade-out");
      }, 300); // Half of the CSS transition duration
    }

    // Add click listeners to each item
    items.forEach((item) => {
      item.addEventListener("click", () => {
        // If the clicked item is on the left, go to the previous slide
        if (item.classList.contains("left")) {
          currentIndex = (currentIndex - 1 + totalItems) % totalItems;
          updateCarousel();
        }
        // If the clicked item is on the right, go to the next slide
        else if (item.classList.contains("right")) {
          currentIndex = (currentIndex + 1) % totalItems;
          updateCarousel();
        }
      });
    });

    setInterval(() => {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    }, 4000);

    // Initialize the carousel on page load
    updateCarousel();
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
