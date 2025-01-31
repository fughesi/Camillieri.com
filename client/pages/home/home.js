(function () {
  window.scroll(0, 0);
})();

const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let intervalId = null;

(function initializeSlider() {
  slides.length
    ? slides[slideIndex].classList.add("displaySlide")
    : // (intervalId = setInterval(nextSlide, 2000)))
      null;
})();

function showSlide(index) {
  if (index > slides.length - 1) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  slides.forEach((i) => {
    i.classList.remove("displaySlide");
  });

  slides[slideIndex].classList.add("displaySlide");
}

function prevSlide() {
  console.log("previous button");
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

// effects(".thing").observer("move", "", 0.3);
