document.getElementById("year").textContent = new Date().getFullYear();

for (const anchor of document.querySelectorAll('a[href^="#"]')) {
  anchor.addEventListener("click", (event) => {
    const id = anchor.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

const carousel = document.querySelector(".leaders-carousel");
if (carousel) {
  const track = carousel.querySelector(".leaders-track");
  const cards = Array.from(track.querySelectorAll(".leader-card"));
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  const dotsWrap = document.querySelector(".carousel-dots");

  let currentIndex = 0;

  const cardsPerView = () => {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 980) return 2;
    return 3;
  };

  const maxIndex = () => Math.max(0, cards.length - cardsPerView());

  const renderDots = () => {
    const pages = maxIndex() + 1;
    dotsWrap.innerHTML = "";
    for (let i = 0; i < pages; i += 1) {
      const dot = document.createElement("span");
      dot.className = `carousel-dot ${i === currentIndex ? "active" : ""}`;
      dotsWrap.appendChild(dot);
    }
  };

  const updateCarousel = () => {
    const cardWidth = cards[0].offsetWidth;
    const gap = 14;
    track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
    renderDots();
  };

  const goNext = () => {
    currentIndex = currentIndex >= maxIndex() ? 0 : currentIndex + 1;
    updateCarousel();
  };

  const goPrev = () => {
    currentIndex = currentIndex <= 0 ? maxIndex() : currentIndex - 1;
    updateCarousel();
  };

  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);
  window.addEventListener("resize", () => {
    if (currentIndex > maxIndex()) currentIndex = maxIndex();
    updateCarousel();
  });

  updateCarousel();
  setInterval(goNext, 3800);
}
