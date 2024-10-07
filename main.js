fetch("http://localhost:9933/views/pages/home/home.html")
  .then((res) => res.text())
  .then((html) => (root.innerHTML = html));
