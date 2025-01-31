// fetch("/api/tits", { headers: { "Content-Type": "application/json" } })
//   .then((res) => res.json())
//   .then((data) => console.table(data))
//   .catch((error) => console.log(error));

(function () {
  window.scroll(0, 0);
})();

const lazyObserver = new IntersectionObserver((entries) => {
  const lastCard = entries[0];

  if (!lastCard.isIntersecting) return;
  loadNewCards();
  lazyObserver.unobserve(lastCard.target);
  lazyObserver.observe(document.querySelector(".card:last-child"));
  console.log(document.querySelector(".card:last-child"));
});

function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.textContent = "New Card";
    card.classList.add("card");
    effects(".card").observer();
    cardContainer.append(card);
  }
}

lazyObserver.observe(document.querySelector(".card:last-child"));

effects(".card").observer();
