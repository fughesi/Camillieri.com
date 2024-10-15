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
  "/experience": {
    path: "experience/experience.html",
    js: "experience/experience.js",
    title: "EXPERIENCE",
  },
  "/education": {
    path: "education/education.html",
    js: "education/education.js",
    title: "EDUCATION",
  },
};

function route(event) {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
}

async function handleLocation() {
  const path = window.location.pathname;
  const html = `pages/${routes[path].path}` || `pages/${routes["/"].path}`;
  const js = `pages/${routes[path].js}` || `pages/${routes["/"].js}`;

  fetch(html)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("root").innerHTML = html;
      document.title = `Camillieri | ${routes[path].title}`;
    })
    .then(() => {
      const performance = document.getElementById("performance");
      const script1 = document.createElement("script");
      script1.src = "./utils/performance.js";
      script1.id = "performance";
      document.head.replaceChild(script1, performance);

      const effects = document.getElementById("effects");
      const script2 = document.createElement("script");
      script2.src = "./utils/effects.js";
      script2.id = "effects";
      document.head.replaceChild(script2, effects);

      const page = document.getElementById("page");
      const script3 = document.createElement("script");
      script3.src = js;
      script3.id = "page";
      document.head.replaceChild(script3, page);
    })
    .catch((error) => console.table({ error }));
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
