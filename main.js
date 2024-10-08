fetch("http://localhost:9933/views/pages/home/home.html", {
  method: "GET",
  mode: "cors",
})
  .then((res) => res.text())
  .then((html) => (root.innerHTML = html))
  .catch((error) => console.error(error.message));

fetch("http://localhost:9933/tits")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error.message));
