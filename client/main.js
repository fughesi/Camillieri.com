(function () {
  fetch("http://localhost:9933/views/pages/home/home.html", {
    method: "GET",
    mode: "cors",
  })
    .then((res) => res.text())
    .then((html) => (root.innerHTML = html))
    .catch((error) => console.log(error.message));
})(); // load homepage immediately

const route = (event) => {
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const routes = {
  "/": {
    path: "home/home.html",
    js: "home/home.js",
    title: "HOME",
  },
  "/about": {
    path: "about/about.html",
    js: "about/about.js",
    title: "ABOUT",
  },
  "/contact": {
    path: "contact/contact.html",
    js: "contact/contact.js",
    title: "CONTACT",
  },
  "/care": {
    path: "care/care.html",
    js: "care/care.js",
    title: "CARE",
  },
  "/terms": {
    path: "terms/terms.html",
    js: "terms/terms.js",
    title: "TERMS",
  },
  "/availability": {
    path: "availability/availability.html",
    js: "availability/availability.js",
    title: "AVAILABILITY",
  },
  "/listing": {
    path: "listing/listing.html",
    js: "listing/listing.js",
    title: "LISTING",
  },
};
// http://localhost:9933/views/pages/home/home.html
console.log(__dirname);
const handleLocation = async () => {
  const path = window.location.pathname;
  const html = `${routes[path].path}` || routes["/"].path;
  // const html = routes[path].path || routes["/"].path;
  const js = routes[path].js || routes["/"].js;

  fetch(html)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("root").innerHTML = html;
      document.title = `Camillieri | ${routes[path].title}`;

      // const performance = document.getElementById("performance");
      // const script1 = document.createElement("script");
      // script1.src = "./utils/performance.js";
      // script1.id = "performance";
      // document.body.replaceChild(script1, performance);

      const effects = document.getElementById("effects");
      const script2 = document.createElement("script");
      script2.src = "./utils/effects.js";
      script2.id = "effects";
      document.body.replaceChild(script2, effects);

      const page = document.getElementById("page");
      const script3 = document.createElement("script");
      script3.src = js;
      script3.id = "page";
      document.body.replaceChild(script3, page);
    });
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
