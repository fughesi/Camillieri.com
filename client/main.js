(function () {
  fetch("./components/footer/footer.html")
    .then((res) => res.text())
    .then((footer) => {
      document.getElementById("footer").innerHTML = footer;
    });
})();
